// Everything Ask Mahmud can say. Each answer is taken from
// Mahmud-Hamda-public-websites.pdf. Example questions are what semantic search
// compares with the visitor's question. Do not add a fact that PDF does not state.

export const contactActions = [
  { label: "Contact form", section: "contact" },
  { label: "WhatsApp", href: "https://wa.me/17203651849" },
  { label: "Email", href: "mailto:mkhamda3@gmail.com" },
];

const gptCloneActions = [
  { label: "Open the live site", href: "https://gpt-clone-tau-sable.vercel.app/" },
];

const netflixCloneActions = [
  { label: "Open the live site", href: "https://netflix-clone-yscv.vercel.app/" },
];

const appleCloneActions = [
  { label: "Open the live site", href: "https://apple-clone-xi-lyart.vercel.app/" },
];

const forumActions = [
  { label: "Open Evangadi Forum", href: "https://ai-powered-evangadi-forum-ten.vercel.app" },
];

export const GREETING = {
  text: "Hello. Ask about Mahmud's work, the sites he has built, or how to reach him.",
};

export const EMPTY_QUESTION = { text: "Type a question, or choose one below." };

const topicFrom = (question) => {
  const topic = String(question || "").replace(/\s+/g, " ").trim().replace(/[?.!]+$/g, "");
  if (!topic) return "";
  return topic.length > 140 ? `${topic.slice(0, 137)}...` : topic;
};

/**
 * Stops when the question is outside this website. Names what was asked.
 *
 * @param {string} question
 * @returns {{ text: string, actions: Array<object> }}
 */
export const declineReply = (question) => {
  const topic = topicFrom(question);
  const about = topic
    ? ` Sorry, I don't have any information about "${topic}".`
    : " Sorry, I don't have any information about that.";
  return {
    text: `I am the Ask Mahmud agent, only trained on this website and its content.${about}`,
    actions: contactActions,
  };
};

export const SEARCH_UNAVAILABLE = {
  text: "Search didn't load, so I can't answer just now.",
  actions: contactActions,
};

const asQuestion = (example) => {
  const body = example.trim().replace(/[?.!]+$/g, "");
  return `${body.charAt(0).toUpperCase()}${body.slice(1)}`;
};

/**
 * Stops on a close but unclear match and offers one clarified question.
 *
 * @param {string} suggestion - The closest example question.
 * @returns {{ text: string, actions: Array<object> }}
 */
export const unsureReply = (suggestion) => {
  const shown = asQuestion(suggestion);
  return {
    text: `I'm not sure. Did you mean "${shown}"?`,
    actions: [{ label: shown, ask: suggestion }],
  };
};

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
      text: "Mahmud Hamda is a senior biomedical engineer and a certified cybersecurity professional who builds AI-powered full-stack web applications. He is based in Denver, Colorado. His public portfolio is https://mahmudhamda.tech/.",
      actions: [{ label: "See What I Do", section: "services" }],
    },
  },
  {
    id: "education",
    examples: [
      "what is your education",
      "what degree do you have",
      "what certifications do you have",
      "which university did you attend",
      "do you have CompTIA Security+",
    ],
    answer: {
      text: "Mahmud Hamda earned a bachelor of science in biomedical engineering, focused on instrumentation and medical imaging, at Addis Ababa University from 2011 to 2016. He held the CompTIA Security+ certification for 2024 to 2025. He completed study in cybersecurity in healthcare in 2024 and an introduction to medical software in 2025. In 2026 he studied AI-powered full-stack development with Evangadi, Inc.",
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
      text: "Mahmud Hamda worked as a junior biomedical engineer at Chancho Hospital from 2016 to 2017 and as a senior biomedical engineer at Shaggar HO from 2017 to 2023. That work covered installation, calibration, preventive maintenance, and troubleshooting of medical equipment, including life-support systems, diagnostic monitors, and imaging and surgical suites. From 2024 to 2025 he practiced as a cybersecurity professional. His AI-powered full-stack work in 2026 is independent study.",
      actions: [{ label: "See Resume", section: "resume" }],
    },
  },
  {
    id: "biomedical",
    examples: [
      "tell me about your biomedical engineering work",
      "what is your engineering background",
      "do you work with medical devices",
      "medical equipment maintenance",
      "do you service life-support machines",
    ],
    answer: {
      text: "Mahmud Hamda is a senior biomedical engineer. His hospital work covered installation, calibration, preventive maintenance, and troubleshooting of medical equipment, including life-support systems, diagnostic monitors, and imaging and surgical suites.",
      actions: [{ label: "See Biomedical engineering", section: "services" }],
    },
  },
  {
    id: "cybersecurity",
    examples: [
      "tell me about your cybersecurity work",
      "what is your security background",
      "are you certified in cybersecurity",
      "are you a security professional",
    ],
    answer: {
      text: "Mahmud Hamda is a certified cybersecurity professional. He practiced in cybersecurity from 2024 to 2025, held the CompTIA Security+ certification, and completed study in cybersecurity in healthcare in 2024.",
      actions: [{ label: "See Cybersecurity", section: "services" }],
    },
  },
  {
    id: "skills",
    examples: [
      "what skills do you have",
      "what technologies do you know",
      "what is your tech stack",
      "do you know React",
    ],
    answer: {
      text: "On the public web Mahmud Hamda uses HTML, CSS, Bootstrap, responsive layout, JavaScript, React with Vite, Node.js, Express, MySQL, REST APIs, Git, and AI API integration.",
      actions: [{ label: "See My Skills", section: "resume" }],
    },
  },
  {
    id: "full-stack",
    examples: [
      "do you build websites",
      "full-stack web development",
      "what is your web development background",
      "do you build AI apps",
    ],
    answer: {
      text: "Mahmud Hamda builds AI-powered full-stack web applications. In 2026 he studied AI-powered full-stack development with Evangadi, Inc., and he continues that practice as independent study. The public sites in that work are the portfolio, Evangadi Forum, GPT Clone, Netflix Clone, and Apple Clone.",
      actions: [{ label: "See AI-powered full-stack", section: "services" }],
    },
  },
  {
    id: "projects",
    examples: [
      "what projects have you done",
      "what have you built",
      "show me your work",
      "what is in your portfolio",
      "which websites did you build",
    ],
    answer: {
      text: "This public record covers five websites, all built by Mahmud Hamda. The portfolio at https://mahmudhamda.tech/ is the introduction. Evangadi Forum is the class question-and-answer site. GPT Clone is the web-development chat. Netflix Clone is a student movie and TV browser and is not affiliated with Netflix. Apple Clone is a student store-style layout, is not an Apple website, and sells nothing.",
      actions: [
        { label: "See My Work", section: "portfolio" },
        ...forumActions,
        { label: "Open the GPT Clone", href: gptCloneActions[0].href },
        { label: "Open the Netflix Clone", href: netflixCloneActions[0].href },
        { label: "Open the Apple Clone", href: appleCloneActions[0].href },
      ],
    },
  },
  {
    id: "forum-summary",
    examples: [
      "tell me about Evangadi Forum",
      "what is the Evangadi Forum",
      "what is the forum project",
      "coursework question site",
    ],
    answer: {
      text: "Evangadi Forum is a class website for Evangadi learners and mentors, built by Mahmud Hamda. It is at https://ai-powered-evangadi-forum-ten.vercel.app. A member posts a coursework question, writes a reply, and searches threads that already exist, by keyword or by AI semantic search. It is not a general social network.",
      actions: forumActions,
    },
  },
  {
    id: "forum-library",
    examples: [
      "does the forum have a PDF library",
      "can the forum answer from a PDF",
      "how does citation search work on the forum",
      "private documents on Evangadi Forum",
    ],
    answer: {
      text: "Each member of Evangadi Forum has a private PDF library. They can read one of their own documents, search it by meaning, and ask a question that is answered with citations from that document.",
      actions: forumActions,
    },
  },
  {
    id: "forum-signin",
    examples: [
      "how do I sign in to Evangadi Forum",
      "what are the forum sign-in methods",
      "does the forum have face unlock",
      "fingerprint sign-in on the forum",
      "how long does the forum email code last",
    ],
    answer: {
      text: "Evangadi Forum has three sign-in methods. Face sign-in needs a live camera. Fingerprint sign-in uses the credential already on the device and does not use the camera. Email sign-in sends a code that expires in 10 minutes and can be used once. An open tab signs the member out after 15 minutes without activity.",
      actions: forumActions,
    },
  },
  {
    id: "gpt-clone-summary",
    examples: [
      "tell me about the GPT Clone",
      "what is the GPT Clone",
      "what does the GPT Clone do",
      "is the GPT Clone ChatGPT",
      "describe the GPT Clone project",
    ],
    answer: {
      text: "GPT Clone is a chat website for people learning full-stack web development, built by Mahmud Hamda for Evangadi Networks bootcamp work in Phase IV, Week 22. It is at https://gpt-clone-tau-sable.vercel.app. It has the shape of a familiar chat, and it is not ChatGPT. It answers only full-stack web development and declines other topics. Answers are generated with Google Gemini and shown as formatted text.",
      actions: gptCloneActions,
    },
  },
  {
    id: "gpt-clone-accuracy",
    examples: [
      "does the GPT Clone make things up",
      "will the GPT Clone invent an API",
      "what if the GPT Clone does not know",
      "does the GPT Clone guess",
    ],
    answer: {
      text: "GPT Clone states only what it is confident is correct. It does not invent facts, package names, command flags, version numbers, error messages, or sources. If an answer depends on code, versions, or an error the visitor has not provided, it asks for those details instead of guessing. It does not claim to have run code, opened a link, or seen a file it was not given. When it is unsure, it says so and points the learner to https://mahmudhamda.tech.",
      actions: gptCloneActions,
    },
  },
  {
    id: "gpt-clone-privacy",
    examples: [
      "can other people see my chat in the GPT Clone",
      "is the GPT Clone chat history private",
      "do I need an account for the GPT Clone",
      "does GPT Clone keep my conversation",
    ],
    answer: {
      text: "GPT Clone has no account and no login. Each browser keeps its own conversation, and that browser can see only its own history. A follow-up question can use recent messages from that same browser session.",
      actions: gptCloneActions,
    },
  },
  {
    id: "netflix-clone-summary",
    examples: [
      "tell me about the Netflix Clone",
      "what is the Netflix Clone",
      "is the Netflix Clone affiliated with Netflix",
      "movie browser project",
      "does the Netflix Clone play trailers",
    ],
    answer: {
      text: "Netflix Clone is a student movie and television browser built by Mahmud Hamda, at https://netflix-clone-yscv.vercel.app. It is not affiliated with Netflix and it does not sell anything. Posters, descriptions, and trailers come from TMDB. A visitor can browse Home, TV Shows, Movies, and New and Popular, search, and play a trailer when TMDB has one. The site says it is a student project and that the movie data comes from TMDB.",
      actions: netflixCloneActions,
    },
  },
  {
    id: "netflix-accounts",
    examples: [
      "does the Netflix Clone have accounts",
      "where is My List saved",
      "is there an account server for the Netflix Clone",
      "can I sign in on the Netflix Clone",
    ],
    answer: {
      text: "A visitor can sign up and sign in on Netflix Clone with an email and a password that stay in that browser. My List is saved separately for each local account and does not leave that browser. There is no account server, so a saved list stays on the device and browser where it was created. The account page can rename the profile or change the password on that browser only.",
      actions: netflixCloneActions,
    },
  },
  {
    id: "apple-clone-summary",
    examples: [
      "tell me about the Apple Clone",
      "what is the Apple Clone",
      "is the Apple Clone a real Apple site",
      "does the Apple Clone sell anything",
      "apple store homepage project",
    ],
    answer: {
      text: "Apple Clone is a student layout of a store-style homepage, built by Mahmud Hamda, at https://apple-clone-xi-lyart.vercel.app. It is not an Apple website, and nothing on it is for sale. It shows no prices, no phone numbers, no financing, no checkout, and no account collection. A banner and the footer say it is a student portfolio layout and is not affiliated with Apple. The header opens Mac, iPhone, iPad, Watch, TV, Music, Support, and Cart as layout only. Search opens in the header and also has its own page.",
      actions: appleCloneActions,
    },
  },
  {
    id: "testimonials",
    examples: [
      "are the testimonials real",
      "are the testimonials genuine",
      "what do clients say",
      "client speak quotes",
      "read the sample testimonials",
    ],
    answer: {
      text: "The Testimonial section on the portfolio is titled Client Speak. The portfolio states that those quotes are sample quotes for the layout and that they are not client feedback. Dennis Jacques, User from USA: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Jay Shah, Founder at Icomatic Pvt Ltd: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Patrick Cary, Freelancer from USA: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Chris Tom, User from UK: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Each sample quote is shown with five stars.",
    },
  },
  {
    id: "whatsapp",
    examples: ["can I message you on WhatsApp", "WhatsApp number", "chat on WhatsApp"],
    answer: {
      text: "WhatsApp for Mahmud Hamda uses +1 720 365 1849, at https://wa.me/17203651849.",
      actions: [{ label: "Open WhatsApp", href: "https://wa.me/17203651849" }],
    },
  },
  {
    id: "email",
    examples: ["what is your email", "email address", "can I email you"],
    answer: {
      text: "The public email for Mahmud Hamda is mkhamda3@gmail.com. A visitor can also send a note through the contact form on https://mahmudhamda.tech/.",
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
      text: "The public phone number for Mahmud Hamda is +1 720 365 1849.",
      actions: [{ label: "Call", href: "tel:+17203651849" }],
    },
  },
  {
    id: "linkedin",
    examples: ["LinkedIn profile", "are you on LinkedIn"],
    answer: {
      text: "Mahmud Hamda's LinkedIn profile is https://www.linkedin.com/in/mahmud-hamda.",
      actions: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/mahmud-hamda" }],
    },
  },
  {
    id: "github",
    examples: ["GitHub profile", "where is your GitHub", "are you on GitHub"],
    answer: {
      text: "Mahmud Hamda's GitHub profile is https://github.com/Mahmud-Hamda.",
      actions: [{ label: "GitHub", href: "https://github.com/Mahmud-Hamda" }],
    },
  },
  {
    id: "contact",
    examples: [
      "how do I reach you",
      "how can I contact you",
      "what is the best way to get in touch",
      "how do I send you a note",
    ],
    answer: {
      text: "Reach Mahmud Hamda from https://mahmudhamda.tech/. The public email is mkhamda3@gmail.com and the public phone is +1 720 365 1849. WhatsApp uses that same number. The contact section is titled Get in Touch, and a visitor can send a note through the contact form.",
      actions: contactActions,
    },
  },
  {
    id: "location",
    examples: ["where are you based", "where do you live", "what is your location", "which city are you in"],
    answer: { text: "Mahmud Hamda is based in Denver, Colorado." },
  },
];
