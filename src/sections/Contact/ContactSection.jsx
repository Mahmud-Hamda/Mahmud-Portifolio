import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Tooltip } from "../../components/Tooltip/Tooltip";
import styles from "./ContactSection.module.css";

const contact = {
  eyebrow: "Contact",
  title: "Get in Touch",
  addressHeading: "Based in",
  addressLines: ["Denver, Colorado"],
  phone: "+1 720 365 1849",
  whatsapp: "https://wa.me/17203651849",
  website: "https://mahmudhamda.tech/",
  followHeading: "Follow Me",
  formHeading: "Send me a note",
};

const emailConfig = {
  serviceId: "service_7wg1syz",
  templateId: "template_m8p1vlr",
  publicKey: "W8WqYJpYUP3F-5A_V",
};

const limits = { name: 80, email: 254, message: 2000 };
const sendTimeoutMs = 20000;
const intents = new Set([
  "I'm hiring",
  "I have a project",
  "I have a suggestion/question",
  "Other",
]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

const fieldCopy = {
  name: {
    empty: "Enter your name.",
    long: "Use 80 characters or fewer for your name.",
  },
  email: {
    empty: "Enter the email where I should reply.",
    invalid: "Enter an email like name@email.com.",
  },
  intent: "Choose what this note is about.",
  message: {
    empty: "Write the note.",
    long: "Shorten the note to 2,000 characters.",
  },
  offline: "You look offline. Reconnect, then send the note again.",
  timeout: "The note took too long to send. Try again in a moment.",
  limited: "Too many notes were sent just now. Wait a minute, then try again.",
  rejected: "That note was rejected. Check the email and send it again.",
  failed: "The note did not send. Try again in a moment, or email mkhamda3@gmail.com.",
  success: "The note was sent. I will reply to the email you entered.",
};

const validateFields = ({ name, email, intent, message }) => {
  const errors = {};
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName) errors.name = fieldCopy.name.empty;
  else if (trimmedName.length > limits.name) errors.name = fieldCopy.name.long;

  if (!trimmedEmail) errors.email = fieldCopy.email.empty;
  else if (
    trimmedEmail.length > limits.email ||
    !emailPattern.test(trimmedEmail)
  ) {
    errors.email = fieldCopy.email.invalid;
  }

  if (!intents.has(intent)) errors.intent = fieldCopy.intent;

  if (!trimmedMessage) errors.message = fieldCopy.message.empty;
  else if (trimmedMessage.length > limits.message) errors.message = fieldCopy.message.long;

  return errors;
};

const failureMessage = (error) => {
  if (!navigator.onLine || error?.code === "offline") return fieldCopy.offline;
  if (error?.code === "timeout") return fieldCopy.timeout;
  if (error?.status === 429) return fieldCopy.limited;
  if (error?.status === 400 || error?.status === 422) return fieldCopy.rejected;
  return fieldCopy.failed;
};

const withTimeout = (promise, ms) =>
  new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      reject(Object.assign(new Error("timeout"), { code: "timeout" }));
    }, ms);
    promise.then(
      (value) => {
        window.clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(timer);
        reject(error);
      }
    );
  });

const socialLinks = [
  { name: "Website", href: "https://mahmudhamda.tech/", icon: "fas fa-globe", itemClass: "social-icons-website" },
  { name: "WhatsApp", href: "https://wa.me/17203651849", icon: "fab fa-whatsapp", itemClass: "social-icons-whatsapp" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mahmud-hamda", icon: "fab fa-linkedin-in", itemClass: "social-icons-linkedin" },
  { name: "GitHub", href: "https://github.com/Mahmud-Hamda", icon: "fab fa-github", itemClass: "social-icons-github" },
];

const ContactSection = ({ profile }) => {
  const formRef = useRef();
  const sendingRef = useRef(false);
  const requestRef = useRef(0);
  const [sendingMail, setSendingMail] = useState(false);
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => () => {
    requestRef.current += 1;
  }, []);

  const clearField = (key) => {
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    setFormStatus(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (sendingRef.current) return;

    const form = formRef.current;
    const name = form.elements.user_name.value;
    const email = form.elements.user_email.value;
    const intent = form.elements.intent.value;
    const message = form.elements.message.value;
    const nextErrors = validateFields({ name, email, intent, message });
    setErrors(nextErrors);
    setFormStatus(null);

    const firstInvalid = ["name", "email", "intent", "message"].find((key) => nextErrors[key]);
    if (firstInvalid) {
      const fieldId = {
        name: "contact-name",
        email: "contact-email",
        intent: "contact-intent",
        message: "contact-message",
      }[firstInvalid];
      document.getElementById(fieldId)?.focus();
      return;
    }

    if (!navigator.onLine) {
      setFormStatus({ type: "error", message: fieldCopy.offline });
      return;
    }

    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    sendingRef.current = true;
    setSendingMail(true);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    withTimeout(
      emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          name: trimmedName,
          email: trimmedEmail,
          title: intent,
          message: `${intent}.\n\n${trimmedMessage}`,
          user_name: trimmedName,
          user_email: trimmedEmail,
          intent,
        },
        emailConfig.publicKey
      ),
      sendTimeoutMs
    ).then(
      () => {
        if (requestRef.current !== requestId) return;
        form.reset();
        setMessageCount(0);
        setErrors({});
        setFormStatus({ type: "success", message: fieldCopy.success });
        sendingRef.current = false;
        setSendingMail(false);
      },
      (error) => {
        if (requestRef.current !== requestId) return;
        setFormStatus({ type: "error", message: failureMessage(error) });
        sendingRef.current = false;
        setSendingMail(false);
      }
    );
  };
  return (
    <section
      id="contact"
      className={styles.root + " section "}
    >
      <div className="container px-lg-5">
        <div className={"position-relative d-flex text-center mb-5" + " section-title-band"}>
          <h2
            className={
              "text-24  text-uppercase fw-600 w-100 mb-0 " +
              "text-light opacity-4"
            }
            aria-hidden="true"
          >
            {contact.eyebrow}
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
            {contact.title}
            <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
          </p>
        </div>
        <div className="row gy-5">
          <div className="col-md-5 col-xl-4 order-1 order-md-0 text-center text-md-start">
            <h2
              className={
                "mb-3 text-5 text-uppercase "
              }
            >
              {contact.addressHeading}
            </h2>
            <div className="contact-address">
              <span className="contact-pin" aria-hidden="true">
                <i className="fas fa-location-dot" />
              </span>
              <p className={"text-3 mb-0 "}>
                {contact.addressLines.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < contact.addressLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <p className={"text-3 mb-1 "}>
              <span className="text-primary text-4 me-2">
                <i className="fas fa-phone" />
              </span>
              <a href="tel:+17203651849">{contact.phone}</a>
            </p>
            <p className={"text-3 mb-1 "}>
              <span className="text-primary text-4 me-2">
                <i className="fab fa-whatsapp" />
              </span>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </p>
            <p className={"contact-email text-3 mb-1 "}>
              <span className="text-primary text-4 me-2">
                <i className="fas fa-envelope" />
              </span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
            <p className={"text-3 mb-4 "}>
              <span className="text-primary text-4 me-2">
                <i className="fas fa-globe" />
              </span>
              <a href={contact.website} target="_blank" rel="noreferrer">
                mahmudhamda.tech
              </a>
            </p>
            <h2
              className={
                "mb-3 text-5 text-uppercase "
              }
            >
              {contact.followHeading}
            </h2>
            <ul className="social-icons justify-content-center justify-content-md-start">
              {socialLinks.map((item) => (
                <li className={item.itemClass} key={item.name}>
                  <Tooltip text={item.name} placement="top">
                    <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                      <i className={item.icon} />
                    </a>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-7 col-xl-8 order-0 order-md-1">
            <h2 className="mb-3 text-5 text-center text-md-start">
              {contact.formHeading}
            </h2>
            <form
              className={"soft-card p-4 "}
              id="contact-form"
              ref={formRef}
              noValidate
              onSubmit={onSubmit}
            >
              <div className="row g-4">
                <div className="col-xl-6">
                  <label className={styles.fieldLabel} htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="user_name"
                    type="text"
                    className={"form-control" + (errors.name ? " " + styles.invalid : "")}
                    required
                    autoComplete="name"
                    dir="auto"
                    maxLength={limits.name}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : "contact-name-hint"}
                    placeholder="Your name"
                    onInput={() => clearField("name")}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" className={styles.fieldError} role="alert">
                      {errors.name}
                    </p>
                  ) : (
                    <p id="contact-name-hint" className={styles.hint}>
                      80 characters at most.
                    </p>
                  )}
                </div>
                <div className="col-xl-6">
                  <label className={styles.fieldLabel} htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="user_email"
                    type="email"
                    inputMode="email"
                    className={"form-control" + (errors.email ? " " + styles.invalid : "")}
                    required
                    autoComplete="email"
                    dir="auto"
                    maxLength={limits.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    placeholder="name@email.com"
                    onInput={() => clearField("email")}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className={styles.fieldError} role="alert">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <div className="col-12">
                  <label className={styles.fieldLabel} htmlFor="contact-intent">
                    This note is about
                  </label>
                  <select
                    id="contact-intent"
                    name="intent"
                    className={"form-select" + (errors.intent ? " " + styles.invalid : "")}
                    required
                    defaultValue=""
                    aria-invalid={Boolean(errors.intent)}
                    aria-describedby={errors.intent ? "contact-intent-error" : undefined}
                    onChange={() => clearField("intent")}
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    <option value="I'm hiring">I'm hiring</option>
                    <option value="I have a project">I have a project</option>
                    <option value="I have a suggestion/question">I have a suggestion/question</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.intent ? (
                    <p id="contact-intent-error" className={styles.fieldError} role="alert">
                      {errors.intent}
                    </p>
                  ) : null}
                </div>
                <div className="col-12">
                  <label className={styles.fieldLabel} htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={"form-control " + styles.message + (errors.message ? " " + styles.invalid : "")}
                    rows={5}
                    required
                    dir="auto"
                    maxLength={limits.message}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message
                        ? "contact-message-error"
                        : messageCount >= limits.message - 200
                          ? "contact-message-count"
                          : "contact-message-hint"
                    }
                    placeholder="The role, the project, or the suggestion."
                    defaultValue=""
                    onInput={(event) => {
                      setMessageCount(event.target.value.length);
                      clearField("message");
                    }}
                  />
                  {errors.message ? (
                    <p id="contact-message-error" className={styles.fieldError} role="alert">
                      {errors.message}
                    </p>
                  ) : messageCount >= limits.message - 200 ? (
                    <p id="contact-message-count" className={styles.hint}>
                      {limits.message - messageCount} characters left.
                    </p>
                  ) : (
                    <p id="contact-message-hint" className={styles.hint}>
                      2,000 characters at most.
                    </p>
                  )}
                </div>
              </div>
              {formStatus ? (
                <p
                  className={
                    styles.status + (formStatus.type === "error" ? " " + styles.statusError : "")
                  }
                  role={formStatus.type === "error" ? "alert" : "status"}
                >
                  {formStatus.message}
                </p>
              ) : null}
              <p className="text-center mt-4 mb-0">
                <button
                  id="submit-btn"
                  className={styles.sendBtn}
                  type="submit"
                  disabled={sendingMail}
                  aria-busy={sendingMail}
                >
                  {sendingMail ? (
                    <>
                      <span
                        role="status"
                        aria-hidden="true"
                        className="spinner-border spinner-border-sm align-self-center me-2"
                      ></span>
                      Sending...
                    </>
                  ) : (
                    <>Send Message</>
                  )}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
