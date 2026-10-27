import styles from "./Preloader.module.css";

const Preloader = () => {
  return (
    <div className={"preloader " + styles.root} role="status">
      <span className="visually-hidden">Loading the portfolio.</span>
      <div className="lds-ellipsis" aria-hidden="true">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Preloader;
