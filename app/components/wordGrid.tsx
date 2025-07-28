import React from "react";
import styles from "./mainPage.module.css";

type WordGridProp = {
  targetText: string;
  userInput: string;
};

const WordGrid = React.memo(({ targetText, userInput }: WordGridProp) => {
  WordGrid.displayName = "WordGrid";
  const words = targetText.split(" ");
  const flatInput = [...userInput];
  let globalCharIndex = 0;

  return (
    <div className={styles.innerBox}>
      {words.map((word, wordIdx) => (
        <div key={`word-${wordIdx}`} className={styles.word}>
          {[...word, " "].map((letter, letterIdx) => {
            const charIndex = globalCharIndex;
            const currentInput = flatInput[charIndex];
            let letterClass = styles.letter;

            if (currentInput !== undefined) {
              letterClass +=
                currentInput === letter
                  ? ` ${styles.correct}`
                  : ` ${styles.incorrect}`;
            }

            if (charIndex === flatInput.length) {
              letterClass += ` ${styles.activeLetter}`;
            }

            globalCharIndex++; // safely incremented after capture

            return (
              <span
                key={`char-${wordIdx}-${letterIdx}`} // ✅ unique, stable
                className={`${letterClass}${letter === " " ? ` ${styles.space}` : ""}`}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default WordGrid;
