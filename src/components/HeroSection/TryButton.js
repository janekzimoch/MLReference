import React from "react";

export default function TryButton() {
  return (
    <div className="transition-all ">
      <a
        href="/app"
        className="text-prm-green px-14 py-4 rounded-full text-xl tracking-wider font-semibold bg-prm-white border-solid border-[2px] overflow-hidden border-prm-green transition-all  hover:bg-prm-green/20 hover:border-[1px]"
        //  hover:opacity-70 hover:-translate-y-0.5
      >
        Try For Free
      </a>
    </div>
  );
}
