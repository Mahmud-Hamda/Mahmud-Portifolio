import { useEffect, useId, useRef, useState } from "react";
import styles from "./AskMahmud.module.css";

const prompts = [
  "What do you do?",
  "Are you open to a role?",
  "How do I reach you?",
];

const welcome = {
  role: "assistant",
  text: "Ask about Mahmud's work, background, or how to reach him.",
};

const contactActions = [
  { label: "Contact form", section: "contact" },
  { label: "WhatsApp", href: "https://wa.me/17203651849" },
  { label: "Email", href: "mailto:mkhamda3@gmail.com" },
];

const gptCloneActions = [
  { label: "Open the live site", href: "https://gpt-clone-tau-sable.vercel.app/" },
  { label: "View the code", href: "https://github.com/Mahmud-Hamda/gpt-clone-app" },
];

const replyTo = (raw) => {
  const q = raw
    .toLowerCase()
    .replace(/[^a-z0-9+#. ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!q) {
    return { text: "Type a question, or choose one of the prompts." };
  }

  if (/^(hi|hello|hey|howdy|good morning|good afternoon|good evening)\b/.test(q)) {
    return {
      text: "Hello. I can tell you what Mahmud does, where he has worked, and how to reach him.",
    };
  }

  if (/gpt|chat ?bot|gemini|llm|ai chat|chat app|ai assistant/.test(q)) {
    if (/privat|\bdata\b|history|session|account|login|see my|other people|secure/.test(q)) {
      return {
        text: "Each visitor of the GPT Clone gets an anonymous session id stored in their own browser, so they only see their own chat history. There are no accounts, and nothing identifies the visitor. It is a demo, so do not share anything sensitive in it.",
        actions: gptCloneActions,
      };
    }

    if (/\blimits?\b|\brate\b|quota|abuse|\bcosts?\b|spam|how many/.test(q)) {
      return {
        text: "The GPT Clone limits each visitor to 5 questions a minute and 50 a day, and each question to 2,000 characters. That keeps the Gemini usage of the public demo under control.",
        actions: gptCloneActions,
      };
    }

    if (/stack|built|build|tech|work|architect|backend|frontend|database|\bapi\b|deploy|how/.test(q)) {
      return {
        text: "The GPT Clone has a React and Vite frontend and a Node and Express API, both on Vercel. The API sends each question, with the visitor's recent messages as context, to Google Gemini, and saves both sides of the chat in MySQL on TiDB Cloud. A system prompt keeps the answers to full-stack web development.",
        actions: [...gptCloneActions, { label: "See the card", section: "portfolio" }],
      };
    }

    return {
      text: "The GPT Clone is a ChatGPT-style assistant Mahmud built with React, Express, Google Gemini, and MySQL. It answers full-stack web development questions, politely declines off-topic ones, follows up using the recent conversation, renders code in Markdown, and keeps each visitor's chat history private to their browser. It is live on Vercel.",
      actions: gptCloneActions,
    };
  }

  if (/\bclones?\b/.test(q) && !/netflix|tmdb|movie/.test(q)) {
    return {
      text: "Mahmud has two clone projects, both live on Vercel: a Netflix Clone, a movie and TV browser built with React and the TMDB API, and a GPT Clone, a ChatGPT-style web development assistant built with React, Express, Google Gemini, and MySQL.",
      actions: [
        { label: "Open the Netflix Clone", href: "https://netflix-clone-yscv.vercel.app/" },
        { label: "Open the GPT Clone", href: gptCloneActions[0].href },
      ],
    };
  }

  if (/netflix|tmdb|movie/.test(q)) {
    return {
      text: "The Netflix Clone is a movie and TV browser Mahmud built with React and the TMDB API. It has search, trailers, accounts, and a saved My List, and it is live on Vercel.",
      actions: [
        { label: "Open the live site", href: "https://netflix-clone-yscv.vercel.app/" },
        { label: "View the code", href: "https://github.com/Mahmud-Hamda/Netflix-Clone" },
      ],
    };
  }

  if (/project|portfolio|client|case stud/.test(q)) {
    return {
      text: "The first two cards under My Work are real projects, both live on Vercel: a Netflix Clone built with React and the TMDB API, and a GPT Clone built with React, Express, Google Gemini, and MySQL. The other cards are layout samples, not completed client projects.",
      actions: [
        { label: "See My Work", section: "portfolio" },
        { label: "Open the Netflix Clone", href: "https://netflix-clone-yscv.vercel.app/" },
        { label: "Open the GPT Clone", href: gptCloneActions[0].href },
      ],
    };
  }

  if (/testimonial|review|quote|client speak/.test(q)) {
    return {
      text: "The quotes under Client Speak are sample quotes for the layout. They are not client feedback.",
    };
  }

  if (/whatsapp/.test(q)) {
    return {
      text: "WhatsApp is the fastest way to message Mahmud at +1 720 365 1849.",
      actions: [{ label: "Open WhatsApp", href: "https://wa.me/17203651849" }],
    };
  }

  if (/email|e-mail|gmail/.test(q)) {
    return {
      text: "Email Mahmud at mkhamda3@gmail.com, or send a note through the contact form.",
      actions: [
        { label: "Email", href: "mailto:mkhamda3@gmail.com" },
        { label: "Contact form", section: "contact" },
      ],
    };
  }

  if (/phone|call|number/.test(q)) {
    return {
      text: "Mahmud's phone number is +1 720 365 1849.",
      actions: [{ label: "Call", href: "tel:+17203651849" }],
    };
  }

  if (/linkedin/.test(q)) {
    return {
      text: "Mahmud's LinkedIn profile is linked from the contact section.",
      actions: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/mahmud-hamda" }],
    };
  }

  if (/github/.test(q)) {
    return {
      text: "Mahmud's GitHub profile is linked from the contact section.",
      actions: [{ label: "GitHub", href: "https://github.com/Mahmud-Hamda" }],
    };
  }

  if (/reach|contact|get in touch|message you|hire|hiring|role|job|available|open to|recruit|opportunity|freelance|project with you/.test(q)) {
    return {
      text: "Mahmud is open to a conversation about a role or a project. Send a note and say whether you are hiring or you have a project.",
      actions: contactActions,
    };
  }

  if (/where|location|denver|colorado|based|live|from/.test(q)) {
    return { text: "Mahmud is based in Denver, Colorado." };
  }

  if (/education|degree|university|school|certif|comptia|coursera|evangadi/.test(q)) {
    return {
      text: "Mahmud earned a B.S. in Biomedical Engineering, Instrumentation and Medical Imaging, from Addis Ababa University (2011–2016). He holds CompTIA Security+ ce (2024–2025), plus coursework in cybersecurity in healthcare, medical software, and AI-powered full-stack development.",
      actions: [{ label: "See Resume", section: "resume" }],
    };
  }

  if (/experience|worked|job history|employment|hospital|shaggar|chancho/.test(q)) {
    return {
      text: "Mahmud was a Junior Biomedical Engineer at Chancho Hospital (2016–2017) and a Senior Biomedical Engineer at Shaggar HO (2017–2023). His cybersecurity study ran through 2024–2025, and his AI-powered full-stack work is self-paced in 2026.",
      actions: [{ label: "See Resume", section: "resume" }],
    };
  }

  if (/skill|stack|react|node|mysql|html|css|javascript|bash/.test(q)) {
    return {
      text: "His skills are grouped as medical devices, cybersecurity and Bash, and the web stack: HTML, CSS, Bootstrap, JavaScript, React with Vite, Node and Express, MySQL, REST APIs, Git, and AI API integration.",
      actions: [{ label: "See My Skills", section: "resume" }],
    };
  }

  if (/cyber|security\+|threat|cryptograph/.test(q)) {
    return {
      text: "Mahmud is a Certified Cybersecurity Professional with CompTIA Security+. He works on access control, cryptography, threat detection, and network security, including security for medical and web systems.",
      actions: [{ label: "See Cybersecurity", section: "services" }],
    };
  }

  if (/biomed|medical|hospital|device|imaging|equipment/.test(q)) {
    return {
      text: "Mahmud is a Senior Biomedical Engineer. His hospital work covers installation, calibration, preventive maintenance, and troubleshooting of medical equipment, including imaging and life-support systems.",
      actions: [{ label: "See Biomedical engineering", section: "services" }],
    };
  }

  if (/full[- ]?stack|web dev|website|ai|chatbot|rag|react|node/.test(q)) {
    return {
      text: "Mahmud builds AI-powered full-stack web applications with React, Node and Express, MySQL, and REST APIs. That includes chatbots, semantic search, and retrieval-augmented generation when a project needs them. His GPT Clone, a web development assistant on Google Gemini, is a live example.",
      actions: [
        { label: "See AI-powered full-stack", section: "services" },
        { label: "Open the GPT Clone", href: gptCloneActions[0].href },
      ],
    };
  }

  if (/what do you do|who are you|who is|about|service|background|mahmud/.test(q)) {
    return {
      text: "Mahmud Hamda is a Senior Biomedical Engineer and Certified Cybersecurity Professional who builds AI-powered full-stack web applications. He is based in Denver, Colorado.",
      actions: [{ label: "See What I Do", section: "services" }],
    };
  }

  if (/resume|cv/.test(q)) {
    return {
      text: "The resume is on this page. You can download it from the Resume section as Mahmud-Hamda-Resume.pdf.",
      actions: [{ label: "Go to Resume", section: "resume" }],
    };
  }

  return {
    text: "I can answer from this page: Mahmud's work, his background, and how to reach him. For anything else, send him a note.",
    actions: contactActions,
  };
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

const AskMahmud = () => {
  const titleId = useId();
  const iconGradientId = `${titleId.replace(/:/g, "")}-ai`;
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([welcome]);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open]);

  const ask = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const answer = replyTo(trimmed);
    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "assistant", text: answer.text, actions: answer.actions },
    ]);
    setDraft("");
  };

  const goTo = (section) => {
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(section)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={styles.dock}>
      {open && (
        <section className={styles.panel} role="dialog" aria-modal="false" aria-labelledby={titleId}>
          <header className={styles.header}>
            <div>
              <h2 id={titleId} className={styles.title}>Ask Mahmud</h2>
              <p className={styles.note}>Answers from this page.</p>
            </div>
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close Ask Mahmud">
              <i className="fas fa-times" aria-hidden="true" />
            </button>
          </header>
          <div className={styles.messages} ref={listRef}>
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "user" ? styles.user : styles.assistant}>
                <p>{message.text}</p>
                {message.actions && (
                  <div className={styles.actions}>
                    {message.actions.map((action) =>
                      action.href ? (
                        <a key={action.label} href={action.href} target={action.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                          {action.label}
                        </a>
                      ) : (
                        <button key={action.label} type="button" onClick={() => goTo(action.section)}>
                          {action.label}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
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
            <label className={styles.srOnly} htmlFor="ask-mahmud-input">Ask Mahmud</label>
            <input
              id="ask-mahmud-input"
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask a question"
              maxLength={240}
            />
            <button type="submit" disabled={!draft.trim()}>Send</button>
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
        <span>Ask Mahmud</span>
      </button>
    </div>
  );
};

export default AskMahmud;
