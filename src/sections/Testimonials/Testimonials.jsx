import { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import client1 from "../../assets/images/testimonial/client-sm-1.jpg";
import client2 from "../../assets/images/testimonial/client-sm-2.jpg";
import client3 from "../../assets/images/testimonial/client-sm-3.jpg";
import client4 from "../../assets/images/testimonial/client-sm-4.jpg";
import styles from "./Testimonials.module.css";

const SLIDE_INTERVAL_MS = 5000;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const reviews = [
  { name: "Dennis Jacques", position: "User from USA", src: client3, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", rating: 5 },
  { name: "Jay Shah", position: "Founder at Icomatic Pvt Ltd", src: client1, desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", rating: 5 },
  { name: "Patrick Cary", position: "Freelancer from USA", src: client2, desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", rating: 5 },
  { name: "Chris Tom", position: "User from UK", src: client4, desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", rating: 5 },
];

const Testimonials = () => {
  const sliderRef = useRef(null);
  const onSlide = useRef(() => {});
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [timerKey, setTimerKey] = useState(0);
  const count = reviews.length;

  onSlide.current = (next) => {
    setCurrent(((next % count) + count) % count);
  };

  const settings = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: count > 1,
      speed: prefersReducedMotion() ? 0 : 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (_previous, next) => onSlide.current(next),
    }),
    [count]
  );

  useEffect(() => {
    if (!playing || count < 2) return undefined;
    const id = window.setInterval(() => {
      sliderRef.current?.slickNext();
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, count, timerKey]);

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
    <section
      id="testimonial"
      className={styles.root + " section "}
    >
      <div className="container px-lg-5">
        {/* Heading */}
        <div className={"position-relative d-flex text-center mb-5" + " section-title-band"}>
          <h2
            className={
              "text-24  text-uppercase fw-600 w-100 mb-0 " +
              "text-light opacity-4"
            }
            aria-hidden="true"
          >
            Testimonial
          </h2>
          <p
            role="heading"
            aria-level={2}
            className={
              "text-9 text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 " +
              "text-dark"
            }
          >
            {" "}
            Client Speak
            <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
          </p>
        </div>
        <p className="text-center mb-4">
          Sample quotes for the layout. Not client feedback.
        </p>

        <Slider {...settings} ref={sliderRef}>
          {reviews.length > 0 &&
            reviews.map((value, index) => (
              <div className="item" key={index}>
                <div
                  className={
                    "soft-card rounded p-5 "
                  }
                >
                  <div className="d-flex align-items-center mt-auto mb-4">
                    <img
                      className="img-fluid rounded-circle border d-inline-block w-auto"
                      src={value.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <p className="ms-3 mb-0">
                      <strong
                        className={
                          "d-block fw-600 " +
                          "text-dark"
                        }
                      >
                        {value.name}
                      </strong>
                      <span className="text-muted fw-500">
                        {" "}
                        {value.position}{" "}
                      </span>
                    </p>
                  </div>
                  <p
                    className={
                      " fw-500 mb-4 " + "text-dark"
                    }
                  >
                    “{value.desc}”
                  </p>
                  <span className="text-2">
                    {[...Array(value.rating)].map((value, i) => (
                      <i className="fas fa-star text-warning" key={i} />
                    ))}
                  </span>
                </div>
              </div>
            ))}
        </Slider>
        {count > 1 && (
          <div className={styles.slideBar} role="group" aria-label="Client comments">
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
              {reviews.map((review, index) => (
                <button
                  key={review.name}
                  type="button"
                  className={
                    index === current
                      ? `${styles.slideDot} ${styles.slideDotOn}`
                      : styles.slideDot
                  }
                  aria-label={`Show comment ${index + 1} of ${count}, ${review.name}`}
                  aria-current={index === current ? "true" : undefined}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <button
              type="button"
              className={`${styles.slideButton} ${styles.slideNext}`}
              onClick={goNext}
              aria-label="Next comment"
            >
              <NextIcon />
            </button>
          </div>
        )}
      </div>
    </section>
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
      <path d="M2.1 1.5h2.3v9H2.1zm5.5 0h2.3v9H7.6z" fill="currentColor" />
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

export default Testimonials;
