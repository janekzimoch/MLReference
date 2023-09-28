import React from "react";

export default function Filter({ label, label_width }) {
  return (
    <div className="relative drop-shadow-sm">
      <div
        className={`absolute h-[4px] bg-white top-0 -translate-y-1/2 left-6 w-[${label_width}]`}
      ></div>
      <div className="absolute text-gray-400 text-xl top-0 -translate-y-1/2 left-7 z-20 bg-transparent p-1 font-ligh">
        {label}
      </div>
      <div className="bg-prm-white h-full w-full min-h-[100px] rounded-[20px] border-[2px] overflow-hidden border-prm-green z-10">
        <div className="absolute left-6 top-6 w-full text-gray-400 text-md flex flex-row font-light">
          <input
            type="text"
            placeholder=""
            // value={amount}
            // onChange={handleInputChange}
            className="bg-transparent w-full focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
