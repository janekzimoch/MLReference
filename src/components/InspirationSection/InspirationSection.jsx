import React from "react";
import Blob1 from "./blobs/blob1";
import Blob2 from "./blobs/blob2";
import Blob3 from "./blobs/blob3";

export default function InspirationSection() {
  return (
    <div className="pb-[200px] pt-[150px]">
      <div className="grid grid-cols-12 grid-rows-12 px-8 w-full h-full drop-shadow-2xl rounded-3xl">
        <div className="relative col-span-6 col-start-1 row-start-0 row-span-3 rounded-2xl p-10 m-5">
          <h1 className="z-40 text-center font-light w-full text-light-gray text-5xl py-1 drop-shadow-sm">
            How do you keep up?
          </h1>
          <Blob1 />
        </div>
        <div className="relative col-span-8 font-light col-start-7 row-start-3 row-span-4 m-5  mb-30 p-10">
          <h1 className="text-center w-full text-dark-gray text-5xl py-1 drop-shadow-sm">
            you don't
            <br />
            you don't need to!
          </h1>
          <Blob2 />
        </div>
        <div className="relative col-span-12 col-start-1 row-start-8 row-span-2 m-5 mt-20 p-10">
          <h1 className="text-center w-full font-light text-light-gray text-5xl py-1 drop-shadow-sm">
            Start using
            <span className="text-prm-green font-normal tracking-wide"> ML Reference </span>
            to navigate
            <br />
            scientific knowledge, today.
          </h1>
          <Blob3 />
        </div>
      </div>
    </div>
  );
}
