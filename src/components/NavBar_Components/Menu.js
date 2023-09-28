import React from "react";
import MenuButton from "./MenuButton";

export default function Menu() {
  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-20 justify-between items-center flex flex-row">
      <a href="/#hero_section">
        <p className="text-prm-green text-3xl font-normal">ML Reference</p>
      </a>
      <div className="flex flex-row">
        <MenuButton href="/app">Try for Free</MenuButton>
        <MenuButton href="/#how_it_works" onClick={() => scrollToSection("#how_it_works")}>
          How it works
        </MenuButton>
        <MenuButton href="/#donate">Donate</MenuButton>
      </div>
    </div>
  );
}
