import React, { useState } from "react";

export default function Amount({ dafaultAmount, amount, setAmount }) {
  function enforceDecimalNumeric(value) {
    const regex = /([0-9]*[\.]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
  }

  const handleInputChange = (e) => {
    let newValue = enforceDecimalNumeric(e.target.value);
    setAmount(newValue.slice(0, 7));
  };
  return (
    <div className="relative drop-shadow-md">
      <div className="absolute text-gray-400 text-sm top-0 -translate-y-1/2 left-7 z-20 bg-transparent p-1 font-ligh">
        Amount
      </div>
      <div className="absolute h-[4px] bg-white top-0 -translate-y-1/2 left-7 w-[60px]"></div>
      <div className="bg-prm-white donate_items_size rounded-full border-[2px] overflow-hidden border-prm-green z-10">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 text-3xl flex flex-row font-light">
          <div className="text-gray-400 pr-2">£</div>
          <input
            type="text"
            placeholder={dafaultAmount}
            value={amount}
            onChange={handleInputChange}
            className="bg-transparent focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
