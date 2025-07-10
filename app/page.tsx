"use client";

import Bar from "./components/bar";
import LineChart from "./components/chart";
import { useState, useEffect,useRef } from "react";
import Loading from "./loading";
import Navbar from "./components/navbar";
import TypingBox from "./components/typingBox";
import Results from "./components/results";
import Statbar from "./components/statbar";


export default function Home() {
  const [time, setTime] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]); //time as data 
  const [isValid, setIsValid] = useState(false); //loader process status
  const [hideNav, setHideNav] = useState(true); //nav visibility
  const [isToggle, setIsToggle] = useState(true); //chart->box box->chart
  const [timeVal, setTimeVal] = useState(15); //value of timer
  const [timeRunner, setTimeRunner] = useState(false); //timer running status
  const [loader, setLoader] = useState(false); //loading initiation
  const [wordTime,setWordTime]=useState<number[]>([]); //durations of word completion for one session
  const [raw,setRaw]=useState(0);
  const [accuracy,setAccuracy]=useState(0); //Accuracy calculations
  const [mode,setMode]=useState(15);//Mode of Timer
  const [wpm,setWpm]=useState(0);//WPM calculation

  //running
    const dynoRawTime=useRef(0);//I dont know sire


  //time array
  function changeTime(x: number) {
    const newTime = [];
    for (let i = 0; i < x + 1; i++) {
      newTime.push(i);
    }
    setTime(newTime);
  }

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

  return (
    <>
      {!hideNav && <Navbar />}

      {
        <div className="flex flex-col items-center">
          {isValid && (
            <Bar
              loader={loader}
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
            />
          )}

          {!isToggle && !loader && (
            <>
              <div className="flex w-full max-w-[1200px] gap-4 px-4">
                <div className="w-[300px] mt-6">
                  <Results accuracy={accuracy} wpm={wpm}/>
                </div>
                <LineChart raw={raw} wpm={wpm}
                time={time} />
              </div>
              <Statbar accuracy={accuracy} raw={raw} mode={mode}/>
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
            timeVal={timeVal} setTimeRunner={setTimeRunner}
            timeRunner={timeRunner} setTimeVal={setTimeVal}
            wordTime={wordTime} setIsToggle={setIsToggle}
            setRaw={setRaw} setAccuracy={setAccuracy}
            setWpm={setWpm} mode={mode} dynoRawTime={dynoRawTime}
          />
        )}
      </div>
    </>
  );
}
