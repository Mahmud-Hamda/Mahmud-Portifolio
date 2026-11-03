const STORAGE_KEY = "ask-mahmud-usage";
const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * MINUTE_MS;
const QUESTIONS_PER_MINUTE = 5;
const QUESTIONS_PER_DAY = 10;
const REQUESTS_PER_MINUTE = 30;

/** Longest question Ask Mahmud accepts. */
export const MAX_QUESTION_LENGTH = 1000;

export const QUESTION_TOO_FAST =
  "You're asking questions too quickly. Please wait a minute and try again.";

export const QUESTION_DAILY_LIMIT =
  "You've reached today's question limit for this demo. Please come back tomorrow.";

export const TOO_MANY_REQUESTS =
  "Too many requests. Please wait a minute and try again.";

const memory = { questions: [], requests: [] };

const recent = (stamps, cutoff) => stamps.filter((stamp) => cutoff - stamp < DAY_MS);

const read = () => {
  const cutoff = Date.now();
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && Array.isArray(saved.questions) && Array.isArray(saved.requests)) {
      return {
        questions: recent(saved.questions.filter((stamp) => typeof stamp === "number"), cutoff),
        requests: recent(saved.requests.filter((stamp) => typeof stamp === "number"), cutoff),
      };
    }
  } catch {
    // Private mode or a full store: the in-memory counts still cover this visit.
  }
  return {
    questions: recent(memory.questions, cutoff),
    requests: recent(memory.requests, cutoff),
  };
};

const write = (usage) => {
  memory.questions = usage.questions;
  memory.requests = usage.requests;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
  } catch {
    // The in-memory copy still enforces the limit for this visit.
  }
};

const inLastMinute = (stamps, cutoff) => stamps.filter((stamp) => cutoff - stamp < MINUTE_MS).length;

/**
 * The message to show when this visitor cannot ask another question yet.
 *
 * @returns {string | null}
 */
export const questionLimitMessage = () => {
  const cutoff = Date.now();
  const usage = read();
  if (inLastMinute(usage.questions, cutoff) >= QUESTIONS_PER_MINUTE) return QUESTION_TOO_FAST;
  if (usage.questions.length >= QUESTIONS_PER_DAY) return QUESTION_DAILY_LIMIT;
  if (inLastMinute(usage.requests, cutoff) >= REQUESTS_PER_MINUTE) return TOO_MANY_REQUESTS;
  return null;
};

/**
 * The message to show when this visitor cannot make another request yet.
 * Loading the search model counts as a request, as does each question.
 *
 * @returns {string | null}
 */
export const requestLimitMessage = () => {
  const cutoff = Date.now();
  const usage = read();
  if (inLastMinute(usage.requests, cutoff) >= REQUESTS_PER_MINUTE) return TOO_MANY_REQUESTS;
  return null;
};

/** Records one accepted question. A question also counts as one request. */
export const recordQuestion = () => {
  const cutoff = Date.now();
  const usage = read();
  usage.questions.push(cutoff);
  usage.requests.push(cutoff);
  write(usage);
};

/** Records one request that is not a question, such as loading the search model. */
export const recordRequest = () => {
  const cutoff = Date.now();
  const usage = read();
  usage.requests.push(cutoff);
  write(usage);
};
