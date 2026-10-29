import gptCloneArchitecture from "../../assets/images/projects/gpt-clone-architecture.jpg";
import netflixCloneArchitecture from "../../assets/images/projects/netflix-clone-architecture.jpg";

// Everything Ask Mahmud can say. Each entry pairs one answer, written from the
// facts on this page, with example questions that semantic search compares
// against the visitor's question. To teach Ask Mahmud something new, add an
// entry here; never add an answer that is not backed by the page.

export const contactActions = [
  { label: "Contact form", section: "contact" },
  { label: "WhatsApp", href: "https://wa.me/17203651849" },
  { label: "Email", href: "mailto:mkhamda3@gmail.com" },
];

const gptCloneActions = [
  { label: "Open the live site", href: "https://gpt-clone-tau-sable.vercel.app/" },
  { label: "View the code", href: "https://github.com/Mahmud-Hamda/gpt-clone-app" },
];

const netflixCloneActions = [
  { label: "Open the live site", href: "https://netflix-clone-yscv.vercel.app/" },
  { label: "View the code", href: "https://github.com/Mahmud-Hamda/Netflix-Clone" },
];

const appleCloneActions = [
  { label: "Open the live site", href: "https://student-layout.vercel.app/" },
  { label: "View the code", href: "https://github.com/Mahmud-Hamda/apple-clone" },
];

const GPT_CLONE_DIAGRAM = { src: gptCloneArchitecture, alt: "GPT Clone architecture diagram" };
const NETFLIX_CLONE_DIAGRAM = { src: netflixCloneArchitecture, alt: "Netflix Clone architecture diagram" };

export const GREETING = {
  text: "Hello. I can tell you what Mahmud does, where he has worked, and how to reach him.",
};

export const EMPTY_QUESTION = { text: "Type a question, or choose one of the prompts." };

export const DECLINE = {
  text: "Sorry, I don't have a confident answer to that, and I won't guess. I can only answer from what is on this page: Mahmud's work, projects, background, and how to reach him. Mahmud will be glad to help with anything else, so please contact him directly.",
  actions: contactActions,
};

export const SEARCH_UNAVAILABLE = {
  text: "Sorry, Ask Mahmud's search could not load in this browser, so I can't answer reliably right now. Please contact Mahmud directly; he'll be glad to help.",
  actions: contactActions,
};

/**
 * Reply for a question that is close to a known one but not close enough to
 * answer with confidence.
 *
 * @param {string} suggestion - The closest example question.
 * @returns {{ text: string, actions: Array<object> }}
 */
export const unsureReply = (suggestion) => ({
  text: `I'm not sure I understood that, and I don't want to guess. Did you mean "${suggestion}"? If not, please contact Mahmud directly; he'll be glad to help.`,
  actions: [{ label: suggestion, ask: suggestion }, ...contactActions],
});

// Questions this page has no facts for: money, personal details, opinions,
// live information, project metrics, and requests to create or solve something.
// They are declined before semantic search, which could otherwise find a
// similar-sounding answer.
export const UNSUPPORTED_REQUEST = new RegExp(
  "\\b(" +
    [
      "price", "pricing", "salar", "hourly", "wages?\\b", "rates? for\\b", "charges?\\b", "fees?\\b", "budget",
      "how much (do|does|did|would|will|is|are|to|for)\\b",
      "age\\b", "how old", "birthday", "born", "married", "wife", "husband", "kids", "children",
      "religio", "politic",
      "think\\b", "opinion", "favou?rite", "prefer\\b", "better than", "worst",
      "write (me|a|an|some|my)\\b", "generate (me|a|an|some|my)\\b", "translate", "solve (this|my|it)\\b",
      "calculat", "compute\\b", "homework", "fix (this|my)\\b", "debug (this|my)\\b", "code for\\b",
      "weather", "news\\b", "stocks?\\b", "crypto", "what time", "today.?s date",
      "jokes?\\b", "poems?\\b", "songs?\\b", "riddles?\\b",
      "how many (users|visitors|people|customers|clients)\\b", "traffic", "revenue", "downloads",
      "(demo|walkthrough|intro) videos?\\b",
    ].join("|") +
    ")",
);

export const GREETING_PATTERN = /^(hi|hello|hey|howdy|good morning|good afternoon|good evening)\b/;

export const KNOWLEDGE = [
  {
    id: "gpt-clone-diagram",
    examples: [
      "show me the GPT Clone diagram",
      "GPT Clone architecture diagram",
      "summary diagram of the GPT Clone",
      "how is the GPT Clone structured, with a picture",
      "draw the GPT Clone architecture",
      "can I see the architecture of the GPT Clone",
      "visual overview of how the GPT Clone works",
    ],
    answer: {
      text: "Here is the GPT Clone architecture diagram. Select it to open it full size.",
      images: [GPT_CLONE_DIAGRAM],
      actions: gptCloneActions,
    },
  },
  {
    id: "netflix-clone-diagram",
    examples: [
      "show me the Netflix Clone diagram",
      "Netflix Clone architecture diagram",
      "summary diagram of the Netflix Clone",
      "how is the Netflix Clone structured, with a picture",
      "can I see the architecture of the Netflix Clone",
      "visual overview of how the Netflix Clone works",
    ],
    answer: {
      text: "Here is the Netflix Clone architecture diagram. Select it to open it full size.",
      images: [NETFLIX_CLONE_DIAGRAM],
      actions: netflixCloneActions,
    },
  },
  {
    id: "all-diagrams",
    examples: [
      "show me your project diagrams",
      "do you have architecture diagrams",
      "can I see a diagram",
      "show me the architecture of your projects",
    ],
    answer: {
      text: "Here are the architecture diagrams of both projects: the GPT Clone first, then the Netflix Clone. Select one to open it full size.",
      images: [GPT_CLONE_DIAGRAM, NETFLIX_CLONE_DIAGRAM],
    },
  },
  {
    id: "gpt-clone-privacy",
    examples: [
      "can other people see my chat in the GPT Clone",
      "is the GPT Clone chat history private",
      "does the GPT Clone store my data",
      "do I need an account for the GPT Clone",
      "is my GPT Clone conversation visible to other visitors",
    ],
    answer: {
      text: "Each visitor of the GPT Clone gets an anonymous session id stored in their own browser, so they only see their own chat history. There are no accounts, and nothing identifies the visitor. It is a demo, so do not share anything sensitive in it.",
      actions: gptCloneActions,
    },
  },
  {
    id: "gpt-clone-limits",
    examples: [
      "how many questions can I ask the GPT Clone",
      "is the GPT Clone rate limited",
      "what are the GPT Clone usage limits",
      "is there a limit on the GPT Clone",
      "is there a daily limit on the GPT Clone",
      "how long can a GPT Clone question be",
    ],
    answer: {
      text: "The GPT Clone limits each visitor to 5 questions a minute and 50 a day, and each question to 2,000 characters. That keeps the Gemini usage of the public demo under control.",
      actions: gptCloneActions,
    },
  },
  {
    id: "gpt-clone-stack",
    examples: [
      "how is the GPT Clone built",
      "what tech stack does the GPT Clone use",
      "what database does the GPT Clone use",
      "how does the GPT Clone generate answers",
      "where is the GPT Clone deployed",
      "what is the GPT Clone backend",
      "which AI model does the GPT Clone use",
      "is the GPT Clone powered by Gemini or OpenAI",
    ],
    answer: {
      text: "The GPT Clone has a React and Vite frontend and a Node and Express API, both on Vercel. The API sends each question, with the visitor's recent messages as context, to Google Gemini, and saves both sides of the chat in MySQL on TiDB Cloud. A system prompt keeps the answers to full-stack web development.",
      actions: [...gptCloneActions, { label: "See the card", section: "portfolio" }],
    },
  },
  {
    id: "gpt-clone-summary",
    examples: [
      "tell me about the GPT Clone",
      "what is the GPT Clone",
      "summary of the GPT Clone",
      "explain the ChatGPT clone",
      "describe the GPT Clone project",
      "do you have a chatbot project",
      "what does the GPT Clone do",
      "Gemini chat assistant project",
    ],
    answer: {
      text: "The GPT Clone is a ChatGPT-style assistant **Mahmud** built with React, Express, Google Gemini, and MySQL. It answers full-stack web development questions, politely declines off-topic ones, follows up using the recent conversation, renders code in Markdown, and keeps each visitor's chat history private to their browser. It is live on Vercel.",
      actions: gptCloneActions,
    },
  },
  {
    id: "both-clones",
    examples: ["tell me about the clones", "what clone projects do you have", "which clones did you build"],
    answer: {
      text: "Mahmud has three clone projects, all live on Vercel: a Netflix Clone, a movie and TV browser built with React and the TMDB API; a GPT Clone, a ChatGPT-style web development assistant built with React, Express, Google Gemini, and MySQL; and an Apple Clone, a responsive Apple store homepage built with React and React Router.",
      actions: [
        { label: "Open the Netflix Clone", href: "https://netflix-clone-yscv.vercel.app/" },
        { label: "Open the GPT Clone", href: gptCloneActions[0].href },
        { label: "Open the Apple Clone", href: appleCloneActions[0].href },
      ],
    },
  },
  {
    id: "netflix-clone-summary",
    examples: [
      "tell me about the Netflix Clone",
      "what is the Netflix Clone",
      "movie browser project",
      "does the Netflix Clone play trailers",
      "what does the Netflix Clone do",
      "TMDB movie app",
    ],
    answer: {
      text: "The Netflix Clone is a movie and TV browser Mahmud built with React and the TMDB API. It has search, trailers, accounts, and a saved My List, and it is live on Vercel.",
      actions: netflixCloneActions,
    },
  },
  {
    id: "apple-clone-summary",
    examples: [
      "tell me about the Apple Clone",
      "what is the Apple Clone",
      "apple store homepage project",
      "what does the Apple Clone do",
      "Apple website clone",
    ],
    answer: {
      text: "The Apple Clone is a responsive Apple store homepage **Mahmud** built with React, React Router, and Bootstrap. Mac, iPhone, iPad, Watch, and TV each open that product's photo and copy, and the search icon expands a field in the navigation bar. It is live on Vercel. It is a student project and is not affiliated with Apple.",
      actions: appleCloneActions,
    },
  },
  {
    id: "projects",
    examples: [
      "what projects have you done",
      "what have you built",
      "show me your work",
      "what is in your portfolio",
      "are the portfolio projects real client work",
      "case studies",
    ],
    answer: {
      text: "The first three cards under My Work are real projects, all live on Vercel: a Netflix Clone built with React and the TMDB API, a GPT Clone built with React, Express, Google Gemini, and MySQL, and an Apple Clone built with React and React Router. The other cards are layout samples, not completed client projects.",
      actions: [
        { label: "See My Work", section: "portfolio" },
        { label: "Open the Netflix Clone", href: "https://netflix-clone-yscv.vercel.app/" },
        { label: "Open the GPT Clone", href: gptCloneActions[0].href },
        { label: "Open the Apple Clone", href: appleCloneActions[0].href },
      ],
    },
  },
  {
    id: "testimonials",
    examples: [
      "are the testimonials real",
      "are the testimonials genuine",
      "client reviews",
      "what do clients say",
      "client speak quotes",
    ],
    answer: {
      text: "The quotes under Client Speak are sample quotes for the layout. They are not client feedback.",
    },
  },
  {
    id: "whatsapp",
    examples: ["can I message you on WhatsApp", "WhatsApp number", "chat on WhatsApp"],
    answer: {
      text: "WhatsApp is the fastest way to message Mahmud at +1 720 365 1849.",
      actions: [{ label: "Open WhatsApp", href: "https://wa.me/17203651849" }],
    },
  },
  {
    id: "email",
    examples: ["what is your email", "email address", "can I email you"],
    answer: {
      text: "Email Mahmud at mkhamda3@gmail.com, or send a note through the contact form.",
      actions: [
        { label: "Email", href: "mailto:mkhamda3@gmail.com" },
        { label: "Contact form", section: "contact" },
      ],
    },
  },
  {
    id: "phone",
    examples: ["phone number", "can I call you", "what is your number"],
    answer: {
      text: "Mahmud's phone number is +1 720 365 1849.",
      actions: [{ label: "Call", href: "tel:+17203651849" }],
    },
  },
  {
    id: "linkedin",
    examples: ["LinkedIn profile", "are you on LinkedIn"],
    answer: {
      text: "Mahmud's LinkedIn profile is linked from the contact section.",
      actions: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/mahmud-hamda" }],
    },
  },
  {
    id: "github",
    examples: ["GitHub profile", "where is your code", "are you on GitHub"],
    answer: {
      text: "Mahmud's GitHub profile is linked from the contact section.",
      actions: [{ label: "GitHub", href: "https://github.com/Mahmud-Hamda" }],
    },
  },
  {
    id: "contact",
    examples: [
      "how do I reach you",
      "how can I contact you",
      "are you open to a role",
      "are you available for hire",
      "I want to hire you",
      "are you looking for a job",
      "are you open to new opportunities",
      "I have a project for you",
      "what is the best way to get in touch",
    ],
    answer: {
      text: "Mahmud is open to a conversation about a role or a project. Send a note and say whether you are hiring or you have a project.",
      actions: contactActions,
    },
  },
  {
    id: "location",
    examples: ["where are you based", "where do you live", "what is your location", "which city are you in"],
    answer: { text: "Mahmud is based in Denver, Colorado." },
  },
  {
    id: "education",
    examples: [
      "what is your education",
      "what degree do you have",
      "what certifications do you have",
      "what certifications does Mahmud hold",
      "which university did you attend",
      "do you have CompTIA Security+",
    ],
    answer: {
      text: "Mahmud earned a B.S. in Biomedical Engineering, Instrumentation and Medical Imaging, from Addis Ababa University (2011–2016). He holds CompTIA Security+ ce (2024–2025), plus coursework in cybersecurity in healthcare, medical software, and AI-powered full-stack development.",
      actions: [{ label: "See Resume", section: "resume" }],
    },
  },
  {
    id: "experience",
    examples: [
      "what is your work experience",
      "where have you worked",
      "tell me about your employment history",
      "which hospitals did you work at",
    ],
    answer: {
      text: "Mahmud was a Junior Biomedical Engineer at Chancho Hospital (2016–2017) and a Senior Biomedical Engineer at Shaggar HO (2017–2023). His cybersecurity study ran through 2024–2025, and his AI-powered full-stack work is self-paced in 2026.",
      actions: [{ label: "See Resume", section: "resume" }],
    },
  },
  {
    id: "skills",
    examples: [
      "what skills do you have",
      "what technologies do you know",
      "which programming languages do you know",
      "what is your tech stack",
      "do you know React",
    ],
    answer: {
      text: "His skills are grouped as medical devices, cybersecurity and Bash, and the web stack: HTML, CSS, Bootstrap, JavaScript, React with Vite, Node and Express, MySQL, REST APIs, Git, and AI API integration.",
      actions: [{ label: "See My Skills", section: "resume" }],
    },
  },
  {
    id: "cybersecurity",
    examples: [
      "tell me about your cybersecurity work",
      "what is your security background",
      "are you certified in cybersecurity",
      "are you a security professional",
      "network security experience",
      "do you know cryptography and threat detection",
    ],
    answer: {
      text: "Mahmud is a Certified Cybersecurity Professional with CompTIA Security+. He works on access control, cryptography, threat detection, and network security, including security for medical and web systems.",
      actions: [{ label: "See Cybersecurity", section: "services" }],
    },
  },
  {
    id: "biomedical",
    examples: [
      "tell me about your biomedical engineering work",
      "what is your engineering background",
      "do you work with medical devices",
      "do you repair hospital equipment",
      "medical equipment maintenance",
      "do you service life-support machines",
    ],
    answer: {
      text: "Mahmud is a Senior Biomedical Engineer. His hospital work covers installation, calibration, preventive maintenance, and troubleshooting of medical equipment, including imaging and life-support systems.",
      actions: [{ label: "See Biomedical engineering", section: "services" }],
    },
  },
  {
    id: "full-stack",
    examples: [
      "do you build AI apps",
      "do you build websites",
      "can you build me a website",
      "full-stack web development services",
      "can you build a web application with AI",
      "what is your web development background",
    ],
    answer: {
      text: "Mahmud builds AI-powered full-stack web applications with React, Node and Express, MySQL, and REST APIs. That includes chatbots, semantic search, and retrieval-augmented generation when a project needs them. His GPT Clone, a web development assistant on Google Gemini, is a live example.",
      actions: [
        { label: "See AI-powered full-stack", section: "services" },
        { label: "Open the GPT Clone", href: gptCloneActions[0].href },
      ],
    },
  },
  {
    id: "about",
    examples: [
      "what do you do",
      "who are you",
      "who is Mahmud",
      "who is this person",
      "tell me about yourself",
      "what is your background",
    ],
    answer: {
      text: "Mahmud Hamda is a Senior Biomedical Engineer and Certified Cybersecurity Professional who builds AI-powered full-stack web applications. He is based in Denver, Colorado.",
      actions: [{ label: "See What I Do", section: "services" }],
    },
  },
  {
    id: "resume",
    examples: ["can I see your resume", "send me your resume", "download your CV", "where is your resume"],
    answer: {
      text: "The resume is on this page. You can download it from the Resume section as Mahmud-Hamda-Resume.pdf.",
      actions: [{ label: "Go to Resume", section: "resume" }],
    },
  },
];
