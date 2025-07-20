import {
  useEffect,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useState,
  useRef,
} from "react";

type refNum=MutableRefObject<number>

type timerprop = {
  timeVal: number;
  noop:(x:unknown)=>void,
  timeRunner: boolean;
  chartRaw: Array<number>;
  setTimeVal: (x: number) => void;
  setIsToggle: (x: boolean) => void;
  setChartRaw: Dispatch<SetStateAction<number[]>>;
  setChartWpm: Dispatch<SetStateAction<number[]>>;
  correctCount: refNum;
  totalCount: refNum;
  mode: number;
  incorrectCountPrev:refNum;
  previousCount: refNum;
  incorrectCount: refNum;
  setConsistency: (x:number)=>void;
  setMistake:Dispatch<SetStateAction<number[]>>;
};

export default function Timer({
  timeVal,
  timeRunner,
  setTimeVal,
  setIsToggle,
  setConsistency,
  chartRaw,
  incorrectCount,
  noop,
  incorrectCountPrev,
  setMistake,
  setChartRaw,
  setChartWpm,
  correctCount,
  mode,
  totalCount,
  previousCount,
}: timerprop) {
  const [smallTimer, setSmallTimer] = useState(0);
  const starter = useRef<number | null>(null);
  const tickingCounter = useRef(0);
  const KalmanBuffer = useRef<number[]>([]);
  const smoothRaw=useRef(0);
  const rawFrame=useRef(0);
  const KalmanRaw = useRef({
    estimate: null as null | number,
    error: 1,
    noise: 0.01,
    processNoise:1
  }) //Kalman Ref

  noop(smallTimer); //avoiding for now

  //1D Kalman Filter
  //KALMAN FILTER is a method to filer out and smoothen statistical data
  function KalmanFilter(val:number){ 
    const x=KalmanRaw.current;
    if (x.estimate===null || x.estimate===0){
      x.estimate=val
      return x.estimate;
    }
    const gained = x.error/(x.error+x.processNoise);
    x.estimate+=(gained*(val-x.estimate));
    x.error=(1-gained)*x.error+Math.abs(val-x.estimate)*x.noise;
    return x.estimate;
  }
  //

  //Measuring Consistency

  //STANDARD DEVIATION
  function SD(val:Array<number>){
    const mean = val.reduce((a,b)=>a+b,0)/val.length; //mean
    const variance = val.reduce((a,b)=> a + Math.pow(b-mean,2),0)/val.length; //variance
    return Math.sqrt(variance);  
  }

  //MEAN
  const Mean = (val:Array<number>) => val.reduce((a,b)=>a+b,0)/val.length;
 

  // SMALL TIMER (FOR GRAPH)
  useEffect(() => {
    if (!timeRunner) return; //BASE CASE

    if (!starter.current) starter.current = performance.now(); //setting up small timer
    //perfomance.now() => is a browser provided timer more accurate than Date.now()

    //Measuring Data every 1000ms(changeable) //thas why "smallTimer"
    const interval = setInterval(() => {
      tickingCounter.current += 1;
      const typedlength = totalCount.current - previousCount.current;
      previousCount.current = totalCount.current;

      if (tickingCounter.current <= 1) return;

      let ClampedKalman=0;

      if (typedlength > 0){
        rawFrame.current= typedlength > 0 ? typedlength / 5 / (1 / 60) : 0;
        smoothRaw.current= KalmanFilter(rawFrame.current);

        //Buffer handling
        KalmanBuffer.current.unshift(smoothRaw.current);
        if (KalmanBuffer.current.length > 5) {
          //seek
          KalmanBuffer.current.pop();
        }
        //
        
      }else{
        rawFrame.current = 0;
        const decayed = KalmanFilter(0);
        KalmanBuffer.current.unshift(decayed);
        if (KalmanBuffer.current.length > 5) {
          KalmanBuffer.current.pop();
        }
      }

      const averageKalman = (
          KalmanBuffer.current.reduce((acc,val)=> acc+val,0)
          /
          KalmanBuffer.current.length
        );

      ClampedKalman = Math.min(Math.max(averageKalman,0),300);
      const elapsed = (performance.now() - (starter.current ?? 0)) / 1000;

      const wpm = correctCount.current / 5 / (elapsed / 60);
      
      setChartWpm((val) => [...val, Math.round(wpm)]);
      setChartRaw((val) => [...val, Math.round(ClampedKalman)]);
      
      setSmallTimer((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRunner]);

  //Timer inside the wordbox
  useEffect(() => {
    if (timeRunner && timeVal > 0) {
      const timeout = setTimeout(() => {
        const timing = timeVal - 1;
        setTimeVal(timing);
        const mistakeDelta=Math.max(0,incorrectCount.current-incorrectCountPrev.current)
        setMistake(val=>[...val,mistakeDelta]);
        incorrectCountPrev.current=incorrectCount.current;
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [timeRunner, timeVal]);

  //SHOW CHART AND ADD LAST POINT is inserted into the graph data
  useEffect(() => {
    if (timeVal === 0) {
      const wpm = (correctCount.current/5)/(mode/60);

      const consistencyValue=100-(SD(chartRaw)/Mean(chartRaw))*100;
      setConsistency(consistencyValue);


      smoothRaw.current=KalmanFilter(rawFrame.current);

      KalmanBuffer.current.unshift(smoothRaw.current);
      if (KalmanBuffer.current.length > 5) {
        //seek
        KalmanBuffer.current.pop();
      }

      const averageKalman = (
        KalmanBuffer.current.reduce((acc,val)=> acc+val,0)
        /
        KalmanBuffer.current.length
      );

      const ClampedKalman = Math.min(Math.max(averageKalman,0),300);


      setChartRaw((val) => [...val, Math.round(ClampedKalman)]);
      setChartWpm((val) => [...val, Math.round(wpm)]);
      setMistake(val=>[...val,incorrectCount.current-incorrectCountPrev.current]);
      incorrectCountPrev.current=incorrectCount.current;

      setIsToggle(false);
    }
  }, [timeVal]);

  return <div className="text-[var(--timer-color)]">{timeVal}</div>;
}
