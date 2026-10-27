import styles from "./Disclaimer.module.css";

const Disclaimer = () => {
  return (
    <div
      id="disclaimer"
      className={"modal fade " + styles.root}
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div
          className={
            "modal-content "
          }
        >
          <div className="modal-header">
            <h2 className={"modal-title "}>
              Copyright &amp; Disclaimer
            </h2>
            <button
              type="button"
              className={"btn-close "}
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body p-4">
            <p>
              Copyright © 2026 Mahmud Hamda. The personal details, contact
              information, and original writing on{" "}
              <a href="https://mahmudhamda.tech/" target="_blank" rel="noreferrer">
                mahmudhamda.tech
              </a>{" "}
              belong to Mahmud Hamda, Denver, Colorado. Please do not copy that
              material and present it as your own.
            </p>
            <ul className="lh-lg">
              <li>
                This site is a personal portfolio. It is not a job offer, a
                contract, or professional medical, cybersecurity, or legal
                advice.
              </li>
              <li>
                Sample project cards, testimonials, and service blurbs that
                still use placeholder titles are layout examples. They are not
                claims about a specific client engagement.
              </li>
              <li>
                The page layout is adapted from a portfolio template. Bootstrap,
                Google Fonts, and Font Awesome remain the property of their own
                authors.
              </li>
              <li>
                Links to other websites, including mahmudhamda.tech, leave this
                page. Mahmud is not responsible for the content of those sites.
              </li>
              <li>
                Contact details are provided so you can reach Mahmud. Please do
                not use them for spam or automated messages.
              </li>
              <li>
                Mahmud may correct or update this notice. The current version is
                dated October 15, 2026.
              </li>
              <li>
                Copyright questions can be sent to{" "}
                <a href="mailto:mkhamda3@gmail.com">mkhamda3@gmail.com</a> or by
                phone at +1 720 365 1849.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
