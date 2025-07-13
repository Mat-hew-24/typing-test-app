"use client";

import Bar from "./components/bar";
import LineChart from "./components/chart";
import { useState, useEffect, useRef } from "react";
import Loading from "./loading";
import Navbar from "./components/navbar";
import TypingBox from "./components/typingBox";
import Results from "./components/results";
import Statbar from "./components/statbar";
import english_1k from "./components/english_1k.json";

export default function Home() {
  const [time, setTime] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]); //time as data
  const [isValid, setIsValid] = useState(false); //loader process status
  const [hideNav, setHideNav] = useState(true); //nav visibility
  const [isToggle, setIsToggle] = useState(true); //chart->box box->chart
  const [timeVal, setTimeVal] = useState(15); //value of timer
  const [timeRunner, setTimeRunner] = useState(false); //timer running status
  const [loader, setLoader] = useState(false); //loading initiation
  const [wordTime, setWordTime] = useState<number[]>([]); //durations of word completion for one session
  const [raw, setRaw] = useState(0);
  const [accuracy, setAccuracy] = useState(0); //Accuracy calculations
  const [mode, setMode] = useState(15); //Mode of Timer
  const [wpm, setWpm] = useState(0); //WPM calculation
  const [mistake,setMistake] = useState<number[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  //

  //CHART ARRAY STATES
  const [chartRaw, setChartRaw] = useState<number[]>([]);
  const [chartWpm, setChartWpm] = useState<number[]>([]);
  //

  //running
  const dynoRawTime = useRef(0); // I don't know sire(cleanUp Day??)
  const correctCount = useRef(0); // Correct characters typed per session
  const totalCount = useRef(0); // Total characters typed per session
  const incorrectCount=useRef(0); // incorrect count at nth second
  const incorrectCountPrev=useRef(0); //incorrect count at n-1th second 
  //

  //TEXT OPERATIONS AND SHUFFLING
  function getRandomString(len: number) {
    const wordList = english_1k.words;
    return Array.from({ length: len }, () => {
      const i = Math.floor(Math.random() * wordList.length);
      return wordList[i];
    }).join(" ");
  }

  //noop function
  const noop=(item:unknown) => {void item};
  void (noop(1));
  //

  const [targetText,setTargetText]=useState("");
  const [shuffleCount,setShuffleCount]=useState(0);
  //
  
  //Shuffle Guards
  const shuffleFirst=useRef(false);
  const shufflePrevCount=useRef(0);
  //

  //time array
  function changeTime(x: number) {
    const newTime = [];
    for (let i = 1; i < x + 1; i++) {
      newTime.push(i);
    }
    setTime(newTime);
  }
  //

  //First time loading into the site
  useEffect(() => {
    const timeval = setTimeout(() => {
      setIsValid(true);
      setHideNav(false);
    }, 1000);

    return () => {
      clearTimeout(timeval);
    };
  }, []);
  //

  return (
    <>
      <title>TypeMonkey</title>
      {!hideNav && <Navbar />}

      {
        <div className="flex flex-col items-center">
          {isValid && (
            <Bar
              isToggle={isToggle}
              mode={mode}
              loader={loader}
              incorrectCountPrev={incorrectCountPrev}
              theme={theme}
              setTheme={setTheme}
              changeTime={changeTime}
              setTimeVal={setTimeVal}
              setWordTime={setWordTime}
              setIsToggle={setIsToggle}
              setTimeRunner={setTimeRunner}
              setLoader={setLoader}
              setRaw={setRaw}
              setMode={setMode}
              setWpm={setWpm}
              dynoRawTime={dynoRawTime}
              correctCount={correctCount}
              incorrectCount={incorrectCount}
              setMistake={setMistake}
              totalCount={totalCount}
              setChartRaw={setChartRaw}
              setChartWpm={setChartWpm}
              setShuffleCount={setShuffleCount}
            />
          )}

          {!isToggle && !loader && (
            <>
              <div className="flex w-full max-w-[1200px] gap-4 px-4">
                <div className="w-[300px] mt-6">
                  <Results accuracy={accuracy} wpm={wpm} />
                </div>
                <LineChart
                  noop={noop}
                  mistake={mistake}
                  time={time}
                  theme={theme}
                  chartRaw={chartRaw}
                  chartWpm={chartWpm}
                />
              </div>
              <Statbar accuracy={accuracy} raw={raw} mode={mode} />
            </>
          )}
        </div>
      }

      {!isValid && (
        <>
          <Loading />
        </>
      )}

      <div className="flex justify-center">
        {isToggle && isValid && !loader && (
          <TypingBox
            incorrectCount={incorrectCount}
            incorrectCountPrev={incorrectCountPrev}
            timeVal={timeVal}
            setMistake={setMistake}
            shuffleFirst={shuffleFirst}
            shufflePrevCount={shufflePrevCount}
            setTimeRunner={setTimeRunner}
            timeRunner={timeRunner}
            noop={noop}
            setTimeVal={setTimeVal}
            wordTime={wordTime}
            setIsToggle={setIsToggle}
            setRaw={setRaw}
            setAccuracy={setAccuracy}
            setWpm={setWpm}
            targetText={targetText}
            setTargetText={setTargetText}
            getRandomString={getRandomString}
            shuffleCount={shuffleCount}
            mode={mode}
            dynoRawTime={dynoRawTime}
            correctCount={correctCount}
            totalCount={totalCount}
            setChartRaw={setChartRaw}
            setChartWpm={setChartWpm}
          />
        )}
      </div>
    </>
  );
}
