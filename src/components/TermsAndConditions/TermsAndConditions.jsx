import BrandName from "../BrandName/BrandName";
import styles from "./TermsAndConditions.module.css";

const TermsAndConditions = () => {
  return (
    <div
      id="terms-policy"
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
              Terms &amp; Policy
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
              These terms and this privacy policy apply to{" "}
              <a href="https://mahmudhamda.tech/" target="_blank" rel="noreferrer">
                mahmudhamda.tech
              </a>
              , the personal portfolio of <BrandName>Mahmud Hamda</BrandName> in Denver, Colorado.
              Last updated October 15, 2026.
            </p>
            <h3 className={"mb-3 mt-4 "}>
              Terms of Use
            </h3>
            <p>
              You may browse this site, read the resume and project samples, and
              send a message through the contact form. The writing, layout, and
              project descriptions are <BrandName>Mahmud Hamda</BrandName>’s own work. Please do not
              copy them and present them as your own, and do not use the site to
              send spam, malware, or unlawful requests.
            </p>
            <h4 className={"text-4 mt-4 "}>
              Part I – Information <BrandName>Mahmud</BrandName> collects and controls
            </h4>
            <p>
              If you use the contact form, <BrandName>Mahmud</BrandName> receives your name, email
              address, and message, and keeps them so he can reply. The site
              does not ask you to create an account, and it does not collect
              payment details.
            </p>
            <h4 className={"text-4 mt-4 "}>
              Part II – Information that <BrandName>Mahmud</BrandName> processes on your behalf
            </h4>
            <p>
              This portfolio does not host accounts or data for other businesses.
              A message you send is delivered through EmailJS so it can reach{" "}
              <BrandName>Mahmud</BrandName>’s inbox. The page also loads fonts from Google Fonts.
              The icons are files on this site. Google Fonts receives the
              technical details a browser normally sends, such as your IP
              address, when those font files load.
            </p>
            <h4 className={"text-4 mt-4 "}>
              Part III – General
            </h4>
            <p>
              The site is offered as a personal portfolio. Project dates, job
              history, and skill notes describe <BrandName>Mahmud</BrandName>’s background and are not
              a contract or a job offer. <BrandName>Mahmud</BrandName> may update these terms by
              changing this page. Questions can be sent to{" "}
              <a href="mailto:mkhamda3@gmail.com">mkhamda3@gmail.com</a> or by
              phone at +1 720 365 1849.
            </p>
            <h3 className={"mb-3 mt-4 "}>
              Privacy Policy
            </h3>
            <p>
              <BrandName>Mahmud Hamda</BrandName>, 1530 S Florence Ct, Denver, Colorado 80247, is the
              person responsible for information collected through this site.
            </p>
            <ol className="lh-lg">
              <li>
                The contact form collects only your name, email address, and
                message.
              </li>
              <li>
                Those details are used to answer you. They are not sold or used
                for advertising.
              </li>
              <li>
                EmailJS processes the form so the message can be delivered.
              </li>
              <li>
                Google Fonts may log a request when your browser loads the
                font files. The icons are served from this site.
              </li>
              <li>
                The site does not use an account system and does not ask for
                payment information.
              </li>
              <li>
                You can ask to see or delete a message you sent by emailing
                mkhamda3@gmail.com.
              </li>
              <li>
                This policy may be updated on this page. The date above shows
                the latest version.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
