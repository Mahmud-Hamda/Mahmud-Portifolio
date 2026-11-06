import { useEffect, useRef, useState } from "react";
import resumeFile from "../../assets/documents/resume.pdf";
import styles from "./Resume.module.css";

const resume = {
  education: [
    { yearRange: "2026", heading: "AI-Powered Full Stack Development", place: "Evangadi, Inc" },
    { yearRange: "2025", heading: "Introduction to Medical Software", place: "Coursera" },
    { yearRange: "2024 - 2025", heading: "CompTIA Security+ ce Certification", place: "CompTIA" },
    { yearRange: "2024", heading: "Cybersecurity in Healthcare", place: "Coursera" },
    { yearRange: "2011 - 2016", heading: "Bachelor of Science, Biomedical Engineering-Instrumentation and Medical Imaging", place: "Addis Ababa University" },
  ],
  experience: [
    { yearRange: "2026", heading: "AI-Powered Full Stack Developer", place: "Self-paced" },
    { yearRange: "2024 - 2025", heading: "CyberSecurity Professional", place: "Self-paced" },
    { yearRange: "2017 - 2023", heading: "Senior Biomedical Engineer", place: "Shaggar HO" },
    { yearRange: "2016 - 2017", heading: "Junior Biomedical Engineer", place: "Chancho Hospital" },
  ],
  skillGroups: [
    {
      name: "The stack",
      items: [
        "Node.js",
        "React",
        "Express.js",
        "MySQL", 
        "TiDB",
        "HTML/CSS",
        "Bootstrap",
        "JavaScript",    
        "Typescript",
        "Python",
        "Docker",
        "Netlify",
        "Vercel",
        "EmailJS",  
        "RESTful APIs",
      ],
    },
    { name: "Security", items: ["CyberSecurity", "Bash Script"] },
    { name: "Devices", items: ["Medical Devices"] },
    { name: "Collaboration Platform", items: ["Git/Github", "Trello"] },
  ],
};

const downloadLabels = {
  idle: "Download Resume",
  downloading: "Downloading…",
  success: "Downloaded",
  error: "Try again",
};

const downloadTimeoutMs = 20000;

const skillMarks = {
  "Node.js": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#3c873a" d="M16 2.4 28.2 9.4v13.2L16 29.6 3.8 22.6V9.4L16 2.4z" />
      <path fill="#fff" d="M16 7.2 23.4 11.4v8.4L16 23.9 8.6 19.8v-8.4L16 7.2z" />
      <path fill="#3c873a" d="M16 10.1 20.6 12.7v5.2L16 20.5l-4.6-2.6v-5.2L16 10.1z" />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61dafb" strokeWidth="1.4" />
      <ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61dafb" strokeWidth="1.4" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61dafb" strokeWidth="1.4" transform="rotate(120 16 16)" />
      <circle cx="16" cy="16" r="2.2" fill="#61dafb" />
    </svg>
  ),
  "Express.js": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <text x="16" y="21" textAnchor="middle" fill="#2b2b2b" fontFamily="Poppins, sans-serif" fontSize="13" fontWeight="700">ex</text>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#336791" d="M16.2 4c3.8.2 6.6 2.2 7.2 5.4.4 2.2-.2 4.1-1.2 5.4.8 1.2 1.1 2.6.8 4.2-.5 2.6-2.4 4.4-5 5.1l.6 2.4c.2.8-.2 1.3-1 1.3h-2.2c-.7 0-1.1-.5-.9-1.2l.5-2.2c-2.4-.3-4.4-1.3-5.6-3.1-1.4-2-1.6-4.4-.6-6.6-.8-1.4-1.1-3-.7-4.7C8.9 6.6 12 4.2 16.2 4zm-.4 3.2c-2.2.2-3.6 1.6-3.8 3.6-.1 1.6.6 2.8 1.8 3.4-.2 1.5.2 2.9 1.2 4 .9 1 2.2 1.5 3.8 1.6.2-1.6-.2-3-1.2-4.1 1.4-.5 2.3-1.7 2.2-3.4-.2-2.2-1.8-3.4-4-3.1z" />
      <circle cx="14.2" cy="11.2" r="1" fill="#fff" />
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#00ed64" d="M16.2 3s6.4 5.2 6.4 12.2c0 4.6-2.2 8.2-4.8 10.4-.4.3-.8.7-.8 1.2v1.4c0 .4-.4.8-.8.8s-.8-.4-.8-.8v-1.6c0-.6-.4-1-.9-1.3C12 23.2 9.6 19.4 9.6 15 9.6 8.2 16.2 3 16.2 3z" />
      <path fill="#001e2b" d="M16.1 6.2c.2 3.6-.2 8.4-1.6 12.6 1.8-3.4 2.4-7.6 1.6-12.6z" />
    </svg>
  ),
  MySQL: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#00758f" d="M7 18.5c1.6-4.8 4.2-8.2 7.4-9.8 1.2 2.4 1.6 5.2 1.2 8.2-2.2.6-4.6 1.8-6.6 3.6-.8-.6-1.4-1.3-2-2z" />
      <path fill="#f29111" d="M16.2 8.2c2.8-.2 5.6.8 7.8 2.8-1.6 2.2-2.4 4.8-2.2 7.6-2-.8-4.2-1.2-6.4-1.1.4-3.2.6-6.4.8-9.3z" />
      <path fill="#00758f" d="M14.8 17.2c2.4-.2 4.8.2 6.8 1.4-.6 2.6-2.2 4.6-4.6 5.6-1.6-2-2.4-4.4-2.2-7z" />
    </svg>
  ),
  "HTML/CSS": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#e44d26" d="M6 5h12.5l-1 16.2L11.8 23.4 6 21.2 6 5z" />
      <path fill="#f16529" d="M18.5 5H26l-1.2 16.2-6.2 2.2V5z" />
      <path fill="#264de4" d="M8.2 22.6 7 8.8h9.2v2.4H9.6l.3 3.4h6.3v2.4H10.4l.5 5.6 5.3 1.6v-2.2l-8 3.2z" opacity=".95" />
      <path fill="#2965f1" d="M24.8 8.8 24 22.6l-7.2 2.4v-2.2l4.8-1.6.4-5.2h-5.2v-2.4h5.6l.3-3.4H16.8V8.8h8z" />
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="4" fill="#f7df1e" />
      <text x="16" y="21.5" textAnchor="middle" fill="#111" fontFamily="Poppins, sans-serif" fontSize="12" fontWeight="700">JS</text>
    </svg>
  ),
  "Git/Github": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#181717" d="M16 4.2a11.8 11.8 0 0 0-3.7 23c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.8 11.8 0 0 0 16 4.2z" />
    </svg>
  ),
  TiDB: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#e85d4c" d="M16 4 26 10.2 22.4 22 16 28 9.6 22 6 10.2 16 4z" />
      <path fill="#fff" d="M16 9.2 21.2 12.6 19.2 19.4 16 22.4 12.8 19.4 10.8 12.6 16 9.2z" />
    </svg>
  ),
  Bootstrap: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="5" y="4" width="22" height="24" rx="5" fill="#7952b3" />
      <text x="16" y="22" textAnchor="middle" fill="#fff" fontFamily="Poppins, sans-serif" fontSize="15" fontWeight="700">B</text>
    </svg>
  ),
  Typescript: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="4" fill="#3178c6" />
      <text x="16" y="21.5" textAnchor="middle" fill="#fff" fontFamily="Poppins, sans-serif" fontSize="11" fontWeight="700">TS</text>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#3776ab" d="M15.2 5h5.2c2.6 0 4.2 1.6 4.2 4v3.2h-6.2c-2.4 0-4.2 1.6-4.2 4v1.6H9.2C6.6 17.8 5 16.2 5 13.6V9c0-2.4 1.6-4 4-4h6.2z" />
      <path fill="#ffd343" d="M16.8 27h-5.2c-2.6 0-4.2-1.6-4.2-4v-3.2h6.2c2.4 0 4.2-1.6 4.2-4V14.2h5c2.6 0 4.2 1.6 4.2 4.2v4.6c0 2.4-1.6 4-4 4h-6.2z" />
      <circle cx="12.2" cy="9.2" r="1.1" fill="#fff" />
      <circle cx="19.8" cy="22.8" r="1.1" fill="#fff" />
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#111" d="M16 6 27.5 26h-23L16 6z" />
    </svg>
  ),
  Trello: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="5" width="24" height="22" rx="3" fill="#0079bf" />
      <rect x="7.5" y="8" width="7" height="12" rx="1.2" fill="#fff" />
      <rect x="17.5" y="8" width="7" height="8" rx="1.2" fill="#fff" />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#2496ed" d="M15.2 11.2h2.6v2.4h-2.6zm-3.2 0h2.6v2.4H12zm-3.2 0h2.6v2.4H8.8zm6.4-3.2h2.6v2.4h-2.6zm-3.2 0h2.6v2.4H12z" />
      <path fill="#2496ed" d="M16.6 14.2h2.4v2.2h-2.4zm-3.2 0h2.4v2.2h-2.4zm-3.2 0h2.4v2.2H10.2zM7 16.6c.2 2.6 2.2 4.6 5.4 5.2 2.2.4 4.6.1 6.6-.9.4 1.2 1.4 1.8 2.8 1.6 1-.1 1.6-.8 1.8-1.6 1.4-.6 2.4-1.6 2.4-2.8 0-.6-.6-.8-1.2-.6-.8.3-1.6.2-2.2-.2-.4-1.4-1.8-2.4-3.6-2.6H6.6c-.4 0-.8.4-.6 1 .2.6.6 1.4 1 1.9z" />
    </svg>
  ),
  Netlify: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#32e6e2" d="M8.2 22.8 16 6.4l3.2 6.6-6.6 9.8H8.2z" />
      <path fill="#05bdba" d="M16 6.4 23.8 22.8h-6.4L14.2 16l1.8-9.6z" />
      <path fill="#014847" d="M17.4 16.2 20.6 22.8h-7.2l4-6.6z" />
    </svg>
  ),
  EmailJS: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#f15a24" d="M3.2 15.2 28.6 6.4 16.8 26.8 14.2 17.6 3.2 15.2z" />
      <path fill="#fff" d="M14.2 17.6 28.6 6.4 16.8 26.8z" opacity=".42" />
    </svg>
  ),
  "RESTful APIs": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="8" cy="16" r="2.4" fill="#6d5bd0" />
      <circle cx="24" cy="9" r="2.4" fill="#6d5bd0" />
      <circle cx="24" cy="23" r="2.4" fill="#6d5bd0" />
      <path d="M10.2 15.2 21.6 9.6M10.2 16.8 21.6 22.4" fill="none" stroke="#6d5bd0" strokeWidth="1.6" />
    </svg>
  ),
  CyberSecurity: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#5a45b8" d="M16 4.2 26 8.2v7.4c0 6-4 10.2-10 12.2-6-2-10-6.2-10-12.2V8.2L16 4.2z" />
      <path fill="#fff" d="M14.2 16.6 12.4 14.8l-1.4 1.4 3.2 3.2 6.4-6.4-1.4-1.4-5 5z" />
    </svg>
  ),
  "Bash Script": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="6" width="24" height="20" rx="3" fill="#1f6f4a" />
      <path d="M9 13.2 13.2 16 9 18.8" fill="none" stroke="#d1fae5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 20.2h7" fill="none" stroke="#d1fae5" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  "Medical Devices": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M5 16.5h5.2l2-5.2 3.2 9.2 2.2-4h9.4" fill="none" stroke="#e23b6a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const ResumeFlow = ({ items, labelId }) => (
  <ol className="resume-flow" aria-labelledby={labelId}>
    {items.map((value, index) => (
      <li
        key={`${value.heading}-${value.yearRange}`}
        className={"resume-flow-item" + (index === 0 ? " is-current" : "")}
      >
        <p className="resume-flow-date">{value.yearRange}</p>
        <h3 className="resume-card-title">{value.heading}</h3>
        <p className="resume-flow-place">{value.place}</p>
      </li>
    ))}
  </ol>
);

const SkillGroup = ({ group }) => (
  <div className="resume-skill-block">
    <h3 className="resume-skill-group">{group.name}</h3>
    <ul className="resume-skill-grid">
      {group.items.map((item) => (
        <li key={item} className="resume-skill-card">
          <span className="resume-skill-mark">{skillMarks[item]}</span>
          <span className="resume-skill-name">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Resume = () => {
  const educationDetails = resume.education;
  const experienceDetails = resume.experience;
  const skillGroups = resume.skillGroups;
  const [downloadState, setDownloadState] = useState("idle");
  const [downloadDetail, setDownloadDetail] = useState("");
  const resetTimer = useRef(null);
  const downloadingRef = useRef(false);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const handleDownload = async () => {
    if (downloadingRef.current) return;
    downloadingRef.current = true;
    window.clearTimeout(resetTimer.current);
    setDownloadDetail("");
    setDownloadState("downloading");
    const started = Date.now();
    const holdDownloading = () =>
      new Promise((resolve) => {
        window.setTimeout(resolve, Math.max(0, 700 - (Date.now() - started)));
      });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), downloadTimeoutMs);
    try {
      if (!navigator.onLine) {
        throw Object.assign(new Error("offline"), { code: "offline" });
      }
      const response = await fetch(resumeFile, { signal: controller.signal });
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Mahmud-Hamda-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      await holdDownloading();
      setDownloadDetail("The resume downloaded as Mahmud-Hamda-Resume.pdf.");
      setDownloadState("success");
      resetTimer.current = window.setTimeout(() => {
        setDownloadState("idle");
        setDownloadDetail("");
      }, 2500);
    } catch (error) {
      await holdDownloading();
      const offline = !navigator.onLine || error?.code === "offline";
      const timedOut = error?.name === "AbortError";
      setDownloadDetail(
        offline
          ? "You look offline. Reconnect, then download the resume again."
          : timedOut
            ? "The download took too long. Try again in a moment."
            : "The resume did not download. Try again, or email mkhamda3@gmail.com."
      );
      setDownloadState("error");
      resetTimer.current = window.setTimeout(() => setDownloadState("idle"), 4000);
    } finally {
      window.clearTimeout(timeout);
      downloadingRef.current = false;
    }
  };
  return (
    <section
      id="resume"
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
            Summary
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
            Resume
            <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
          </p>
        </div>
        {/* Heading end*/}
        <div className="row gx-5 resume-columns">
          {/* My Education */}
          <div className="col-md-6 resume-column">
            <h2 id="resume-education" className={"resume-heading text-6 fw-600 "}>
              <i className="fas fa-graduation-cap" aria-hidden="true" />
              My Education
            </h2>
            {educationDetails.length > 0 && (
              <ResumeFlow items={educationDetails} labelId="resume-education" />
            )}
          </div>
          {/* My Experience */}
          <div className="col-md-6 resume-column">
            <h2 id="resume-experience" className={"resume-heading text-6 fw-600 "}>
              <i className="fas fa-briefcase" aria-hidden="true" />
              My Experience
            </h2>
            {experienceDetails.length > 0 && (
              <ResumeFlow items={experienceDetails} labelId="resume-experience" />
            )}
          </div>
        </div>

        {/* My Skills */}
        <br /> <br />
        <h2 className={"resume-heading text-6 fw-600 mt-4 "}>
          <i className="fas fa-chart-simple" aria-hidden="true" />
          My Skills
        </h2>
        <div className="resume-skills">
          {skillGroups
            .filter((group) => group.name === "The stack")
            .map((group) => (
              <SkillGroup key={group.name} group={group} />
            ))}
          <div className="resume-skill-row">
            {skillGroups
              .filter((group) => group.name !== "The stack")
              .map((group) => (
                <SkillGroup key={group.name} group={group} />
              ))}
          </div>
        </div>
        <br /> <br />
        <div className="text-center mt-4">
          <button
            type="button"
            className={"resume-download" + (downloadState === "idle" ? "" : " is-" + downloadState)}
            onClick={handleDownload}
            disabled={downloadState === "downloading"}
            aria-live="polite"
            aria-busy={downloadState === "downloading"}
          >
            <i className="fas fa-download" aria-hidden="true" />
            {downloadLabels[downloadState]}
          </button>
          {downloadDetail ? (
            <p
              className={styles.downloadDetail}
              role={downloadState === "error" ? "alert" : "status"}
            >
              {downloadDetail}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Resume;
