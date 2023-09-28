import React, { useState, useEffect } from "react";
import Frequency from "@/components/Donation/Frequency";
import Amount from "@/components/Donation/Amount";
import Pay from "@/components/Donation/Pay";
import { loadStripe } from "@stripe/stripe-js";
// require("dotenv").config(); // process.env variables should be laoded by default by Next.js
import dotenv from "dotenv";

dotenv.config();
const dafaultAmount = "5.0";
const test = true;
const stripe_key = test
  ? process.env.STRIPE_TEST_PUBLISHABLE_KEY
  : process.env.STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripe_key);
const currency = "GBP"; // later we can allow other currencies
console.log(stripe_key);
console.log(stripePromise);

export default function Donate() {
  const [isOneOff, setIsOneOff] = useState(false); // if isOneOff == false, then payment is monthly
  const [amount, setAmount] = useState(dafaultAmount);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      console.log("Order canceled -- continue to shop around and checkout when you’re ready.");
    }
  }, []);

  useEffect(() => {
    console.log("index isOneOff: ", isOneOff);
  }, [isOneOff]);

  return (
    <div className="flex h-screen justify-center items-center text-black">
      <div className="rounded-2xl">
        <p className="w-[500px] text-prm-green/70 text-center font-thin py-4">
          ML reference is hosted on AWS servers, where machine learning models conduct semantic
          search over a database of +50k machine learning papers. Your donation will be put on a
          dedicated account and used to keep the servers running.
        </p>
        <div className="grid grid-cols-2 p-6">
          <div className="m-2 rounded-lg py-2 px-2">
            <Frequency isOneOff={isOneOff} setIsOneOff={setIsOneOff} />
          </div>
          <div className="m-2 rounded-lg py-2 px-2">
            <Amount dafaultAmount={dafaultAmount} amount={amount} setAmount={setAmount} />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="m-2 rounded-lg py-2 px-12">
            <Pay amount={amount} isOneOff={isOneOff} currency={currency} />
          </div>
        </div>
      </div>
    </div>
  );
}
