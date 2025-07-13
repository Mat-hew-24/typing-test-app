"use client";
import React, { MutableRefObject } from "react";
import Image from "next/image";
import { useEffect } from "react";

type Barprop = {
  changeTime: (x: number) => void;
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
  setChartWpm: (x: Array<number>) => void;
  setChartRaw: (x: Array<number>) => void;
  setShuffleCount: React.Dispatch<React.SetStateAction<number>>;
  mode: number;
  theme:string;
  setTheme:(x:"light"|"dark")=>void,
  isToggle: boolean;
};

const Spinner = (
  <div className="w-12 h-12 m-auto border-4 border-t-transparent border-emerald-500 rounded-full animate-spin"></div>
);

export default function Bar({
  changeTime,
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
    setTimeVal(x);
    setMode(x);
    setRaw(0);
    setWpm(0);
    setChartRaw([]);
    setChartWpm([]);
    setTimeRunner(false);
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
      <div className="bg-black flex justify-start w-[300px] mt-4 mb-12 rounded-3xl p-2 px-6 md:w-[500px]">
        <div className="mr-60 ml-2 flex gap-1">
          <button
            onClick={() =>
              !isToggle ? handleclick(15, true) : handleclick(15)
            }
            className="barbtn"
          >
            15
          </button>
          <button
            onClick={() =>
              !isToggle ? handleclick(30, true) : handleclick(30)
            }
            className="barbtn"
          >
            30
          </button>
          <button
            onClick={() =>
              !isToggle ? handleclick(60, true) : handleclick(60)
            }
            className="barbtn"
          >
            60
          </button>
        </div>

        <div className="flex gap-1">
          {/*dark mode btn*/}
          <button
            className="barbtn p-1 rounded-4xl filter invert hover:invert-0 active:outline-0"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            <Image src="/dark-mode.png" alt="no" width={20} height={20} />
          </button>

          {/*retry btn*/}
          {!isToggle && (
            <button
              className="barbtn p-2 filter invert hover:invert-0 active:outline-0"
              onClick={() => {
                handleclick(mode);
              }}
            >
              <Image src="/reload.png" alt="no" width={15} height={15} />
            </button>
          )}
        </div>
      </div>

      {loader && <div className="w-full h-full pt-30">{Spinner}</div>}
    </>
  );
}
