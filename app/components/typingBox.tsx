"use client";

import React, {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  SetStateAction,
  Dispatch,
} from "react";
import styles from "./mainPage.module.css";
import Timer from "./timer";

type REFS<T> = MutableRefObject<T>;

type dotdotdot<T> = Dispatch<SetStateAction<T>>; //custom aliasing!!

type TypingBoxProp = {
  timeVal: number;
  setTimeRunner: (x: boolean) => void;
  timeRunner: boolean;
  setTimeVal: (x: number) => void;
  setIsToggle: (x: boolean) => void;
  wordTime: Array<number>;
  setRaw: (x: number) => void;
  setAccuracy: (x: number) => void;
  setWpm: (x: number) => void;
  setTargetText:(x:string)=>void;
  getRandomString:(x:number)=>string;
  mode: number;
  dynoRawTime: REFS<number>;
  correctCount: REFS<number>;
  totalCount: REFS<number>;
  setChartWpm: dotdotdot<number[]>;
  setChartRaw: dotdotdot<number[]>;
  targetText:string;
  shuffleCount:number;
  shuffleFirst:REFS<boolean>;
  shufflePrevCount: REFS<number>;
};

export default function TypingBox({
  timeVal,
  setWpm,
  shuffleFirst,
  shufflePrevCount,
  targetText,
  getRandomString,
  setTargetText,
  shuffleCount,
  timeRunner,
  dynoRawTime,
  setTimeRunner,
  correctCount,
  setTimeVal,
  totalCount,
  setIsToggle,
  setChartWpm,
  mode,
  setChartRaw,
  wordTime,
  setAccuracy,
  setRaw,
}: TypingBoxProp) {
  const [userInput, setUserInput] = useState("");
  const wordStartTime = useRef<number | null>(null);
  const previousCount = useRef(0);
  const currentWordIndex = useRef(0);

  const flatInput = [...userInput];
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if (!shuffleFirst.current){
      shuffleFirst.current=true;
      setTargetText(getRandomString(30));
      return;
    }
    if (shufflePrevCount.current!=shuffleCount){
      shufflePrevCount.current=shuffleCount;
      setTargetText(getRandomString(30));
    }
  },[shuffleCount]);

  const targetWords = targetText.split(" ");

  const getCurrentWordStart = () => {
    let index = 0;
    for (let i = 0; i < currentWordIndex.current; i++) {
      index += targetWords[i].length + 1; // +1 for space
    }
    return index;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    const lastChar = value[value.length - 1];
    const prevLength = userInput.length;

    const wordStart = getCurrentWordStart();

    //Prevent backspacing beyond current word
    if (value.length < prevLength && value.length < wordStart) {
      return;
    }

    //Start timing word
    if (
      value.length === 1 ||
      (userInput.endsWith(" ") && value.length > userInput.length)
    ) {
      wordStartTime.current = Date.now();
    }

    // ␣ Space pressed — handle word completion or skipping
    if (
      value.length > prevLength &&
      lastChar === " " &&
      wordStartTime.current
    ) {
      const duration = Date.now() - wordStartTime.current;
      wordTime.push(duration);
      dynoRawTime.current += duration;
      wordStartTime.current = null;

      const typedWord = value.slice(wordStart, value.length - 1); // current word excluding space
      const expectedWord = targetWords[currentWordIndex.current] || "";

      if (typedWord.length < expectedWord.length) {
        const pad = "~".repeat(expectedWord.length - typedWord.length);
        value = value.slice(0, value.length - 1) + pad + " "; // overwrite with incorrect padding
      }

      //Move to next word
      currentWordIndex.current++;
    }

    setUserInput(value);

    //Count stats
    correctCount.current = 0;
    totalCount.current = 0;

    for (let i = 0; i < value.length; i++) {
      if (value[i] !== " ") {
        if (value[i] === targetText[i]) {
          correctCount.current += 1;
        }
        totalCount.current += 1;
      }
    }

    //ACCURACY
    if (value.length) {
      setAccuracy((correctCount.current / totalCount.current) * 100);
    }

    //Wpm
    const elapsed = mode / 60;
    const wordsTyped = correctCount.current / 5;
    setWpm(wordsTyped / elapsed);

    //Raw
    const wordsRawTyped = totalCount.current / 5;
    setRaw(wordsRawTyped / elapsed);
  };

  useEffect(() => {
    if (userInput) setTimeRunner(true);
    if (userInput.length === targetText.length) {
      console.log("Word times:", wordTime);
    }
  }, [userInput]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const activeEl = document.querySelector(
      `.${styles.activeLetter}`
    ) as HTMLElement;
    if (activeEl && cursorRef.current) {
      const rect = activeEl.getBoundingClientRect();
      const parentRect = activeEl.offsetParent?.getBoundingClientRect();
      if (rect && parentRect) {
        const x = rect.left - parentRect.left;
        const y = rect.top - parentRect.top;
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
        cursorRef.current.style.height = `${rect.height}px`;
      }
    }
  }, [userInput]);

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
            previousCount={previousCount}
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
        <div ref={cursorRef} className={styles.customCursor} />
        {(() => {
          let charIndex = 0;

          return targetWords.map((word, wordIdx) => {
            const wordWithSpace = word + " ";
            return (
              <div key={wordIdx} className={styles.word}>
                {[...wordWithSpace].map((letter) => {
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
