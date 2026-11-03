import { useEffect, useState } from "react";
import stackImage from "../../assets/images/services/service-stack.jpg";
import styles from "./Services.module.css";

const services = [
  {
    name: "AI-powered full-stack",
    image: "stack",
    paragraphs: [
      "I build web applications from the interface through to a published site. The frontend uses React.js, JavaScript (ES6+), HTML5, CSS3, and Bootstrap 5, so the layout stays clear on every screen. The backend uses Node.js, Express.js, MySQL, and REST APIs. Git and GitHub keep each version in order.",
      "Where it helps the product, I add AI: custom chatbots, semantic search, retrieval-augmented generation (RAG), and interactive coaches. These features answer questions, search a site’s own material, and support automated workflows.",
    ],
  },
  {
    name: "Cybersecurity",
    image: "security",
    paragraphs: [
      "I bring a security-first approach, backed by CompTIA Security+. I review code, handle data securely, and harden web applications against current threats. The work covers access control, cryptography, threat detection, and network security, so user data and the systems behind it stay protected.",
    ],
  },
  {
    name: "Biomedical Engineering",
    image: "biomed",
    paragraphs: [
      "I manage hospital equipment through its full life, from life-support systems such as ventilators and defibrillators to diagnostic monitors, imaging, and surgical suites. I install, calibrate, and maintain that equipment, and I repair it when it fails, so it stays reliable and within regulations. I also apply manufacturer software updates, support device connections, and train clinical staff so the equipment is used correctly when patient care depends on it.",
    ],
  },
];

const serviceImageLoaders = {
  stack: () => Promise.resolve(stackImage),
  security: () => import("../../assets/images/services/service-security.jpg").then((mod) => mod.default),
  biomed: () => import("../../assets/images/services/service-biomed.jpg").then((mod) => mod.default),
};

const Services = () => {
  const [active, setActive] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [imageSrc, setImageSrc] = useState(stackImage);
  const current = services[active] ?? services[0];

  useEffect(() => {
    let cancel = false;
    const load = serviceImageLoaders[current.image];
    if (!load) return undefined;
    load().then((src) => {
      if (!cancel) setImageSrc(src);
    }).catch(() => {
      if (!cancel) setImageFailed(true);
    });
    return () => {
      cancel = true;
    };
  }, [current.image]);

  return (
    <section id="services" className={styles.root + " section "}>
      <div className="container px-lg-5">
        <div className={"position-relative d-flex text-center mb-5" + " section-title-band"}>
          <h2
            className={
              "text-24  text-uppercase fw-600 w-100 mb-0 " +
              "text-light  opacity-4"
            }
            aria-hidden="true"
          >
            Services
          </h2>
          <p
            role="heading"
            aria-level={2}
            className={
              "text-9  fw-600 position-absolute w-100 align-self-center lh-base mb-0 " +
              "text-dark"
            }
          >
            What I Do?
            <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
          </p>
        </div>

        <div className="row gy-4 align-items-stretch">
          <div className="col-lg-4">
            <div className={styles.widget}>
              <ul className={styles.list}>
                {services.map((service, index) => (
                  <li key={service.name}>
                    <button
                      type="button"
                      className={index === active ? styles.current : ""}
                      aria-pressed={index === active}
                      onClick={() => {
                        setActive(index);
                        setImageFailed(false);
                      }}
                    >
                      <span>{service.name}</span>
                      <i className="fas fa-chevron-right" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-8">
            {imageFailed ? (
              <p className={styles.missing}>The photo did not load.</p>
            ) : (
              <img
                className={styles.visual}
                src={imageSrc}
                alt={`Illustration for ${current.name}`}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
        </div>

        <div className="row gy-4 align-items-center mt-4">
          <div className="col-md-5 col-lg-4">
            <div className={styles.talkCard}>
              <div className={styles.talkPhoto}>
                <a className={styles.talkBtn} href="#contact">
                  Let's Talk
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-lg-8">
            <h3 className={styles.detailTitle}>{current.name}</h3>
            {current.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.detailText}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
