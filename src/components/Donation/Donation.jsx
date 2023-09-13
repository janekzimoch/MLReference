import React from "react";
import Image from "next/image";
import placeholder from "../../../public/placeholder-donations.svg";

export default function Donation() {
  return (
    <section id="donate">
      <div className="pb-[200px] pt-[150px]">
        <div className="w-full flex flex-col items-center justify-center px-8 h-full bg-prm-green/50 drop-shadow-md rounded-3xl">
          <div className="w-full grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Image className="h-full w-full" src={placeholder} alt="Your SVG" />
            </div>
            <div className="col-span-2 pr-20 py-16 w-full flex flex-col items-center justify-center">
              <h1 className="text-left w-full text-prm-green text-5xl drop-shadow-lgmb-2">
                An Open Source Project
              </h1>
              <h2 className="text-left w-full text-dark-gray tracking-wider text-2xl mt-4 drop-shadow-sm">
                Join us
              </h2>
              <p className="text-2xl font-thin">
                ML Reference is an open source project run by machine learning enthusiasts. If you
                would like to work on this project email us at:
                <span className="text-prm-blue/50"> contact@mlreference.org </span>
              </p>
              <h2 className="text-left w-full text-dark-gray tracking-wider text-2xl mt-4 drop-shadow-sm">
                Donate
              </h2>
              <p className="text-2xl font-thin">
                Storing and serving embedding vectors for 50k pdf documents cost ~100$ a month. If
                you find the project useful, consider donating.
              </p>
              <div className="flex items-center justify-start w-full pt-10">
                <div className="flex w-1/2 justify-center">
                  <a
                    href="/donate"
                    className="text-prm-green px-10 py-3 rounded-full text-xl tracking-wider font-semibold bg-prm-white border-solid border-[2px] border-prm-green transition-all hover:bg-prm-gray drop-shadow-md"
                  >
                    Donate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
