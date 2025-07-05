'use client'

import Bar from "./components/bar";
import LineChart from "./components/chart"
import { useState,useEffect } from "react";
import Loading from "./loading";
import Navbar from "./components/navbar";


export default function Home() {
  const [time,setTime] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  const [isValid,setIsValid]= useState(false);
  const [hideNav,setHideNav]=useState(true);
  
  

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
      <LineChart time={time}/>
    </div>
    }
    
    {!isValid && <Loading/>}
    </> 
  )

  

}
    
  
  
    
