import React from "react";
import HowItWorks_sub from "./HowItWorks_sub";

export default function HowItWork() {
  return (
    <div className="pt-[250px]">
      <div className="w-full flex items-center justify-center px-8 h-full bg-prm-gray drop-shadow-xl rounded-3xl">
        <div className="w-10/12 flex flex-col items-center justify-center py-20">
          <h1 className="text-left w-full text-prm-green text-5xl pb-16 drop-shadow-lg">
            How it works?
          </h1>
          <div className="flex flex-col w-full items-center items-justify">
            <HowItWorks_sub number={1} />
            <HowItWorks_sub number={2} />
            <HowItWorks_sub number={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
