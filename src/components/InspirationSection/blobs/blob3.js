import React from "react";
import Image from "next/image";
import blob3 from "../../../../public/blob-3.svg";

export default function Blob3() {
  return (
    <Image
      className="absolute opacity-70  h-auto w-full -top-28 -right-8  -z-50 drop-shadow-xl"
      src={blob3}
      alt="Your SVG"
    />
  );
}
