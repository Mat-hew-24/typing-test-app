'use client'

import Bar from "./components/bar";
import LineChart from "./components/chart"
import { useState,useEffect } from "react";
import Loading from "./loading";
import Navbar from "./components/navbar";
import TypingBox from "./components/typingBox";


export default function Home() {
  const [time,setTime] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  const [isValid,setIsValid]= useState(false);
  const [hideNav,setHideNav]=useState(true);
  const [isToggle,setIsToggle]=useState(true);
  
  //for dev purpose

  const togglebtn= <button onClick={HandleToggle} className="hover:cursor-pointer text-white bg-black rounded-3xl p-2 text-sm">Toggle</button>
  
  function HandleToggle(){
    setIsToggle(!isToggle);
  }

  function changeTime(x:number){
    const newTime=[];
    for (let i=0;i<x+1;i++){
      newTime.push(i);
    }
    setTime(newTime);
  }

  useEffect(()=>{
    const timeval = setTimeout(()=>{
      setIsValid(true);
      setHideNav(false);
    },1000);

    return () => { clearTimeout(timeval)}
  },[])

  return (
    <>
    {!hideNav &&
     <Navbar/>
    }
    {isValid &&
    <div className="flex flex-col items-center">
      <Bar setIsValid={setIsValid} changeTime={changeTime}/>
      {togglebtn}
      {!isToggle && <LineChart time={time}/>}
    </div>
    }
    
    {!isValid && <Loading/>}
    {isToggle && <TypingBox />}
    </> 
  )

  

}
    
  
  
    
