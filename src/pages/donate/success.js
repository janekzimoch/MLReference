import React from "react";

export default function success() {
  return (
    <div className="flex flex-col h-screen justify-center items-center text-black rounded-2xl bg-prm-white text-center">
      <div>
        <div className="py-5">
          <h1 className="w-full text-prm-green text-5xl py-1 drop-shadow-sm ">
            Donation succesful
          </h1>
        </div>
        <div className="pb-5">
          <p className="text-dark-gray tracking-wider text-xl">
            Your contribution will help us keep <br /> the website online, thank you!
          </p>
        </div>
      </div>
      <div className="pb-5 pt-5">
        <a
          href="/#hero_section"
          className="text-prm-green cursor-pointer rounded-full text-xl tracking-wider font-normal h-[50px] bg-prm-white border-solid border-[2px] overflow-hidden border-prm-green px-10 py-[8px] flex items-center justify-center drop-shadow-md hover:py-[9px] hover:border-[1px]  transition-all  hover:bg-prm-green/20"
        >
          Main page
        </a>{" "}
      </div>
    </div>
  );
}
