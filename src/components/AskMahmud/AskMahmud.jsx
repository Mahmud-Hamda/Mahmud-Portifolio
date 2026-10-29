import { ArrowUp, Bot, User } from "lucide-react";
import { Fragment, useEffect, useId, useRef, useState } from "react";
import BrandName, { highlightName } from "../BrandName/BrandName";
import {
  DECLINE,
  EMPTY_QUESTION,
  GREETING,
  GREETING_PATTERN,
  SEARCH_UNAVAILABLE,
  UNSUPPORTED_REQUEST,
  unsureReply,
} from "./knowledge";
import { classifyMatch, findBestMatch, loadSearchIndex } from "./semanticSearch";
import styles from "./AskMahmud.module.css";

// Shortest time the thinking dots show, so a fast answer still reads as a reply
const THINKING_DELAY_MS = 700;

const Disclaimer = ({ className }) => (
  <p className={className}>
    <BrandName>Ask Mahmud</BrandName> is AI and can make mistakes.
  </p>
);

const prompts = [
  "What do you do?",
  "Are you open to a role?",
  "How do I reach you?",
];

const welcome = {
  role: "assistant",
  text: "Ask about Mahmud's work, background, or how to reach him.",
};

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * Picks Ask Mahmud's reply. Questions the page has no facts for are declined
 * first; everything else goes through semantic search, which only answers on a
 * confident match, suggests the closest question when unsure, and otherwise
 * declines and points to Mahmud's contact details.
 *
 * @param {string} question
 * @returns {Promise<{ text: string, images?: object[], actions?: object[] }>}
 */
const answerQuestion = async (question) => {
  const normalized = question
    .toLowerCase()
    .replace(/[^a-z0-9+#. ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return EMPTY_QUESTION;
  if (GREETING_PATTERN.test(normalized)) return GREETING;
  if (UNSUPPORTED_REQUEST.test(normalized)) return DECLINE;

  try {
    const match = await findBestMatch(question);
    const decision = classifyMatch(match);
    if (decision === "answer") return match.entry.answer;
    if (decision === "suggest") return unsureReply(match.closestExample);
    return DECLINE;
  } catch (error) {
    console.error("Ask Mahmud search failed:", error);
    return SEARCH_UNAVAILABLE;
  }
};

const polar = (angle, radius) => {
  const rad = (angle * Math.PI) / 180;
  return [8 + radius * Math.cos(rad), 8.3 + radius * Math.sin(rad)];
};

const starPath =
  Array.from({ length: 10 }, (_, k) => polar(-90 + k * 36, k % 2 ? 2 : 5.8))
    .map(([x, y], n) => `${n ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join("") + "Z";

const sparklePaths = [0, 1, 2, 3, 4].map((k) => {
  const [x, y] = polar(-54 + k * 72, 6.2);
  const s = 1.35;
  const i = s * 0.28;
  return [
    [x, y - s], [x + i, y - i], [x + s, y], [x + i, y + i],
    [x, y + s], [x - i, y + i], [x - s, y], [x - i, y - i],
  ]
    .map(([px, py], n) => `${n ? "L" : "M"}${px.toFixed(2)} ${py.toFixed(2)}`)
    .join("") + "Z";
});

// Answers may mark words as **bold**. Mahmud's name is shown in the brand gradient,
// except on the visitor's own purple bubbles, where the gradient would not be readable.
const renderText = (text, { highlightNames = true } = {}) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, index) => {
    const content = highlightNames ? highlightName(part) : part;
    return index % 2 ? <strong key={index}>{content}</strong> : <Fragment key={index}>{content}</Fragment>;
  });

const AskMahmud = () => {
  const titleId = useId();
  const iconGradientId = `${titleId.replace(/:/g, "")}-ai`;
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([welcome]);
  const [isThinking, setIsThinking] = useState(false);
  const [searchStatus, setSearchStatus] = useState("idle");
  const dockRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Start downloading the search model as soon as the panel opens (cached after the first visit)
  useEffect(() => {
    if (!open || searchStatus !== "idle") return;
    setSearchStatus("loading");
    loadSearchIndex()
      .then(() => setSearchStatus("ready"))
      .catch(() => setSearchStatus("error"));
  }, [open, searchStatus]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    // Collapse when the visitor clicks, taps, or tabs anywhere outside the panel and launcher
    const onOutside = (event) => {
      if (!dockRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open, isThinking]);

  const ask = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;
    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setDraft("");
    setIsThinking(true);
    const [answer] = await Promise.all([answerQuestion(trimmed), wait(THINKING_DELAY_MS)]);
    setMessages((current) => [
      ...current,
      { role: "assistant", text: answer.text, images: answer.images, actions: answer.actions },
    ]);
    setIsThinking(false);
  };

  const canSend = Boolean(draft.trim()) && !isThinking;

  const goTo = (section) => {
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(section)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const renderAction = (action) => {
    if (action.href) {
      return (
        <a key={action.label} href={action.href} target={action.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {highlightName(action.label)}
        </a>
      );
    }
    return (
      <button
        key={action.label}
        type="button"
        onClick={() => (action.ask ? ask(action.ask) : goTo(action.section))}
      >
        {highlightName(action.label)}
      </button>
    );
  };

  return (
    <div className={styles.dock} ref={dockRef}>
      {open && (
        <section className={styles.panel} role="dialog" aria-modal="false" aria-labelledby={titleId}>
          <header className={styles.header}>
            <div>
              <h2 id={titleId} className={styles.title}>
                <BrandName>Ask Mahmud</BrandName>
              </h2>
              <p className={styles.note}>Answers from this page.</p>
            </div>
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close Ask Mahmud">
              <i className="fas fa-times" aria-hidden="true" />
            </button>
          </header>
          <div className={styles.messages} ref={listRef}>
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              return (
                <div key={`${message.role}-${index}`} className={isUser ? styles.userRow : styles.assistantRow}>
                  <span className={isUser ? styles.userAvatar : styles.assistantAvatar} aria-hidden="true">
                    {isUser ? <User size={16} /> : <Bot size={16} />}
                  </span>
                  <div className={isUser ? styles.user : styles.assistant}>
                    <p>{renderText(message.text, { highlightNames: !isUser })}</p>
                    {message.images?.map((image) => (
                      <a key={image.src} className={styles.diagram} href={image.src} target="_blank" rel="noreferrer">
                        <img src={image.src} alt={image.alt} />
                      </a>
                    ))}
                    {message.actions && <div className={styles.actions}>{message.actions.map(renderAction)}</div>}
                  </div>
                </div>
              );
            })}
            {isThinking && (
              <div className={styles.assistantRow} role="status" aria-label="Ask Mahmud is thinking">
                <span className={styles.assistantAvatar} aria-hidden="true">
                  <Bot size={16} />
                </span>
                <div className={styles.thinking}>
                  <span className={styles.thinkingDot} />
                  <span className={styles.thinkingDot} />
                  <span className={styles.thinkingDot} />
                  {searchStatus === "loading" && (
                    <span className={styles.thinkingNote}>Loading search (first time only)</span>
                  )}
                </div>
              </div>
            )}
          </div>
          {messages.length === 1 && (
            <div className={styles.prompts}>
              {prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => ask(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          )}
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              ask(draft);
            }}
          >
            <Disclaimer className={styles.disclaimer} />
            <label className={styles.srOnly} htmlFor="ask-mahmud-input">Ask Mahmud Semantically</label>
            <div className={styles.inputBox}>
              {/* Drawn instead of a native placeholder, which cannot show the name's gradient */}
              {!draft && (
                <span className={styles.inputHint} aria-hidden="true">
                  {highlightName("Ask Mahmud Semantically")}
                </span>
              )}
              <input
                id="ask-mahmud-input"
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={240}
              />
              {draft.trim() && (
                <button type="submit" className={styles.sendButton} disabled={!canSend} aria-label="Send">
                  <ArrowUp size={16} />
                </button>
              )}
            </div>
          </form>
        </section>
      )}
      <button
        type="button"
        className={styles.launcher}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <svg className={styles.aiMark} viewBox="0 0 16 16" aria-hidden="true">
          <defs>
            <linearGradient id={iconGradientId} x1="0" y1="8" x2="16" y2="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3ad4ff" />
              <stop offset="46%" stopColor="#6a5cff" />
              <stop offset="100%" stopColor="#ff4ad8" />
            </linearGradient>
          </defs>
          <g fill={`url(#${iconGradientId})`}>
            <path d={starPath} />
            {sparklePaths.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </svg>
        <span className={styles.launcherLabel}>
          <BrandName>Ask Mahmud</BrandName>
        </span>
      </button>
    </div>
  );
};

export default AskMahmud;
