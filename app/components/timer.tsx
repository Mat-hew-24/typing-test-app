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
  timeRunner: boolean;
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
  setMistake:Dispatch<SetStateAction<number[]>>;
};

export default function Timer({
  timeVal,
  timeRunner,
  setTimeVal,
  setIsToggle,
  incorrectCount,
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
  const buffer = useRef<number[]>([]);

  console.log(smallTimer);

  // SMALL TIMER (FOR GRAPH)
  useEffect(() => {
    if (!timeRunner) return; //BASE CASE

    if (!starter.current) starter.current = performance.now(); //setting up small timer
    //perfomance.now() => is a browser provided timer more accurate than Date.now()

    //Measuring Data every 1000ms(changeable)
    const interval = setInterval(() => {
      tickingCounter.current += 1;
      const typedlength = totalCount.current - previousCount.current;
      previousCount.current = totalCount.current;
      const rawFrame = typedlength > 0 ? typedlength / 5 / (1 / 60) : 0;
      if (tickingCounter.current <= 1) return;

      //ROLLING AVERAGE
      //Buffer handling
      buffer.current.unshift(rawFrame);
      if (buffer.current.length > 5) {
        //seek
        buffer.current.pop();
      }

      //calculation
      const bufferLength = buffer.current.length; //length of buffer
      const bufferSum = buffer.current.reduce((a, b) => a + b, 0); //sum of elements in buffer
      //arr.reduce((accumulator,currentVal,currentIndex,array));

      //Rolling average
      const rollingAverage = (bufferSum / bufferLength).toFixed(0);

      const elapsed = (performance.now() - (starter.current ?? 0)) / 1000;

      const wpm = correctCount.current / 5 / (elapsed / 60);

      setChartWpm((val) => [...val, Math.round(wpm)]);
      setChartRaw((val) => [...val, Math.round((Number(rollingAverage)))]);
      
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
      const raw = totalCount.current / 5 / (mode / 60);
      const wpm = correctCount.current / 5 / (mode / 60);

      setChartRaw((val) => [...val, Math.round(raw)]);
      setChartWpm((val) => [...val, Math.round(wpm)]);
      setMistake(val=>[...val,incorrectCount.current-incorrectCountPrev.current]);
      incorrectCountPrev.current=incorrectCount.current;

      setIsToggle(false);
    }
  }, [timeVal]);

  return <div className="text-[var(--timer-color)]">{timeVal}</div>;
}
