import { useEffect, useState } from "react";
import { Tooltip } from "../Tooltip/Tooltip";
import { Link } from "react-scroll";
import styles from "./Header.module.css";

const navItems = [
  { to: "home", label: "Home" },
  { to: "about", label: "About Me" },
  { to: "services", label: "What I Do" },
  { to: "resume", label: "Resume" },
  { to: "portfolio", label: "Portfolio" },
  { to: "testimonial", label: "Testimonial" },
  { to: "contact", label: "Contact" },
];

const profileSocial = [
  { name: "Website", href: "https://mahmudhamda.tech/", icon: "fas fa-globe", itemClass: "social-icons-website" },
  { name: "WhatsApp", href: "https://wa.me/17203651849", icon: "fab fa-whatsapp", itemClass: "social-icons-whatsapp" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mahmud-hamda", icon: "fab fa-linkedin-in", itemClass: "social-icons-linkedin" },
  { name: "GitHub", href: "https://github.com/Mahmud-Hamda", icon: "fab fa-github", itemClass: "social-icons-github" },
];

const Header = ({ profile }) => {
  const [isNavModalClose, setIsNavModalClose] = useState(true);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [navOffset, setNavOffset] = useState(() =>
    window.matchMedia("(max-width: 991.98px)").matches ? -120 : 0
  );
  const motionDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : 500;

  const onCloseNav = () => setIsNavModalClose(true);
  const onToggleNav = () => setIsNavModalClose((open) => !open);

  useEffect(() => {
    if (isNavModalClose) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onCloseNav();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isNavModalClose]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 991.98px)");
    const apply = () => setNavOffset(query.matches ? -120 : 0);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <header id="header" className={"sticky-top " + styles.root}>
      <nav className="primary-menu navbar navbar-expand-lg navbar-dark bg-dark border-bottom-0">
        <div className="container-fluid position-relative h-100 flex-lg-column ps-3 px-lg-3 pt-lg-3 pb-lg-2">
          <Link
            smooth={motionDuration > 0}
            duration={motionDuration}
            style={{ cursor: "pointer" }}
            to="home"
            className="mb-lg-auto mt-lg-4"
            onClick={(e) => {
              e.preventDefault();
              onCloseNav();
            }}
          >
            {photoFailed ? null : (
              <span className="bg-dark-2 rounded-pill p-2 mb-lg-1 d-none d-lg-inline-block">
                <img
                  className="img-fluid rounded-pill d-block"
                  src={profile.profileImage}
                  title={`I'm ${profile.firstName}`}
                  alt="Mahmud Hamda"
                  onError={() => setPhotoFailed(true)}
                />
              </span>
            )}
            <h1 className="text-5 text-white text-center mb-0 d-lg-block">
              {profile.name}
            </h1>
          </Link>
          <div
            id="header-nav"
            className={
              isNavModalClose
                ? "collapse navbar-collapse w-100 my-lg-auto "
                : "show navbar-collapse w-100 my-lg-auto"
            }
          >
            <ul className="navbar-nav text-lg-center my-lg-auto py-lg-3">
              {navItems.map((item) => (
                <li className="nav-item" key={item.to}>
                  <Link
                    className="nav-link "
                    smooth={motionDuration > 0}
                    duration={motionDuration}
                    style={{ cursor: "pointer" }}
                    activeClass="active"
                    spy
                    offset={item.to === "home" ? 0 : navOffset}
                    to={item.to}
                    onClick={(e) => {
                      e.preventDefault();
                      onCloseNav();
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="social-icons social-icons-muted social-icons-sm mt-lg-auto ms-auto ms-lg-0 d-flex">
            {profileSocial.map((item) => (
              <li className={item.itemClass} key={item.name}>
                <Tooltip text={item.name} placement="top">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <i className={item.icon} />
                  </a>
                </Tooltip>
              </li>
            ))}
          </ul>
          <button
            onClick={onToggleNav}
            className={
              isNavModalClose ? "navbar-toggler" : "navbar-toggler show"
            }
            id="navbar-toggler"
            type="button"
            aria-label={isNavModalClose ? "Open menu" : "Close menu"}
            aria-expanded={!isNavModalClose}
            aria-controls="header-nav"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
