import React from "react";
import Image from "next/image";
import elipse_left_side from "../../public/elipse-left-side.svg";
import elipse_bottom from "../../public/elipse-5.svg";

export default function Background({ children }) {
  return (
    <div className="relative bg-prm-white min-h-screen overflow-x-hidden overflow-y-auto w-screen flex justify-center">
      <Image
        className="z-10 w-full absolute bottom-0 opacity-100"
        src={elipse_bottom}
        alt="Your SVG"
      />
      <div className="z-20 w-full">{children}</div>
    </div>
  );
}
