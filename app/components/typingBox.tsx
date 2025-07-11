"use client";

import React, { useEffect, useState, useRef,MutableRefObject,SetStateAction,Dispatch } from "react";
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

// CUSTOM ALIAS TYPE !!
type dotdotdot<T>=Dispatch<SetStateAction<T>>


type TypingBoxProp = {
  timeVal: number; setTimeRunner: (x: boolean) => void ,timeRunner: boolean;
  setTimeVal: (x: number) => void, setIsToggle: (x: boolean) => void;
  wordTime: Array<number> , setRaw:(x:number)=>void, setAccuracy:(x:number)=>void,
  setWpm:(x:number)=>void,mode:number ,dynoRawTime:React.MutableRefObject<number>,
  correctCount:MutableRefObject<number>,totalCount:MutableRefObject<number>,
  setChartWpm:dotdotdot<number[]>,setChartRaw:dotdotdot<number[]>;
};

export default function TypingBox({
  timeVal,setWpm,
  timeRunner, dynoRawTime,
  setTimeRunner, correctCount,
  setTimeVal, totalCount,
  setIsToggle, setChartWpm,
  mode, setChartRaw,
  wordTime, setAccuracy,
  setRaw
}: TypingBoxProp) {
  const [userInput, setUserInput] = useState("");
  const wordStartTime = useRef<number | null>(null);

  const flatInput = [...userInput];


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
    }

    setUserInput(value);

    correctCount.current=0;
    totalCount.current=0;

    

    //RUNNER CALCULATOR
    for (let i=0;i<value.length;i++){
      if (value[i]!=" "){
        if (value[i]==targetText[i]){
          correctCount.current+=1;
        }
        totalCount.current+=1;
      }
    }

    //ACCURACY
    if (value.length){
      setAccuracy((correctCount.current/totalCount.current)*100);
    }
    //

    //WPM?(static wpm)
    const elapsed = mode/60;
    const wordsTyped = correctCount.current/5; //averaging out
    const wpmVal = (wordsTyped/elapsed);
    setWpm(wpmVal); //setting static wpm by every single change
    //

    //RAW?(static raw value)
    const wordsRawTyped=totalCount.current/5;
    const rawVal= (wordsRawTyped/elapsed);
    setRaw(rawVal);
    //

    
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
            correctCount={correctCount}
            totalCount={totalCount}
            setTimeVal={setTimeVal}
            timeRunner={timeRunner}
            setChartRaw={setChartRaw}
            setChartWpm={setChartWpm}
            mode={mode}
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
