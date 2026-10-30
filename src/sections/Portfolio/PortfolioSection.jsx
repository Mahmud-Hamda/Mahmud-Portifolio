import { useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ProjectDetailsModal from "../../components/ProjectDetailsModal/ProjectDetailsModal";
import project1 from "../../assets/images/projects/project-1.jpg";
import project4 from "../../assets/images/projects/project-4.jpg";
import project5 from "../../assets/images/projects/project-5.jpg";
import project6 from "../../assets/images/projects/project-6.jpg";
import project7 from "../../assets/images/projects/project-7.jpg";
import netflixCover from "../../assets/images/projects/netflix-clone-cover.jpg";
import netflixHome from "../../assets/images/projects/netflix-clone-home.jpg";
import netflixArchitecture from "../../assets/images/projects/netflix-clone-architecture.jpg";
import gptCloneCover from "../../assets/images/projects/gpt-clone-cover.jpg";
import gptCloneChat from "../../assets/images/projects/gpt-clone-chat.jpg";
import gptCloneArchitecture from "../../assets/images/projects/gpt-clone-architecture.jpg";
import appleCover from "../../assets/images/projects/apple-clone-cover.png";
import appleMac from "../../assets/images/projects/apple-clone-mac.png";
import appleIphone from "../../assets/images/projects/apple-clone-iphone.png";
import evangadiCover from "../../assets/images/projects/evangadi-forum-cover.png";
import evangadiFeed from "../../assets/images/projects/evangadi-forum-feed.png";
import evangadiPassword from "../../assets/images/projects/evangadi-forum-password.png";
import styles from "./PortfolioSection.module.css";

const filters = [
  { key: "AI-powered-full-stack", label: "AI-powered full-stack" },
  { key: "Cybersecurity", label: "Cybersecurity" },
  { key: "Biomedical", label: "Biomedical" },
];

const projects = [
  {
    title: "Netflix Clone",
    thumbImage: netflixCover,
    sliderImages: [netflixHome, netflixArchitecture],
    categories: ["AI-powered-full-stack"],
    summary: "A Netflix-style movie and TV browser with search, trailers, accounts, and a saved My List.",
    stack: ["React 19", "React Router 7", "TMDB API", "Vite", "Vercel"],
    liveUrl: "https://netflix-clone-yscv.vercel.app/",
    repoUrl: "https://github.com/Mahmud-Hamda/Netflix-Clone",
    description:
      "I built a movie and TV browser in the style of Netflix. Posters, backdrops, descriptions, and trailers come from the TMDB API. Accounts and My List live in the browser's local storage, so there is no account server.",
    features: [
      "Home, TV Shows, Movies, and New & Popular rows from TMDB",
      "Search from the header, with a full results page",
      "Play opens the title's YouTube trailer when TMDB has one",
      "Sign up and sign in, with passwords stored as salted PBKDF2 hashes",
      "A separate My List for each account",
    ],
    note: "Student project. Not affiliated with Netflix.",
  },
  {
    title: "GPT Clone",
    thumbImage: gptCloneCover,
    sliderImages: [gptCloneChat, gptCloneArchitecture],
    categories: ["AI-powered-full-stack"],
    summary: "A ChatGPT-style assistant that answers full-stack web development questions and keeps each visitor's chat private.",
    stack: ["React 19", "Express 5", "Google Gemini", "MySQL (TiDB Cloud)", "Vite", "Vercel"],
    liveUrl: "https://gpt-clone-tau-sable.vercel.app/",
    repoUrl: "https://github.com/Mahmud-Hamda/gpt-clone-app",
    description:
      "I built a ChatGPT-style chat app focused on full-stack web development. The React frontend calls an Express API, which sends the question and recent messages to Google Gemini and saves both sides of the conversation in a cloud MySQL database.",
    features: [
      "Answers questions about frontend, backend, databases, APIs, and deployment",
      "Politely declines questions outside web development",
      "Sends recent messages as context, so follow-up questions work",
      "Renders answers as Markdown, including code blocks",
      "Keeps each visitor's chat history private to their browser, stored in MySQL on TiDB Cloud",
      "Rate limits each visitor to protect the Gemini quota",
    ],
    note: "Student project. Not affiliated with OpenAI.",
  },
  {
    title: "Apple Clone",
    thumbImage: appleCover,
    sliderImages: [appleMac, appleIphone],
    categories: ["AI-powered-full-stack"],
    summary: "A responsive Apple store homepage. Each header item opens that product's photo and copy, and search expands in the bar.",
    stack: ["React 19", "React Router 7", "Bootstrap 5", "Vite", "Vercel"],
    liveUrl: "https://student-layout.vercel.app/",
    repoUrl: "https://github.com/Mahmud-Hamda/apple-clone",
    description:
      "I built a responsive clone of an Apple store homepage. The header and footer stay on every page. Mac, iPhone, iPad, Watch, and TV each open that product's photo and copy. The search icon expands a field to the right and lists matching products.",
    features: [
      "Homepage bands for iPad Pro, MacBook Air, iPhone 11 Pro, iPhone 11, Apple TV, and Apple Watch",
      "Header routes for Mac, iPhone, iPad, Watch, TV, Music, Support, and Cart",
      "Search expands in the navigation bar and opens the matching product",
      "Built as a static site for Vercel, with a route rule for Hostinger",
    ],
    note: "Student project. Not affiliated with Apple.",
  },
  {
    title: "Evangadi Forum",
    thumbImage: evangadiCover,
    sliderImages: [evangadiCover, evangadiFeed],
    categories: ["AI-powered-full-stack", "Cybersecurity"],
    summary: "A learner forum with similarity search and a private PDF library, plus a second sign-in by face, fingerprint, or email code.",
    stack: ["React 19", "Express 5", "MySQL", "Google Gemini", "WebAuthn", "Vite", "Vercel"],
    liveUrl: "https://ai-powered-evangadi-forum-ten.vercel.app/",
    repoUrl: "https://github.com/Mahmud-Hamda/ai-powered-evangadi-forum",
    description:
      "I built a forum for Evangadi coursework. Learners post questions, reply in Markdown, and search by keyword or by similar wording. A private knowledge base indexes each person's PDFs and answers from those files with Google Gemini. After the password, sign-in continues with the device face or fingerprint, or with an email code. An open tab signs out after 15 minutes without activity.",
    features: [
      "Questions and answers in Markdown, with a feed, your topics, and a question page",
      "Keyword search and similarity search over the cohort's questions",
      "Private PDF library with answers grounded in that account's files",
      "Password, then face, fingerprint, or an email code",
      "The open tab signs out after 15 minutes with no activity",
    ],
    note: "Student project. The live site uses the Vercel API and TiDB Cloud.",
    cybersecurity: {
      summary:
        "Password first, then the device face, the device fingerprint, or an email code. An idle tab signs out after 15 minutes.",
      description:
        "Sign-in takes two steps. The password comes first. The next step is the device face, the device fingerprint, or a one-time email code. Face uses a live camera and stops if the lens is covered. Fingerprint uses the authenticator on the device and skips the camera. The email code expires in 10 minutes. An open tab signs out after 15 minutes with no activity, and the page stays open. The PDF library stays private to that account.",
      features: [
        "Password, then face, fingerprint, or an email code",
        "Face uses a live camera and rejects a covered lens",
        "Fingerprint uses the device authenticator and skips the camera",
        "The email code expires in 10 minutes",
        "An open tab signs out after 15 minutes with no activity",
      ],
      sliderImages: [evangadiCover, evangadiPassword],
      note: "Student project. Face and fingerprint stay on the device. The email code works once.",
    },
  },
  { title: "Project Title 4", thumbImage: project4, sliderImages: [project1, project4], categories: ["Biomedical", "AI-powered-full-stack"] },
  { title: "Project Title 5", thumbImage: project5, sliderImages: [project1, project5], categories: ["Cybersecurity"] },
  { title: "Project Title 6", thumbImage: project6, sliderImages: [project1, project5], categories: ["Biomedical"] },
  { title: "Project Title 7", thumbImage: project7, sliderImages: [project1, project5], categories: ["Cybersecurity", "AI-powered-full-stack"] },
];

const aiPoweredOrder = ["Evangadi Forum", "GPT Clone", "Netflix Clone", "Apple Clone"];

const orderedProjects = [...projects].sort((left, right) => {
  const rank = (title) => {
    const index = aiPoweredOrder.indexOf(title);
    return index === -1 ? aiPoweredOrder.length : index;
  };
  const difference = rank(left.title) - rank(right.title);
  if (difference !== 0) return difference;
  return projects.indexOf(left) - projects.indexOf(right);
});

const PortfolioSection = () => {
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    const grid = document.querySelector(".portfolio-filter");
    if (!grid) return undefined;
    try {
      isotope.current = new Isotope(grid, {
        itemSelector: ".filter-item",
        layoutMode: "masonry",
      });
    } catch {
      isotope.current = null;
    }
    return () => {
      isotope.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !isotope.current) return;
    isotope.current.arrange({
      filter: filterKey === "*" ? "*" : `.${filterKey}`,
    });
  }, [filterKey, imagesLoaded]);

  const onImageLoad = () => setImagesLoaded((count) => count + 1);

  const forFilter = (project) => {
    if (filterKey !== "Cybersecurity" || !project?.cybersecurity) return project;
    return { ...project, ...project.cybersecurity };
  };

  return (
    <>
      <section id="portfolio" className={styles.root + " section "}>
        <div className="container px-lg-5">
          <div className={"position-relative d-flex text-center mb-5" + " section-title-band"}>
            <h2
              className={
                "text-24  text-uppercase fw-600 w-100 mb-0 " +
                "text-light opacity-4"
              }
              aria-hidden="true"
            >
              Portfolio
            </h2>
            <p
              role="heading"
              aria-level={2}
              className={
                "text-9 text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 " +
                "text-dark"
              }
            >
              My Work
              <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
            </p>
          </div>
          <ul className="portfolio-menu nav nav-tabs justify-content-center border-bottom-0 mb-5">
            <li className="nav-item">
              <button
                type="button"
                className={"nav-link " + (filterKey === "*" ? "active" : "")}
                onClick={() => setFilterKey("*")}
              >
                All
              </button>
            </li>
            {filters.map((filter) => (
              <li className="nav-item" key={filter.key}>
                <button
                  type="button"
                  className={
                    "nav-link " + (filterKey === filter.key ? "active" : "")
                  }
                  onClick={() => setFilterKey(filter.key)}
                >
                  {filter.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="portfolio popup-ajax-gallery">
            <div className="row portfolio-filter filter-container g-4">
              {orderedProjects.map((project, index) => (
                <div
                  className={
                    "col-sm-6 col-lg-4 filter-item " +
                    project.categories.join(" ")
                  }
                  key={project.title}
                >
                  <ProjectCard
                    project={forFilter(project)}
                    onImageLoad={onImageLoad}
                    onSelect={() => setSelectedProject(orderedProjects[index])}
                  />
                </div>
              ))}
            </div>
            {projects.every(
              (project) =>
                filterKey !== "*" && !project.categories.includes(filterKey)
            ) ? (
              <p className={styles.empty}>No samples in this group.</p>
            ) : null}
          </div>
        </div>
      </section>
      <div className="project-details-modal">
        <ProjectDetailsModal projectDetails={forFilter(selectedProject)} />
      </div>
    </>
  );
};

export default PortfolioSection;
