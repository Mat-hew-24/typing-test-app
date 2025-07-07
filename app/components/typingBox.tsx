"use client";

import React, { useState } from "react";
import styles from "./mainPage.module.css";

function strToNestedArray(str: string): string[][] {
  return str.split("\n").map((line) => [...line]);
}

const targetText =
  "HELLO MDJFVJ SDHBFCJISB ESDJVFJSN NJKNSKJFEN HJHJ  B JB HJB HJUB J KJB J KUIJ KJH KUIH JH BJH HJB FX DRFF TYGY GYT FT FY GYU GYU YH YI GYU GYU G7U HYU G YUGYU G IUHU7GU GH7U HU G7U GG 7UG Y7GF 6TYGF Y GF6Y7 GFY GF GU";

export default function TypingBox() {
  const [userInput, setUserInput] = useState("");
  const lettersArr = strToNestedArray(targetText);

  // Flatten the target text for comparison (preserves spaces and newlines)
  const flatInput = userInput.split("");

  // Handle input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  let inputIndex = 0;

  return (
    <>
      <textarea
        value={userInput}
        onChange={handleChange}
        className={styles.textBox}
        autoFocus
        tabIndex={0}
      />
      <div className={styles.wordBox}>
        {lettersArr.map((words, lineIdx) => (
          <div className={styles.line} key={lineIdx}>
            {words.map((word, wordIdx) => (
              <span className={styles.word} key={wordIdx}>
                {[...word].map((letter, letterIdx) => {
                  const currentInput = flatInput[inputIndex];
                  let letterClass = styles.letter;
                  if (currentInput !== undefined) {
                    if (currentInput === letter) {
                      letterClass += " " + styles.correct;
                    } else {
                      letterClass += " " + styles.incorrect;
                    }
                  }
                  // Highlight the current letter to type
                  if (inputIndex === userInput.length) {
                    letterClass += " " + styles.activeLetter;
                  }
                  inputIndex++;
                  return (
                    <span className={letterClass} key={letterIdx}>
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  );
                })}
                {/* Removed: {wordIdx < words.length - 1 && <span>{"\u00A0"}</span>} */}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
