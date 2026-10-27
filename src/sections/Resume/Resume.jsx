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
    { name: "Devices", items: ["Medical Devices"] },
    { name: "Security", items: ["CyberSecurity", "Bash Script"] },
    {
      name: "The stack",
      items: [
        "HTML5 & CSS3",
        "Bootstrap 5",
        "Responsive Design & Media Queries",
        "JavaScript (ES6+)",
        "React.js+Vite",
        "Node.js & Express.js",
        "MySQL & Database Design",
        "REST API Development",
        "Git & GitHub",
        "AI API Integration",
        "Trello",
      ],
    },
  ],
};

const downloadLabels = {
  idle: "Download Resume",
  downloading: "Downloading…",
  success: "Downloaded",
  error: "Try again",
};

const downloadTimeoutMs = 20000;

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
            <h2 className={"resume-heading text-6 fw-600 "}>
              <i className="fas fa-graduation-cap" aria-hidden="true" />
              My Education
            </h2>
            {educationDetails.length > 0 &&
              educationDetails.map((value, index) => (
                <div
                  key={index}
                  className={"resume-card soft-card "}
                >
                  <h3 className={"resume-card-title "}>{value.heading}</h3>
                  <p className="resume-card-place">{value.place}</p>
                  <p className={"resume-card-date "}>{value.yearRange}</p>
                </div>
              ))}
          </div>
          {/* My Experience */}
          <div className="col-md-6 resume-column">
            <h2 className={"resume-heading text-6 fw-600 "}>
              <i className="fas fa-briefcase" aria-hidden="true" />
              My Experience
            </h2>
            <p className="resume-group-label">Independent study</p>
            {experienceDetails
              .filter((value) => value.place === "Self-paced")
              .map((value) => (
                <div key={value.heading} className={"resume-card soft-card "}>
                  <h3 className={"resume-card-title "}>{value.heading}</h3>
                  <p className="resume-card-place">{value.place}</p>
                  <p className={"resume-card-date "}>{value.yearRange}</p>
                </div>
              ))}
            <p className="resume-group-label">Employment</p>
            {experienceDetails
              .filter((value) => value.place !== "Self-paced")
              .map((value) => (
                <div key={value.heading} className={"resume-card soft-card "}>
                  <h3 className={"resume-card-title "}>{value.heading}</h3>
                  <p className="resume-card-place">{value.place}</p>
                  <p className={"resume-card-date "}>{value.yearRange}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="text-center mt-2">
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
        {/* My Skills */}
        <h2 className={"resume-heading text-6 fw-600 mt-4 "}>
          <i className="fas fa-chart-simple" aria-hidden="true" />
          My Skills
        </h2>
        <div className={"resume-skills soft-card"}>
          <div className="row gx-4 gy-4">
            {skillGroups.map((group) => (
              <div key={group.name} className="col-md-4">
                <h3 className="resume-skill-group">{group.name}</h3>
                <ul className="resume-skill-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
