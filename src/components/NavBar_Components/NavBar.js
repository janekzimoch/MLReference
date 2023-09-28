import React from "react";
import Menu from "./Menu";
import Image from "next/image";
import task_bar_elipse from "../../../public/improved-task-bar-elipse.svg";

export default function NavBar({ children }) {
  return (
    <div>
      <div className="fixed left-0 right-0 top-0 z-[100]">
        <div className="w-full bg-prm-white blur-md h-[120px] -top-[40px] absolute z-30"></div>
        <Image
          className="z-30 absolute -top-[40px] w-full opacity-100"
          src={task_bar_elipse}
          alt="Your SVG"
        />
        <div className="relative z-30 container mx-auto">
          <Menu />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
