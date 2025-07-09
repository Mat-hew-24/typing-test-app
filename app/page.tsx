"use client";

import Bar from "./components/bar";
import LineChart from "./components/chart";
import { useState, useEffect } from "react";
import Loading from "./loading";
import Navbar from "./components/navbar";
import TypingBox from "./components/typingBox";

export default function Home() {
  const [time,setTime] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]); //data part
  const [isValid,setIsValid]= useState(false); //loader process status
  const [hideNav,setHideNav]=useState(true); //nav visibility
  const [isToggle,setIsToggle]=useState(true); //chart->box box->chart
  const [timeVal,setTimeVal]=useState(15); //value of timer
  const [timeRunner,setTimeRunner]=useState(false); //timer running status
  const [loader,setLoader]=useState(false); //loading initiation

  function changeTime(x: number) {
    const newTime = [];
    for (let i = 0; i < x + 1; i++) {
      newTime.push(i);
    }
    setTime(newTime);
  }

  //First time loading into the site
  useEffect(()=>{
    const timeval = setTimeout(()=>{
      setIsValid(true);
      setHideNav(false);
    }, 1000);

    return () => {
      clearTimeout(timeval);
    };
  }, []);

  return (
    <>
    {!hideNav && <Navbar/>}
  
    {
    <div className="flex flex-col items-center">

      {isValid && <Bar loader={loader} changeTime={changeTime}
       setTimeVal={setTimeVal} setIsToggle={setIsToggle}
        setTimeRunner={setTimeRunner} setLoader={setLoader} />}

      {!isToggle && !loader&& <LineChart time={time}/>}

    </div>
    }
    
    {!isValid && <>
    <Loading/>
    </>}

      <div className="flex justify-center">

        {isToggle && isValid && !loader && <TypingBox 
        timeVal={timeVal} setTimeRunner={setTimeRunner} 
        timeRunner={timeRunner} setTimeVal={setTimeVal} 
        setIsToggle={setIsToggle}
        />}

      </div>
    </> 
  )
}
