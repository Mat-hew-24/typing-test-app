"use client";

import React, { useState, useRef } from "react";
import styles from "./mainPage.module.css";
import english_1k from "./english_1k.json";

function getRandomString(len: number) {
  const wordList = english_1k.words;
  return Array.from({ length: len }, () => {
    const i = Math.floor(Math.random() * wordList.length);
    return wordList[i];
  }).join(" ");
}

const targetText = getRandomString(20);

export default function TypingBox() {
  const [userInput, setUserInput] = useState("");
  const wordStartTime = useRef<number | null>(null);

  const flatTarget = [...targetText];
  const flatInput = [...userInput];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Start time when new word begins
    if (
      value.length === 1 ||
      (userInput.endsWith(" ") && value.length > userInput.length)
    ) {
      wordStartTime.current = Date.now();
    }

    // If space typed, calculate word time
    if (
      value.length > userInput.length &&
      value[value.length - 1] === " " &&
      wordStartTime.current
    ) {
      const duration = Date.now() - wordStartTime.current;
      console.log("Word typed in", duration, "ms");
      wordStartTime.current = null;
    }

    setUserInput(value);
  };

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
        {flatTarget.map((letter, idx) => {
          const currentInput = flatInput[idx];
          let letterClass = styles.letter;

          if (currentInput !== undefined) {
            if (currentInput === letter) {
              letterClass += " " + styles.correct;
            } else {
              letterClass += " " + styles.incorrect;
            }
          }

          if (idx === userInput.length) {
            letterClass += " " + styles.activeLetter;
          }

          return (
            <span
              key={idx}
              className={`${letterClass} ${letter === " " ? styles.space : ""}`}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          );
        })}
      </div>
    </>
  );
}
