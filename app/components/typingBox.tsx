"use client";

import React, { useState } from "react";
import styles from "./mainPage.module.css";

function strToNestedArray(str: string): string[][] {
  return str.split("\n").map((line) => [...line]);
}

const targetText = "hi what is your name\nMy name is Amer";

export default function TypingBox() {
  const [userInput, setUserInput] = useState("");
  const lettersArr = strToNestedArray(targetText);

  // Flatten the target text for comparison (preserves spaces and newlines)
  const flatTarget = targetText.split("");
  const flatInput = userInput.split("");

  // Handle input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  let inputIndex = 0;

  return (
    <div>
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
    </div>
  );
}
