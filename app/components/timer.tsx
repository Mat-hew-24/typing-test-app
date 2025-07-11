import { useEffect,MutableRefObject,Dispatch,SetStateAction,
  useState,useRef
 } from "react";

type timerprop={timeVal:number,timeRunner:boolean,
  setTimeVal:(x:number)=>void,setIsToggle:(x:boolean)=>void
  setChartRaw:Dispatch<SetStateAction<number[]>>;setChartWpm:Dispatch<SetStateAction<number[]>>;
  correctCount:MutableRefObject<number>;totalCount:MutableRefObject<number>;mode:number;
  previousCount:MutableRefObject<number>;
}

export default function Timer({timeVal,timeRunner,setTimeVal,
  setIsToggle,setChartRaw,setChartWpm,correctCount,mode,totalCount,previousCount}:timerprop) {
   
    const [smallTimer,setSmallTimer] = useState(0);
    const starter = useRef<number|null>(null);
    const tickingCounter =useRef(0);

    console.log(smallTimer);

  // SMALL TIMER (FOR GRAPH)
    useEffect(() => {

    if (!timeRunner) return; //BASE CASE

    if (!starter.current) starter.current=performance.now();//setting up small timer
    //perfomance.now() => is a browser provided timer more accurate than Date.now()

    //Measuring Data every 250ms(changeable)
    const interval = setInterval(() => {
      tickingCounter.current+=1;
      const typedlength=totalCount.current-previousCount.current;
      previousCount.current=totalCount.current;
      if (tickingCounter.current<=1) return;

      const elapsed = (performance.now() - (starter.current?? 0))/1000;

      const rawFrame=typedlength*(12);
      const wpm = (correctCount.current / 5) / (elapsed / 60);

      setChartRaw(val => [...val,rawFrame]);

      setChartWpm(val => [...val, wpm]);

      setSmallTimer(t => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRunner]);

  //Timer inside the wordbox
  useEffect(() => {
  if (timeRunner && timeVal > 0) {
    const timeout = setTimeout(() => {
      const timing=timeVal-1;
      setTimeVal(timing);
    }, 1000);

    return () => clearTimeout(timeout);
  }
}, [timeRunner, timeVal]);

  //SHOW CHART AND ADD LAST POINT is inserted into the graph data
  useEffect(()=>{
    if (timeVal===0){
      const raw=(totalCount.current/5)/((mode)/60);
      const wpm=(correctCount.current/5)/((mode)/60);
      
      setChartRaw(val => [...val,raw]);
      setChartWpm(val => [...val,wpm]);
      
      setIsToggle(false);
    }
  },[timeVal]);
    
    
    
    return (
        <div className="text-black">
            {timeVal}
        </div>
    );
}