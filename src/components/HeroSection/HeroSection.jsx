import React from "react";
import ConfLogoAnimation from "./ConferenceLogoAnimation";
import TryButton from "./TryButton";

export default function HeroSection() {
  return (
    <div className="">
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <div className="mt-[130px]">
            <h1 className="text-dark-gray text-9xl font-semibold">
              Your ultimate
              <br />
              <span className="text-prm-green">AI </span>
              research
              <br />
              reference
              <span className="text-prm-green font-extrabold">.</span>
            </h1>
          </div>
          <div className="mt-6">
            <h2 className="text-light-gray tracking-wider leading-relaxed text-3xl ">
              Most relevant machine learning research
              <br />
              papers in one place with AI enhanced UI.
            </h2>
          </div>
        </div>
        <div className="col-span-4 -ml-80 -mr-18 mt-24 invisible md:visible">
          <ConfLogoAnimation />
        </div>
      </div>
      <div className="items-center justify-center flex mt-16">
        <TryButton />
      </div>
    </div>
  );
}
