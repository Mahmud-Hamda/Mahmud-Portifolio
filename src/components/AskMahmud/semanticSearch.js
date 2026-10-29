import { KNOWLEDGE } from "./knowledge";

// Loaded at runtime from the CDN at a pinned version rather than bundled, which
// keeps the library and its 27 MB ONNX runtime out of the published site files.
const TRANSFORMERS_URL = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2/dist/transformers.min.js";
const MODEL_ID = "Xenova/all-MiniLM-L6-v2";

// Cosine similarity cut-offs for all-MiniLM-L6-v2, tuned against real questions.
// Ask Mahmud answers only when the best match reaches ANSWER_THRESHOLD and beats
// the best match from any other answer by ANSWER_MARGIN; otherwise, at or above
// SUGGEST_THRESHOLD it only suggests the closest question, and below it declines.
export const ANSWER_THRESHOLD = 0.75;
export const ANSWER_MARGIN = 0.05;
export const SUGGEST_THRESHOLD = 0.45;

let indexPromise = null;

const embed = async (extractor, texts) => {
  const output = await extractor(texts, { pooling: "mean", normalize: true });
  return output.tolist();
};

// Vectors are normalized, so the dot product is the cosine similarity
const similarity = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);

/**
 * Loads the embedding model (downloaded once, then cached by the browser) and
 * embeds every example question in the knowledge base. Safe to call repeatedly.
 *
 * @returns {Promise<{ extractor: Function, examples: Array<{ entry: object, text: string, vector: number[] }> }>}
 */
export const loadSearchIndex = () => {
  if (!indexPromise) {
    indexPromise = (async () => {
      const { pipeline } = await import(/* @vite-ignore */ TRANSFORMERS_URL);
      const extractor = await pipeline("feature-extraction", MODEL_ID, { dtype: "q8" });
      const examples = KNOWLEDGE.flatMap((entry) => entry.examples.map((text) => ({ entry, text })));
      const vectors = await embed(extractor, examples.map((example) => example.text));
      return {
        extractor,
        examples: examples.map((example, index) => ({ ...example, vector: vectors[index] })),
      };
    })().catch((error) => {
      indexPromise = null;
      throw error;
    });
  }
  return indexPromise;
};

/**
 * Finds the knowledge entry whose example questions are closest in meaning to
 * the visitor's question, and how clearly it beats every other entry.
 *
 * @param {string} question
 * @returns {Promise<{ entry: object, score: number, margin: number, closestExample: string }>}
 */
export const findBestMatch = async (question) => {
  const { extractor, examples } = await loadSearchIndex();
  const [queryVector] = await embed(extractor, [question]);

  const bestByEntry = new Map();
  for (const example of examples) {
    const score = similarity(queryVector, example.vector);
    const current = bestByEntry.get(example.entry.id);
    if (!current || score > current.score) {
      bestByEntry.set(example.entry.id, { entry: example.entry, score, closestExample: example.text });
    }
  }

  const [best, runnerUp] = [...bestByEntry.values()].sort((a, b) => b.score - a.score);
  return { ...best, margin: best.score - (runnerUp?.score ?? 0) };
};

/**
 * Decides what to do with a match from {@link findBestMatch}.
 *
 * @param {{ score: number, margin: number }} match
 * @returns {"answer" | "suggest" | "decline"}
 */
export const classifyMatch = ({ score, margin }) => {
  if (score >= ANSWER_THRESHOLD && margin >= ANSWER_MARGIN) return "answer";
  if (score >= SUGGEST_THRESHOLD) return "suggest";
  return "decline";
};
