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
        {isLive && (
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} aria-hidden="true" />
            Live
          </span>
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
                  <i className="fas fa-eye" aria-hidden="true" />
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
