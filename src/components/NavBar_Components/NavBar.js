import React from "react";
import Menu from "./Menu";
import Image from "next/image";
import task_bar_elipse from "../../../public/improved-task-bar-elipse.svg";

export default function NavBar({ children }) {
  return (
    <div className="">
      <div className="sticky top-0 z-[100]">
        <div className="w-full bg-prm-white h-[80px] absolute z-20"></div>
        <Image
          className="z-20 w-full absolute -top-[100px] opacity-100"
          src={task_bar_elipse}
          alt="Your SVG"
        />
        <div className="relative z-30 container mx-auto">
          <Menu />
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
