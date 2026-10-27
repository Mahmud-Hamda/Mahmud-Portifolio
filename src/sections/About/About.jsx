import styles from "./About.module.css";

const about = {
  eyebrow: "About Me",
  title: "Know Me More",
  paragraphs: [
    "I am a Senior Biomedical Engineer and Certified Cybersecurity Professional turned AI-Powered Full-Stack Web Developer. By combining rigorous analytical problem-solving from engineering, a security-first mindset from cybersecurity, and modern AI integration capabilities, I build web applications that are not only intelligent and high-performing, but also robust and secure from the ground up. I bridge the gap between complex technical systems and seamless digital experiences.",
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
          <div className="col-lg-7 col-xl-8 text-center text-lg-start">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          {/* About me content end */}
          {/* about me personal detials start */}
          <div className="col-lg-5 col-xl-4">
            <div className="ps-lg-4">
              <ul className="list-style-2">
                <li>
                  <span className="fw-600 me-2">Name:</span>
                  {profile.name}
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
