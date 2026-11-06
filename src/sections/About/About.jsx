import { BrainCircuit, CodeXml, HeartPulse, ShieldCheck } from "lucide-react";
import BrandName from "../../components/BrandName/BrandName";
import styles from "./About.module.css";

const about = {
  eyebrow: "About Me",
  title: "Know Me More",
  role: "BUILDING SECURE, AI-POWERED WEB APPS WITH ENGINEERING PRECISION",
  summary:
    "I bridge complex physical systems, modern web engineering, and intelligent automation. With hands-on expertise spanning full-stack development, healthcare equipment lifecycle management, and cybersecurity, I build software that is resilient, performant, and secure by design.",
  competencyLabel: "Core Competencies",
  competencies: [
    {
      name: "Full-Stack Developer",
      icon: CodeXml,
      detail:
        "Building responsive web applications using React.js, JavaScript (ES6+), HTML5/CSS3, Bootstrap 5, Node.js, Express.js, MySQL, and REST APIs.",
    },
    {
      name: "AI Integrator",
      icon: BrainCircuit,
      detail:
        "Enhancing platforms with retrieval-augmented generation (RAG), custom chatbots, semantic search, and interactive AI coaches.",
    },
    {
      name: "Cybersecurity Professional",
      icon: ShieldCheck,
      detail:
        "CompTIA Security+ certified; applying threat detection, cryptography, network security, and secure code reviews to protect data and systems.",
    },
    {
      name: "Biomedical Engineer",
      icon: HeartPulse,
      detail:
        "Installing, calibrating, maintaining, and servicing critical clinical instrumentation—from life-support systems to diagnostic monitors and surgical suites.",
    },
  ],
};

const About = ({ profile }) => {
  return (
    <section id="about" className={styles.root + " section "}>
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
            {about.eyebrow}
          </h2>
          <p
            role="heading"
            aria-level={2}
            className={
              "text-9 text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 " +
              "text-dark"
            }
          >
            {about.title}
            <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
          </p>
        </div>
        {/* Heading end*/}
        <div className="row gy-5">
          {/* About me content start */}
          <div className="col-lg-7 col-xl-8 text-start">
            <p className={styles.lead}>{about.role}</p>
            <p className={styles.copy}>{about.summary}</p>
            <h3 className={styles.competencyHeading}>{about.competencyLabel}</h3>
            <dl className={styles.competencies}>
              {about.competencies.map(({ name, icon: Icon, detail }) => (
                <div key={name}>
                  <dt>
                    <span className={styles.competencyIcon} aria-hidden="true">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    {name}
                  </dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          {/* About me content end */}
          {/* about me personal detials start */}
          <div className="col-lg-5 col-xl-4">
            <div className="ps-lg-4">
              <ul className="list-style-2">
                <li>
                  <span className="fw-600 me-2">Name:</span>
                  <BrandName>{profile.name}</BrandName>
                </li>
                <li>
                  <span className="fw-600 me-2">Email:</span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li className="border-0">
                  <span className="fw-600 me-2">From:</span>
                  {profile.from}
                </li>
              </ul>
            </div>
          </div>
          {/* about me personal details end */}
        </div>
      </div>
    </section>
  );
};

export default About;
