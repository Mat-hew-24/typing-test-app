import { useEffect } from "react";

type timerprop={timeVal:number,timeRunner:boolean,setTimeVal:(x:number)=>void}

export default function Timer({timeVal,timeRunner,setTimeVal}:timerprop) {
    
    useEffect(() => {
    if (timeRunner && timeVal > 0) {
      const timeout = setTimeout(() => {
        setTimeVal(timeVal - 1);
      }, 1000);

      return () =>clearTimeout(timeout); // Clean up on unmount or re-run
    }
  }, [timeRunner,timeVal]);
    
    
    return (
        <>
            {timeVal}
        </>
    );
}