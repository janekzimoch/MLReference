import React from "react";

export default function Canceled() {
  return (
    <div className="flex h-screen justify-center items-center text-black">
      <div className="rounded-2xl bg-prm-white">
        <div className="p-5">
          <h1 className="text-left w-full text-red-400 text-5xl py-1 drop-shadow-sm">
            Donation failed
          </h1>
        </div>
        <div className="p-5 pt-0">
          <p className="text-dark-gray tracking-wider text-xl">
            We are sorry, there was something wrong with the payment. Try again?
          </p>
        </div>
        <div className="pb-5 pt-5 w-full flex justify-center items-center">
          <a
            href="/donate"
            className="text-prm-green cursor-pointer rounded-full text-xl tracking-wider font-normal h-[50px] bg-prm-white border-solid border-[2px] overflow-hidden border-prm-green px-10 py-[8px] drop-shadow-md hover:py-[9px] hover:border-[1px]  transition-all  hover:bg-prm-green/20"
          >
            Try again
          </a>
        </div>
      </div>
    </div>
  );
}
