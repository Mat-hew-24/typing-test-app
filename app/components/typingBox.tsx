import styles from "./mainPage.module.css";

function strToNestedArray(str: string): string[][][] {
  return str
    .split("\n") // Split into lines
    .map(
      (line) =>
        line
          .trim()
          .split(/\s+/) // Split into words (by spaces or tabs)
          .map((word) => [...word]) // Split each word into characters
    );
}

export default function typingBox() {
  const lettersArr = strToNestedArray("hi what is your name\nMy name is Amer");
  return (
    <div className={styles.wordBox}>
      {lettersArr.map((words, lineIdx) => (
        <div className={styles.line} key={lineIdx}>
          {words.map((letters, wordIdx) => (
            <span className={styles.word} key={wordIdx}>
              {letters.map((letter, letterIdx) => (
                <span className={styles.letter} key={letterIdx}>
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
              {/* Add space between words except the last word */}
              {wordIdx < words.length - 1 && <span>{"\u00A0"}</span>}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
