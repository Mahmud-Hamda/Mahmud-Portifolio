import { useState } from "react";
import styles from "./ProjectCard.module.css";

const categoryLabels = {
  Biomedical: "Biomedical",
  Cybersecurity: "Cybersecurity",
  "AI-powered-full-stack": "AI-powered full-stack",
};

const ProjectCard = ({ project, onImageLoad, onSelect }) => {
  const [failed, setFailed] = useState(false);
  const isLive = Boolean(project.liveUrl);

  const markReady = () => onImageLoad?.();

  return (
    <div
      className={
        "portfolio-box rounded soft-card " +
        styles.root +
        (isLive ? " " + styles.projectLive : "")
      }
    >
      <div className="portfolio-img rounded">
        {failed ? (
          <p className={styles.missing}>Image did not load.</p>
        ) : (
          <img
            onLoad={markReady}
            onError={() => {
              setFailed(true);
              markReady();
            }}
            className="img-fluid d-block portfolio-image"
            src={project.thumbImage}
            alt={isLive ? `${project.title}, home screen` : `Layout sample, ${project.title}`}
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="portfolio-overlay">
          <a
            className="popup-ajax stretched-link"
            href=""
            aria-label={isLive ? `${project.title} details` : `View ${project.title}`}
            onClick={(event) => {
              event.preventDefault();
              onSelect();
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
          <div className={"portfolio-overlay-details " + (isLive ? styles.hoverActions : "")}>
            {isLive ? (
              <>
                <p className={styles.seeDetails}>
                  <svg className={styles.eyeIcon} viewBox="0 0 576 512" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                    />
                  </svg>
                  See details
                </p>
                <div className={styles.hoverLinks}>
                  <a className={styles.hoverLink} href={project.liveUrl} target="_blank" rel="noreferrer">
                    <i className="fas fa-globe" aria-hidden="true" />
                    Live site
                  </a>
                  {project.repoUrl && (
                    <a className={styles.hoverLink} href={project.repoUrl} target="_blank" rel="noreferrer">
                      <i className="fab fa-github" aria-hidden="true" />
                      Code
                    </a>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="h5 text-white fw-400 mb-0">{project.title}</p>
                <span className="text-light">
                  {project.categories
                    .map((category) => categoryLabels[category] ?? category)
                    .join(" · ")}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      {isLive && <h3 className={styles.projectName}>{project.title}</h3>}
    </div>
  );
};

export default ProjectCard;
