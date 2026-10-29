import { useEffect, useMemo, useRef, useState } from "react";

import Slider from "react-slick";
import "../../sections/Testimonials/Testimonials.module.css";
import styles from "./ProjectDetailsModal.module.css";

const SLIDE_INTERVAL_MS = 5000;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Play, pause, and next controls for the project screenshots.
 * The gallery advances on its own while play is on.
 */
const ProjectDetailsModal = ({ projectDetails }) => {
  const sliderRef = useRef(null);
  const onSlide = useRef(() => {});
  const [failed, setFailed] = useState({});
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const images = (
    projectDetails?.sliderImages?.length
      ? projectDetails.sliderImages
      : [projectDetails?.thumbImage]
  ).filter((image) => image && !failed[image]);

  const slideCount = images.length;
  onSlide.current = (next) => {
    if (slideCount < 1) return;
    setCurrent(((next % slideCount) + slideCount) % slideCount);
  };

  const settings = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: slideCount > 1,
      adaptiveHeight: true,
      speed: prefersReducedMotion() ? 0 : 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (_previous, next) => onSlide.current(next),
    }),
    [slideCount]
  );

  useEffect(() => {
    setFailed({});
    setCurrent(0);
    sliderRef.current?.slickGoTo(0, true);
  }, [projectDetails]);

  useEffect(() => {
    const modal = document.getElementById("exampleModal");
    if (!modal) return undefined;

    const start = () => {
      setCurrent(0);
      sliderRef.current?.slickGoTo(0, true);
      setPlaying(slideCount > 1 && !prefersReducedMotion());
      setTimerKey((key) => key + 1);
    };
    const stop = () => {
      setPlaying(false);
      setCurrent(0);
      sliderRef.current?.slickGoTo(0, true);
    };

    modal.addEventListener("shown.bs.modal", start);
    modal.addEventListener("hidden.bs.modal", stop);
    return () => {
      modal.removeEventListener("shown.bs.modal", start);
      modal.removeEventListener("hidden.bs.modal", stop);
    };
  }, [slideCount]);

  useEffect(() => {
    const modal = document.getElementById("exampleModal");
    if (!modal) return undefined;

    const collapse = () => {
      if (!modal.classList.contains("show")) return;
      modal.querySelector("[data-bs-dismiss='modal']")?.click();
    };

    const onPointerDown = (event) => {
      if (!modal.classList.contains("show")) return;
      const dialog = modal.querySelector(".modal-dialog");
      if (dialog?.contains(event.target)) return;
      collapse();
    };

    const onLeaveTab = () => {
      if (document.visibilityState === "hidden") collapse();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("visibilitychange", onLeaveTab);
    window.addEventListener("blur", collapse);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onLeaveTab);
      window.removeEventListener("blur", collapse);
    };
  }, []);

  useEffect(() => {
    if (!playing || slideCount < 2) return undefined;
    const id = window.setInterval(() => {
      sliderRef.current?.slickNext();
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, slideCount, timerKey]);

  const restartTimer = () => setTimerKey((key) => key + 1);

  const togglePlay = () => {
    setPlaying((isPlaying) => !isPlaying);
    restartTimer();
  };

  const goNext = () => {
    sliderRef.current?.slickNext();
    restartTimer();
  };

  const goTo = (index) => {
    sliderRef.current?.slickGoTo(index);
    restartTimer();
  };

  return (
    <>
      <div
        className={"modal fade bg-dark-1 " + styles.root}
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div
            className={
              "modal-content "
            }
          >
            <div className="modal-body">
              <button
                type="button"
                className={"btn-close "}
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div
                className={
                  "container ajax-container "
                }
              >
                <h2
                  className={
                    "text-6 font-weight-600 text-center mb-4 " + styles.title
                  }
                >
                  {projectDetails?.title || "Sample"}
                </h2>
                <div className="row g-4">
                  <div className="col-lg-7">
                    {!projectDetails ? (
                      <p className={styles.note}>
                        Choose a project card to see this sample.
                      </p>
                    ) : images.length === 0 ? (
                      <p className={styles.note}>The sample image did not load.</p>
                    ) : (
                      <>
                      <Slider {...settings} ref={sliderRef}>
                        {images.map((image, index) => (
                          <div className="item" key={`${image}-${index}`}>
                            <img
                              className="img-fluid"
                              alt={
                                projectDetails.liveUrl
                                  ? `${projectDetails.title}, screenshot ${index + 1}`
                                  : `${projectDetails.title}, layout sample`
                              }
                              src={image}
                              onError={() =>
                                setFailed((currentFailed) => ({ ...currentFailed, [image]: true }))
                              }
                            />
                          </div>
                        ))}
                      </Slider>
                      {slideCount > 1 && (
                        <div className={styles.slideBar} role="group" aria-label="Project images">
                          <button
                            type="button"
                            className={styles.slideButton}
                            onClick={togglePlay}
                            aria-label={playing ? "Pause" : "Play"}
                            aria-pressed={playing}
                          >
                            {playing ? <PauseIcon /> : <PlayIcon />}
                          </button>
                          <div className={styles.slideDots}>
                            {images.map((image, index) => (
                              <button
                                key={`${image}-dot`}
                                type="button"
                                className={
                                  index === current
                                    ? `${styles.slideDot} ${styles.slideDotOn}`
                                    : styles.slideDot
                                }
                                aria-label={`Show image ${index + 1} of ${slideCount}`}
                                aria-current={index === current ? "true" : undefined}
                                onClick={() => goTo(index)}
                              />
                            ))}
                          </div>
                          <button
                            type="button"
                            className={`${styles.slideButton} ${styles.slideNext}`}
                            onClick={goNext}
                            aria-label="Next image"
                          >
                            <NextIcon />
                          </button>
                        </div>
                      )}
                      </>
                    )}
                  </div>
                  <div className="col-lg-5">
                    {projectDetails?.liveUrl ? (
                      <div className={styles.modalInfo}>
                        <p className={styles.modalDescription}>{projectDetails.description}</p>
                        <h3 className={styles.modalHeading}>What it does</h3>
                        <ul className={styles.modalFeatures}>
                          {projectDetails.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                        <h3 className={styles.modalHeading}>Built with</h3>
                        <ul className={styles.modalStack}>
                          {projectDetails.stack.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <div className={styles.modalLinks}>
                          <a className={styles.modalLinkPrimary} href={projectDetails.liveUrl} target="_blank" rel="noreferrer">
                            <i className="fas fa-globe" aria-hidden="true" />
                            Open the live site
                          </a>
                          {projectDetails.repoUrl && (
                            <a className={styles.modalLinkSecondary} href={projectDetails.repoUrl} target="_blank" rel="noreferrer">
                              <i className="fab fa-github" aria-hidden="true" />
                              View the code
                            </a>
                          )}
                        </div>
                        {projectDetails.note && <p className={styles.modalFine}>{projectDetails.note}</p>}
                      </div>
                    ) : (
                      <>
                        <h3 className="text-4 font-weight-600">
                          Project Info:
                        </h3>
                        <p>
                          This card is a layout sample. It is not a completed client project.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function PlayIcon() {
  return (
    <svg className={styles.slideIcon} viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3.1 1.5v9L10.2 6 3.1 1.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg className={styles.slideIcon} viewBox="0 0 12 12" aria-hidden="true">
      <rect x="2.1" y="1.5" width="2.3" height="9" rx="0.6" fill="currentColor" />
      <rect x="7.6" y="1.5" width="2.3" height="9" rx="0.6" fill="currentColor" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg className={styles.slideIcon} viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M4.2 2.1 8 6 4.2 9.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ProjectDetailsModal;
