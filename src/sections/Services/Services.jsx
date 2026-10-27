import { useEffect, useState } from "react";
import biomedImage from "../../assets/images/services/service-biomed.jpg";
import styles from "./Services.module.css";

const services = [
  {
    name: "Biomedical engineering",
    image: "biomed",
    paragraphs: [
      "Applying rigorous engineering discipline to Biomedical Device Lifecycle Management—ensuring medical and critical hardware operates at peak reliability, safety, and compliance. Leveraging deep hands-on expertise in Equipment Installation, Calibration, Preventive Maintenance, and advanced Troubleshooting, I manage systems from initial deployment through ongoing servicing. By combining this hardware-level precision with Cyber Security Risk management, I bridge the gap between physical medical equipment and secure digital infrastructures.",
      "As a dedicated Medical Equipment Technician, I specialize in the comprehensive lifecycle management of critical hospital technology—from complex life-support systems (ventilators, defibrillators) and diagnostic monitors to advanced imaging and surgical suites. My daily work bridges hands-on engineering precision with clinical safety: executing rigorous installation, calibration, and preventive maintenance to guarantee flawless therapeutic output, performing rapid troubleshooting and repairs, and maintaining meticulous regulatory compliance. Beyond hardware, I manage OEM software patches, support medical device connectivity, and educate clinical staff to eliminate user error—ensuring that every piece of medical technology operates at peak reliability when patient care depends on it.",
    ],
  },
  {
    name: "Cybersecurity",
    image: "security",
    paragraphs: [
      "Applying a security-first mindset (backed by CompTIA Security+ expertise) to your digital products. I audit code, implement secure data handling, and ensure your applications are resilient against modern web threats. Leveraging specialized capabilities in Access Control, Cryptography, Threat Detection, and Network Security, I build and manage hardened web environments that protect critical user data and safeguard infrastructure from end to end.",
    ],
  },
  {
    name: "AI-powered full-stack",
    image: "stack",
    paragraphs: [
      "Building modern, end-to-end web applications designed for high performance and seamless user experiences. On the frontend, I craft fully Responsive Designs using React.js, JavaScript (ES6+), HTML5/CSS3, and Bootstrap 5. On the backend, I architect scalable server-side solutions using Node.js & Express.js, MySQL Database Design, and custom REST API Development—integrated with Git & GitHub for version control.",
      "Building modern, end-to-end solutions focusing not only on Full-Stack Web Development but also elevating standard web applications by embedding advanced AI integrations—including custom chatbots, Semantic Search, Retrieval-Augmented Generation (RAG), and interactive AI coaches—giving your platform cutting-edge smart capabilities, automated workflows, and rich contextual intelligence.",
      "I design the interface and carry it through to a published site. Layout, type, and color are built with HTML5, CSS3, and Bootstrap 5 so the page stays clear and responsive on every screen. Deployment puts that finished design online, with Git & GitHub keeping each version of the site in order.",
    ],
  },
];

const serviceImageLoaders = {
  biomed: () => Promise.resolve(biomedImage),
  security: () => import("../../assets/images/services/service-security.jpg").then((mod) => mod.default),
  stack: () => import("../../assets/images/services/service-stack.jpg").then((mod) => mod.default),
};

const Services = () => {
  const [active, setActive] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [imageSrc, setImageSrc] = useState(biomedImage);
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
