"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./mainPage.module.css";
import english_1k from "./english_1k.json";
import Timer from "./timer";

function getRandomString(len: number) {
  const wordList = english_1k.words;
  return Array.from({ length: len }, () => {
    const i = Math.floor(Math.random() * wordList.length);
    return wordList[i];
  }).join(" ");
}


const targetText = getRandomString(30);


type TypingBoxProp = {
  timeVal: number; setTimeRunner: (x: boolean) => void ,timeRunner: boolean;
  setTimeVal: (x: number) => void, setIsToggle: (x: boolean) => void;
  wordTime: Array<number> , setRaw:(x:number)=>void, setAccuracy:(x:number)=>void,
  setWpm:(x:number)=>void,mode:number;
};

export default function TypingBox({
  timeVal,setWpm,
  timeRunner,
  setTimeRunner,
  setTimeVal,
  setIsToggle,
  mode,
  wordTime, setAccuracy,
  setRaw
}: TypingBoxProp) {
  const [userInput, setUserInput] = useState("");
  const wordStartTime = useRef<number | null>(null);

  const flatInput = [...userInput];


//Dynamic data calculating constants
  const dynoRawTime=useRef(0);




  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      if (duration){
        wordTime.push(duration);
        dynoRawTime.current+=duration;
        wordStartTime.current = null;
      }
      setRaw((wordTime.length/dynoRawTime.current)*60000);
    }

    setUserInput(value);

    //ACCURACY?

    let correct=0;
    for (let i=0;i<value.length;i++){
      if (value[i]===targetText[i]){
        correct++;
      }
    }
    if (value.length){
      setAccuracy((correct/value.length)*100);
    }

    //WPM?(instant wpm)
    const elapsedTime = (mode - timeVal) / 60;
    if (elapsedTime > 0) {
      const wordsTyped = value.length / 5;
      const wpm = (wordsTyped / elapsedTime).toFixed(0);

    setWpm(Number(wpm));
    }

    
  };

  useEffect(() => {
    if (userInput) {
      setTimeRunner(true);
    }
    if (userInput.length === targetText.length) {
      console.log("Word times:", wordTime);
    }
  }, [userInput]);


  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleWordBoxClick = () => {
    textareaRef.current?.focus();
  };

  return (
    <>
      <div className={styles.wordBox} onClick={handleWordBoxClick}>
        <textarea
          value={userInput}
          onChange={handleChange}
          className={styles.textBox}
          autoFocus
          tabIndex={0}
        />
        <div className={styles.timerBox}>
          <Timer
            timeVal={timeVal}
            setTimeVal={setTimeVal}
            timeRunner={timeRunner}
            setIsToggle={setIsToggle}
          />
        </div>
        {(() => {
          const wordList = targetText.split(" ");
          let charIndex = 0;

          return wordList.map((word, wordIdx) => {
            const wordWithSpace = word + " ";
            return (
              <div key={wordIdx} className={styles.word}>
                {[...wordWithSpace].map((letter, i) => {
                  const currentInput = flatInput[charIndex];
                  let letterClass = styles.letter;

                  if (currentInput !== undefined) {
                    if (currentInput === letter) {
                      letterClass += " " + styles.correct;
                    } else {
                      letterClass += " " + styles.incorrect;
                    }
                  }

                  if (charIndex === userInput.length) {
                    letterClass += " " + styles.activeLetter;
                  }

                  const span = (
                    <span
                      key={charIndex}
                      className={`${letterClass} ${
                        letter === " " ? styles.space : ""
                      }`}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  );

                  charIndex++;
                  return span;
                })}
              </div>
            );
          });
        })()}
      </div>
    </>
  );
}
