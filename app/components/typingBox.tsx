import styles from "./mainPage.module.css";
export default function typingBox() {
  return (
    <div className={styles.floatingL} style={{ position: "relative" }}>
      <label htmlFor="tt" className={styles.rr}>
        wandering clouds drift above silent hills where forgotten whispers echo
        through ancient trees under twilight mysterious golden shimmering light
      </label>
      <textarea
        id="tt"
        className={styles.wordBox}
        style={{ position: "relative", zIndex: 2, background: "transparent" }}
      ></textarea>
    </div>
  );
}
