import BrandName from "../BrandName/BrandName";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer id="footer" className={styles.root}>
      <div className="container px-lg-5">
        <div className="row gx-0 gy-3 align-items-center">
          <div className="col-lg-6">
            <p className="footer-copy mb-0">
              Copyright © {new Date().getFullYear()}{" "}
              <span className="footer-name">
                <BrandName>Mahmud Hamda</BrandName>
              </span>
              . All rights reserved.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="footer-right">
              <div className="footer-nav">
                <a data-bs-toggle="modal" data-bs-target="#terms-policy" href="#terms-policy">
                  Terms &amp; Conditions
                </a>
                <a data-bs-toggle="modal" data-bs-target="#terms-policy" href="#terms-policy">
                  Privacy Policy
                </a>
              </div>
              <button
                type="button"
                className="footer-top"
                aria-label="Back to top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <i className="fas fa-arrow-up" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
