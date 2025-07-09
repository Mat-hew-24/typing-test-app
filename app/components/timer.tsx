import { useEffect } from "react";

type timerprop={timeVal:number,timeRunner:boolean,setTimeVal:(x:number)=>void,setIsToggle:(x:boolean)=>void}

export default function Timer({timeVal,timeRunner,setTimeVal,setIsToggle}:timerprop) {
    
    useEffect(() => {
    if (timeRunner && timeVal > 0) {
      const timeout = setTimeout(() => {
        setTimeVal(timeVal - 1);
      }, 1000);
      return () =>clearTimeout(timeout);
    }
  }, [timeRunner,timeVal]);

  useEffect(()=>{
    if (!timeVal){
      setIsToggle(false);
    }
  },[timeVal]);
    
    
    
    return (
        <div className="text-black">
            {timeVal}
        </div>
    );
}