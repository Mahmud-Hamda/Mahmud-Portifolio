import { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import heroBackground from "../../assets/images/intro-bg.jpg";
import styles from "./Hero.module.css";

const hero = {
  welcome: "Welcome",
  name: "I'm Mahmud Hamda.",
  strings: [
    "Biomedical Engineer.",
    "CyberSecurity Prof..",
    "Full-Stack Developer.",
  ],
  location: "based in Denver, Colorado.",
  backgroundImage: heroBackground,
  hireLabel: "Contact Me",
  hireTarget: "contact",
  scrollTarget: "about",
};

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
};

const scrollToSection = (section) => {
  const target = document.getElementById(section);
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
};

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const roleWriter = useRef(null);
  const [rolePaused, setRolePaused] = useState(false);

  const toggleRoleLine = () => {
    const writer = roleWriter.current;
    if (!writer) return;
    if (rolePaused) writer.start();
    else writer.pause();
    setRolePaused((paused) => !paused);
  };

  return (
    <section id="home" className={styles.root}>
      <div className="hero-wrap">
        <div className="hero-mask opacity-6 bg-dark" />

        {/* ---------------image background------------------ */}
        <div
          className="hero-bg parallax"
          style={{ backgroundImage: `url("${hero.backgroundImage}")` }}
        ></div>

        <div className="hero-content section d-flex min-vh-100">
          <div className="container my-auto">
            <div className="row">
              <div className={"col-12 text-center " + styles.heroCopy}>
                <p className="text-7 fw-500 text-white mb-2 mb-md-3">
                  {hero.welcome}
                </p>
                <div className={"text-16 fw-600 text-white mb-2 mb-md-3 " + styles.heroTitle}>
                  <h2 className={styles.heroName}>{hero.name}</h2>
                  <div className="hero-role">
                    <span className={styles.roleLine}>
                      <i className="fas fa-circle-check hero-check" aria-hidden="true" />
                      {reduceMotion ? (
                        <span>{hero.strings.join(" ")}</span>
                      ) : (
                        <Typewriter
                          onInit={(writer) => {
                            roleWriter.current = writer;
                          }}
                          options={{
                            strings: hero.strings,
                            autoStart: true,
                            loop: true,
                          }}
                        />
                      )}
                    </span>
                    {reduceMotion ? null : (
                      <button
                        type="button"
                        className={styles.rolePause}
                        aria-pressed={rolePaused}
                        aria-label={rolePaused ? "Play the role line" : "Pause the role line"}
                        onClick={toggleRoleLine}
                      >
                        <i className={rolePaused ? "fas fa-play" : "fas fa-pause"} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-5 text-light mb-4">{hero.location}</p>
                <div className={styles.heroActions + " mt-2"}>
                  <a
                    href={`#${hero.hireTarget}`}
                    className={styles.contactBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(hero.hireTarget);
                    }}
                  >
                    {hero.hireLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a
            href={`#${hero.scrollTarget}`}
            className="scroll-down-arrow smooth-scroll"
            aria-label="Scroll down"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(hero.scrollTarget);
            }}
          >
            <span className="animated">
              <i className="fas fa-angles-down" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
