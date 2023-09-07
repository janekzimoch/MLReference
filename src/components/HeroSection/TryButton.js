import React from "react";

export default function TryButton() {
  return (
    <div className="transition-all hover:-translate-y-0.5">
      <a
        href="/"
        className="text-prm-green px-14 py-4 rounded-full text-xl tracking-wider font-semibold bg-prm-white border-solid border-[2px] overflow-hidden border-prm-green transition-all hover:opacity-70 hover:border-[1px]"
      >
        Try For Free
      </a>
    </div>
  );
}
