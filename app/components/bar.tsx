"use client";
import React, { MutableRefObject } from "react";
import Image from "next/image";

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
  mode:number;
};

const Spinner = (
  <div className="w-12 h-12 m-auto border-4 border-t-transparent border-emerald-500 rounded-full animate-spin"></div>
);

export default function Bar({
  changeTime,
  setIsToggle,
  setTimeVal,
  mode,
  setTimeRunner,
  setLoader,
  loader,
  setWordTime,
  setRaw,
  setMode,
  setWpm,
  correctCount,
  totalCount,
  dynoRawTime,
  setChartRaw,
  setChartWpm,
}: Barprop) {
  function handleclick(x: number) {
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
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }

  return (
    <>
      <div className="bg-black flex justify-start gap-4 w-[500px] mt-4 mb-12 rounded-3xl p-2 px-6 shadow-[1px_1px_2px_rgba(0,0,0,1)]">
        <div className="mr-50 ml-2 flex gap-4">
            <button
            onClick={() => {
              handleclick(15);
            }}
            className="barbtn"
          >
            15
          </button>
          <button
            onClick={() => {
              handleclick(30);
            }}
            className="barbtn"
          >
            30
          </button>
          <button
            onClick={() => {
              handleclick(60);
            }}
            className="barbtn"
          >
            60
          </button>
        </div>

        <div>
            <button className="barbtn p-2 filter invert hover:invert-0" onClick={() => {handleclick(mode)}}>
              <Image src="/reload.png" alt="no" width={20} height={20} />
            </button>
        </div>
      </div>

      {loader && <div className="w-full h-full pt-30">{Spinner}</div>}
    </>
  );
}
