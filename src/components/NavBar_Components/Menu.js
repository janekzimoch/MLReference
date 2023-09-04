import React from "react";
import MenuButton from "./MenuButton";

export default function Menu() {
  return (
    <div className="h-20 justify-between items-center flex flex-row">
      <p className="text-prm-green text-3xl font-normal">ML Reference</p>
      <div className="flex flex-row">
        <MenuButton>Try for Free</MenuButton>
        <MenuButton>How it works</MenuButton>
        <MenuButton>Donate</MenuButton>
      </div>
    </div>
  );
}
