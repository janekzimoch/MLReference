import React from "react";
import Image from "next/image";
import arrow_left from "../../../public/arrow-left-64.png";

export default function BackButton({ href = "/" }) {
  return (
    <div className="absolute top-6 left-10">
      <a
        href={href}
        className="text-prm-green block cursor-pointer rounded-full text-sm tracking-wider font-normal  bg-prm-white border-solid border-[2px] overflow-hidden border-prm-green px-6 py-[6px] drop-shadow-md  transition-all  hover:bg-prm-green/20 items-center"
      >
        <div className="flex flex-row items-center justify-center">
          <div className="px-1">
            <Image src={arrow_left} alt="" width={16} height={16} />
          </div>
          <p>Go back</p>
        </div>
      </a>
    </div>
  );
}
