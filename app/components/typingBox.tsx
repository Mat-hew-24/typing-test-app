"use client";

import React, { useEffect, useState } from "react";
import styles from "./mainPage.module.css";
import englsh_1k from "./english_1k.json";
import Timer from "./timer";
function strToNestedArray(str: string): string[][] {
  return str.split("\n").map((line) => [...line]);
}
function getRandomString(len: number) {
  const wordList = englsh_1k.words;
  const result = Array.from({ length: len }, () => {
    const i = Math.floor(Math.random() * wordList.length);
    return wordList[i];
  }).join(" ");
  return result;
}

const targetText = getRandomString(20);

type TypingBoxProp={timeVal:number,setTimeRunner:(x:boolean)=>void,timeRunner:boolean,setTimeVal:(x:number)=>void,setIsToggle:(x:boolean)=>void}

export default function TypingBox({timeVal,timeRunner,setTimeRunner,setTimeVal,setIsToggle}:TypingBoxProp) {
  const [userInput, setUserInput] = useState("");
  const lettersArr = strToNestedArray(targetText);

  // Flatten the target text for comparison (preserves spaces and newlines)
  const flatInput = userInput.split("");

  // Handle input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  let inputIndex = 0;

  useEffect(()=>{
    if (userInput){
      setTimeRunner(true);
      console.log(timeRunner);
    }
  },[userInput]);

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
        <div>
        <Timer timeVal={timeVal} setTimeVal={setTimeVal} timeRunner={timeRunner} setIsToggle={setIsToggle} />
        </div>
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
