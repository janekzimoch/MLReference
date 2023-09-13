import React, { useState } from "react";
import Frequency from "@/components/Donation/Frequency";
import Amount from "@/components/Donation/Amount";
import Pay from "@/components/Donation/Pay";

const dafaultAmount = "5.0";

export default function Donate() {
  const [isOneOff, setIsOneOff] = useState(false); // if isOneOff == false, then payment is monthly
  const [amount, setAmount] = useState(dafaultAmount);
  const currency = "GBP"; // later we can allow other currencies

  return (
    <div className="flex h-screen justify-center items-center text-black">
      <div className="rounded-2xl">
        <div className="grid grid-cols-2 p-6">
          <div className="m-2 rounded-lg py-2 px-2">
            <Frequency isOneOff={isOneOff} setIsOneOff={setIsOneOff} />
          </div>
          <div className="m-2 rounded-lg py-2 px-2">
            <Amount dafaultAmount={dafaultAmount} amount={amount} setAmount={setAmount} />
          </div>
        </div>
        <div className="flex p-4 justify-center items-center">
          <div className="m-2 rounded-lg py-2 px-12">
            <Pay amount={amount} isOneOff={isOneOff} />
          </div>
        </div>
      </div>
    </div>
  );
}
