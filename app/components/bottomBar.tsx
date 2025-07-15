"use client";
import React, { MutableRefObject } from "react";
import Image from "next/image";
import { useEffect } from "react";
import styles from "./bottomBar.module.css";

type Barprop = {
  changeTime: (x: number) => void;
  incorrectCountPrev: MutableRefObject<number>;
  setIsToggle: (x: boolean) => void;
  setTimeVal: (x: number) => void;
  setTimeRunner: (x: boolean) => void;
  setLoader: (x: boolean) => void;
  loader: boolean;
  setWordTime: (x: Array<number>) => void;
  setRaw: (x: number) => void;
  setMode: (x: number) => void;
  setWpm: (x: number) => void;
  dynoRawTime: React.MutableRefObject<number>;
  correctCount: MutableRefObject<number>;
  totalCount: MutableRefObject<number>;
  incorrectCount: MutableRefObject<number>;
  setMistake: (x: Array<number>) => void;
  setChartWpm: (x: Array<number>) => void;
  setChartRaw: (x: Array<number>) => void;
  setShuffleCount: React.Dispatch<React.SetStateAction<number>>;
  mode: number;
  theme: string;
  setTheme: (x: "light" | "dark") => void;
  isToggle: boolean;
};

const Spinner = <div></div>;

export default function bottomBar({
  changeTime,
  incorrectCountPrev,
  incorrectCount,
  setMistake,
  setIsToggle,
  setShuffleCount,
  setTimeVal,
  mode,
  isToggle,
  setTimeRunner,
  setLoader,
  loader,
  setWordTime,
  setRaw,
  setMode,
  setWpm,
  correctCount,
  theme,
  setTheme,
  totalCount,
  dynoRawTime,
  setChartRaw,
  setChartWpm,
}: Barprop) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function handleclick(x: number, shuffles = false) {
    setLoader(true);
    changeTime(x);
    setIsToggle(true);
    setWordTime([]);
    setMistake([]);
    setTimeVal(x);
    setMode(x);
    setRaw(0);
    setWpm(0);
    setChartRaw([]);
    setChartWpm([]);
    setTimeRunner(false);
    incorrectCount.current = 0;
    incorrectCountPrev.current = 0;
    dynoRawTime.current = 0;
    correctCount.current = 0;
    totalCount.current = 0;

    if (shuffles) {
      setShuffleCount((val) => val + 1); //shuffle if (optionalparam)
    }

    setTimeout(() => {
      setLoader(false);
    }, 500);
  }

  return (
    <>
      <div className={styles.mainBox}>
        <button
          onClick={() => (!isToggle ? handleclick(15, true) : handleclick(15))}
          className=" mr-auto pr-3 pl-3 filter cursor-pointer invert hover:invert-0 active:outline-0 w-[50px] hover:bg-emerald-400 rounded-full transition-transform duration-150 ease-in-out hover:scale-110"
        >
          <Image src="/resetbtn.png" alt="no" width={30} height={30} />
        </button>
        {!isToggle && (
          <button
            className=" pr-3 pl-3 filter cursor-pointer invert hover:invert-0 active:outline-0 w-[50px] hover:bg-emerald-400 rounded-full transition-transform duration-150 ease-in-out hover:scale-110"
            onClick={() => {
              handleclick(mode);
            }}
          >
            <Image src="/reload.png" alt="no" width={30} height={30} />
          </button>
        )}
      </div>

      {loader && <div className="w-full h-full pt-30">{Spinner}</div>}
    </>
  );
}
