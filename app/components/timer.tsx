import { useEffect } from "react";

type timerprop={timeVal:number,timeRunner:boolean,
  setTimeVal:(x:number)=>void,setIsToggle:(x:boolean)=>void,
  setChartRaw:React.Dispatch<React.SetStateAction<number[]>>,setChartWpm:React.Dispatch<React.SetStateAction<number[]>>
  }

export default function Timer({timeVal,timeRunner,setTimeVal,
    setIsToggle,setChartRaw,setChartWpm}:timerprop) {
   
  //TIMER
    useEffect(() => {
    if (timeRunner && timeVal > 0) {
      const timeout = setTimeout(() => {
        setTimeVal(timeVal - 1);
        setChartRaw(val => [...val]);
        setChartWpm(val => [...val]);
      }, 1000);
      return () =>clearTimeout(timeout);
    }
  }, [timeRunner,timeVal]);

  //SHOW CHART
  useEffect(()=>{
    if (!timeVal){
      setChartRaw(val => [...val].slice(1));
      setChartWpm(val => [...val].slice(1));
      setIsToggle(false);
    }
  },[timeVal]);
    
    
    
    return (
        <div className="text-black">
            {timeVal}
        </div>
    );
}