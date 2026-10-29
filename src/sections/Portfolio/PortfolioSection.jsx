import { useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ProjectDetailsModal from "../../components/ProjectDetailsModal/ProjectDetailsModal";
import project1 from "../../assets/images/projects/project-1.jpg";
import project3 from "../../assets/images/projects/project-3.jpg";
import project4 from "../../assets/images/projects/project-4.jpg";
import project5 from "../../assets/images/projects/project-5.jpg";
import project6 from "../../assets/images/projects/project-6.jpg";
import project7 from "../../assets/images/projects/project-7.jpg";
import netflixCover from "../../assets/images/projects/netflix-clone-cover.jpg";
import netflixHome from "../../assets/images/projects/netflix-clone-home.jpg";
import netflixRows from "../../assets/images/projects/netflix-clone-rows.jpg";
import gptCloneCover from "../../assets/images/projects/gpt-clone-cover.jpg";
import gptCloneChat from "../../assets/images/projects/gpt-clone-chat.jpg";
import gptCloneArchitecture from "../../assets/images/projects/gpt-clone-architecture.jpg";
import styles from "./PortfolioSection.module.css";

const filters = [
  { key: "Biomedical", label: "Biomedical" },
  { key: "Cybersecurity", label: "Cybersecurity" },
  { key: "AI-powered-full-stack", label: "AI-powered full-stack" },
];

const projects = [
  {
    title: "Netflix Clone",
    thumbImage: netflixCover,
    sliderImages: [netflixHome, netflixRows],
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
  { title: "Project Title 3", thumbImage: project3, sliderImages: [project3, project5], categories: ["AI-powered-full-stack"] },
  { title: "Project Title 4", thumbImage: project4, sliderImages: [project1, project4], categories: ["Biomedical", "AI-powered-full-stack"] },
  { title: "Project Title 5", thumbImage: project5, sliderImages: [project1, project5], categories: ["Cybersecurity"] },
  { title: "Project Title 6", thumbImage: project6, sliderImages: [project1, project5], categories: ["Biomedical"] },
  { title: "Project Title 7", thumbImage: project7, sliderImages: [project1, project5], categories: ["Cybersecurity", "AI-powered-full-stack"] },
];

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
              {projects.map((project, index) => (
                <div
                  className={
                    "col-sm-6 col-lg-4 filter-item " +
                    project.categories.join(" ")
                  }
                  key={project.title}
                >
                  <ProjectCard
                    project={project}
                    onImageLoad={onImageLoad}
                    onSelect={() => setSelectedProject(projects[index])}
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
        <ProjectDetailsModal projectDetails={selectedProject} />
      </div>
    </>
  );
};

export default PortfolioSection;
