import React from "react";

export default function HowItWorks_sub({ number, graphic }) {
  return (
    <div className="relative flex justify-center items-center drop-shadow-md rounded-2xl bg-prm-white w-full m-8">
      <div className="absolute flex items-center justify-center -top-7 left-8 rounded-full bg-prm-green drop-shadow-md w-16 h-16 text-xl">
        <span className="drop-shadow-2xl">{number}</span>
      </div>
      <div className="rounded-lg bg-prm-blue/10 w-10/12 h-[300px] m-4 my-12"></div>
    </div>
  );
}
