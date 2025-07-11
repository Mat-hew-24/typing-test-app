import { useEffect } from "react";

type timerprop={timeVal:number,timeRunner:boolean,
  setTimeVal:(x:number)=>void,setIsToggle:(x:boolean)=>void,
  setChartRaw:React.Dispatch<React.SetStateAction<number[]>>,setChartWpm:React.Dispatch<React.SetStateAction<number[]>>
  setTotalCount:(x:number)=>void,setCorrectCount:(x:number)=>void,correctCount:number,
  totalCount:number,mode:number}

export default function Timer({timeVal,timeRunner,setTimeVal,
    setIsToggle,setChartRaw,setChartWpm,setTotalCount,setCorrectCount,
    correctCount,totalCount,mode}:timerprop) {
   
  //TIMER
    useEffect(() => {
    if (timeRunner && timeVal > 0) {
      const timeout = setTimeout(() => {
        setTimeVal(timeVal - 1);
        setChartRaw(val => [...val,(totalCount/5)/((mode-timeVal)/60)]);
        setChartWpm(val => [...val,(correctCount/5)/((mode-timeVal)/60)]);
      }, 1000);
      return () =>clearTimeout(timeout);
    }
  }, [timeRunner,timeVal]);

  //SHOW CHART
  useEffect(()=>{
    if (!timeVal){
      setChartRaw(val => [...val,(totalCount/5)/((mode-timeVal)/60)].slice(1));
      setChartWpm(val => [...val,(correctCount/5)/((mode-timeVal)/60)].slice(1));
      setIsToggle(false);
    }
  },[timeVal]);
    
    
    
    return (
        <div className="text-black">
            {timeVal}
        </div>
    );
}