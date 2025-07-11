import {
  useEffect,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useState,
  useRef,
} from "react";

type timerprop = {
  timeVal: number;
  timeRunner: boolean;
  setTimeVal: (x: number) => void;
  setIsToggle: (x: boolean) => void;
  setChartRaw: Dispatch<SetStateAction<number[]>>;
  setChartWpm: Dispatch<SetStateAction<number[]>>;
  correctCount: MutableRefObject<number>;
  totalCount: MutableRefObject<number>;
  mode: number;
};

export default function Timer({
  timeVal,
  timeRunner,
  setTimeVal,
  setIsToggle,
  setChartRaw,
  setChartWpm,
  correctCount,
  mode,
  totalCount,
}: timerprop) {
  const [smallTimer, setSmallTimer] = useState(0);
  const starter = useRef<number | null>(null);
  const tickingCounter = useRef(0);

  //TIMER
  useEffect(() => {
    if (!timeRunner) return;

    if (!starter.current) starter.current = performance.now();

    const interval = setInterval(() => {
      tickingCounter.current += 1;
      if (tickingCounter.current <= 1) return;
      const elapsed = (performance.now() - (starter.current ?? 0)) / 1000;

      const raw = totalCount.current / 5 / (elapsed / 60);
      const wpm = correctCount.current / 5 / (elapsed / 60);

      setChartRaw((val) => [...val, raw]);
      setChartWpm((val) => [...val, wpm]);

      setSmallTimer((t) => t + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [timeRunner]);

  useEffect(() => {
    if (timeRunner && timeVal > 0) {
      const timeout = setTimeout(() => {
        const timing = timeVal - 1;
        setTimeVal(timing);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [timeRunner, timeVal]);

  //SHOW CHART AND ADD LAST POINT
  useEffect(() => {
    if (timeVal === 0) {
      const raw = totalCount.current / 5 / (mode / 60);
      const wpm = correctCount.current / 5 / (mode / 60);

      setChartRaw((val) => [...val, raw]);
      setChartWpm((val) => [...val, wpm]);

      setIsToggle(false);
    }
  }, [timeVal]);

  return <div className="text-black">{timeVal}</div>;
}
