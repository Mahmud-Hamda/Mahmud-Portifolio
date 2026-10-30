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
          <div className="portfolio-overlay-details">
            {isLive ? (
              <p className="h6 text-white fw-500 mb-0">See details</p>
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
      {isLive && (
        <div className={styles.projectBody}>
          <h3 className={styles.projectName}>{project.title}</h3>
          {project.categories.length > 1 && (
            <p className={styles.fit}>
              {project.categories
                .map((category) => categoryLabels[category] ?? category)
                .join(" · ")}
            </p>
          )}
          <p className={styles.projectSummary}>{project.summary}</p>
          <ul className={styles.stackList} aria-label="Built with">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.projectLinks}>
            <a className={styles.linkPrimary} href={project.liveUrl} target="_blank" rel="noreferrer">
              <i className="fas fa-globe" aria-hidden="true" />
              Live site
            </a>
            {project.repoUrl && (
              <a className={styles.linkSecondary} href={project.repoUrl} target="_blank" rel="noreferrer">
                <i className="fab fa-github" aria-hidden="true" />
                Code
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
