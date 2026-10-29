import styles from "./BrandName.module.css";

// "Mahmud", "Mahmud Hamda", or "Ask Mahmud" as words. The (?![-\w]) keeps file
// names and links such as "Mahmud-Hamda-Resume.pdf" out of the match.
const NAME_PATTERN = /((?:Ask )?Mahmud(?: Hamda)?)(?![-\w])/g;

/**
 * Shows Mahmud's name in the launcher star's blue-violet-pink gradient.
 *
 * @param {Object} props
 * @param {import("react").ReactNode} props.children
 * @returns {JSX.Element}
 */
const BrandName = ({ children }) => <span className={styles.brandName}>{children}</span>;

/**
 * Splits text and wraps every occurrence of Mahmud's name in {@link BrandName}.
 *
 * @param {string} text
 * @returns {Array<string | JSX.Element>}
 */
export const highlightName = (text) =>
  text
    .split(NAME_PATTERN)
    .map((part, index) => (index % 2 ? <BrandName key={index}>{part}</BrandName> : part));

export default BrandName;
