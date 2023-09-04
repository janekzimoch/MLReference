import React from "react";
import Image from "next/image";
import elipse_left_side from "../../public/elipse-left-side.svg";

export default function Background({ children }) {
  return (
    <div className="bg-prm-white min-h-screen overflow-x-hidden overflow-y-auto w-screen flex justify-center relative">
      <Image
        className="w-full absolute -left-[400px] top-[300px] opacity-70"
        src={elipse_left_side}
        alt="Your SVG"
      />
      <div className="w-full">{children}</div>
    </div>
  );
}
