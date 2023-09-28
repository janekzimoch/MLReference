import React from "react";

export default function MenuButton({ children, href }) {
  return (
    <div className="ml-16 ">
      <a href={href}>
        <p className="p-4 transition-all hover:-translate-y-0.5 text-white text-xl font-light hover:drop-shadow-lg ">
          {children}
        </p>
      </a>
    </div>
  );
}
