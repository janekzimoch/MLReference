import React from "react";
import Image from "next/image";
import blob2 from "../../../../public/blob-2.svg";

export default function Blob2() {
  return (
    <Image
      className="opacity-80 absolute w-full h-auto -top-44 left-4 -z-50 drop-shadow-md"
      src={blob2}
      alt="Your SVG"
    />
  );
}
