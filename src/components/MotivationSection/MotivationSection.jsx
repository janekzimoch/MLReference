import React from "react";
import TrendPlot from "./TrendPlot";

export default function MotivationSection() {
  return (
    <div className="pb-[200px] pt-[150px]">
      <div className="flex w-full justify-center items-center px-8 h-full bg-prm-gray drop-shadow-md rounded-3xl">
        <div className="w-10/12 flex flex-col items-center justify-center py-20">
          <h1 className="text-left w-full text-prm-green text-5xl py-1 drop-shadow-sm">
            Over the past few years
          </h1>
          <h2 className="text-left w-full text-dark-gray tracking-wider text-xl mt-2 mb-8 drop-shadow-sm">
            Number of Machine Learning papers have been increasing
          </h2>
          <TrendPlot />
        </div>
      </div>
    </div>
  );
}
