import React, { useState } from "react";

const selectedText = "text-gray-600 font-normal";
const otherText = "text-gray-400 font-light";

export default function Frequency({ isOneOff, setIsOneOff }) {
  const transition = "transition-all duration-[500ms] ease-in-out";

  const handleClick = () => {
    console.log("freq click!");
    console.log(isOneOff);
    if (isOneOff) {
      setIsOneOff(false);
    } else {
      setIsOneOff(true);
    }
  };
  return (
    <div className="relative drop-shadow-md cursor-pointer" onClick={handleClick}>
      <div
        className={`absolute bg-prm-green bg-opacity-20 donate_items_size w-[55%] border-prm-green rounded-full border-solid border-[2px] flex items-center justify-center ${transition} ${
          isOneOff ? "translate-x-0" : "translate-x-[81.818181818%]"
        }`}
      ></div>
      <div className="bg-prm-white border-prm-green rounded-full donate_items_size border-solid border-[1px] flex items-center justify-center">
        <div className="grid grid-cols-2 h-full w-full">
          <div
            className={`text-lg px-3 ${transition} ${
              isOneOff ? selectedText : otherText
            } flex items-center justify-center`}
          >
            One off
          </div>
          <div
            className={`text-lg px-3 ${transition} ${
              isOneOff ? otherText : selectedText
            } flex items-center justify-center`}
          >
            Monthly
          </div>
        </div>
      </div>
    </div>
  );
}
