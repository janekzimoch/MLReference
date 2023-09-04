import React from "react";
import Image from "next/image";

export default function ConfLogo({ children }) {
  return <Image className="h-[80px] grayscale opacity-60" src={children} alt="Your SVG" />;
}
