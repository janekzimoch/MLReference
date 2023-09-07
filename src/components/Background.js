import React from "react";
import Image from "next/image";
import elipse_left_side from "../../public/elipse-left-side.svg";

export default function Background({ children }) {
  return (
    <div className="relative bg-prm-white min-h-screen overflow-x-hidden overflow-y-auto w-screen flex justify-center">
      {/* There is some bug here:
    //     1. this grpahic doesn't display
    //     2. when this graphic is removed the navbar isn't sticky anymore... */}
      <div className="w-full">{children}</div>
    </div>

    // </div>
  );
}
