import React from "react";

export default function Blob1() {
  return (
    <svg
      className="drop-shadow-md opacity-80 absolute h-[600px] w-auto -top-60 left-0 -z-50"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="a">
          <path
            fill="currentColor"
            d="M894.5 647.5Q852 795 709 836t-249.5-20Q353 755 193 712.5t-137-204q23-161.5 156.5-218t240-91.5q106.5-35 216 16.5t189 168q79.5 116.5 37 264Z"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <path
          fill="#52ab98"
          d="M894.5 647.5Q852 795 709 836t-249.5-20Q353 755 193 712.5t-137-204q23-161.5 156.5-218t240-91.5q106.5-35 216 16.5t189 168q79.5 116.5 37 264Z"
        />
      </g>
    </svg>
  );
}
