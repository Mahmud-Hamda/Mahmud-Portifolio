import { useState } from "react";
import styles from "./ProjectCard.module.css";

const categoryLabels = {
  Biomedical: "Biomedical",
  Cybersecurity: "Cybersecurity",
  "AI-powered-full-stack": "AI-powered full-stack",
};

const ProjectCard = ({ project, onImageLoad, onSelect }) => {
  const [failed, setFailed] = useState(false);

  const markReady = () => onImageLoad?.();

  return (
    <div className={"portfolio-box rounded soft-card " + styles.root}>
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
            alt={`Layout sample, ${project.title}`}
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="portfolio-overlay">
          <a
            className="popup-ajax stretched-link"
            href=""
            aria-label={`View ${project.title}`}
            onClick={(event) => {
              event.preventDefault();
              onSelect();
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
          <div className="portfolio-overlay-details">
            <p className="h5 text-white fw-400 mb-0">{project.title}</p>
            <span className="text-light">
              {project.categories
                .map((category) => categoryLabels[category] ?? category)
                .join(" · ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
