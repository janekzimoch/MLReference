import React from "react";
import ConfLogo from "./ConferenceLogo";

export default function ConferencLogosStack({ logo1, logo2, logo3, delay_max = 10 }) {
  const delay = Math.floor(Math.random() * delay_max * 1000);
  const delay1 = `${delay + 1}ms`;
  const delay2 = `${delay + 20001}ms`;
  const delay3 = `${delay + 40001}ms`;
  const animation_delay_1 = {
    animationDelay: delay1,
  };
  const animation_delay_2 = {
    animationDelay: delay2,
  };
  const animation_delay_3 = {
    animationDelay: delay3,
  };
  return (
    <div>
      <div className="opacity-50 py-12 h-[100px]">
        <div className="opacity-0 animate-disapearing-logos" style={animation_delay_1}>
          <ConfLogo>{logo1}</ConfLogo>
        </div>
        <div className="opacity-0 animate-disapearing-logos" style={animation_delay_2}>
          <ConfLogo>{logo2}</ConfLogo>
        </div>
        <div className="opacity-0 animate-disapearing-logos" style={animation_delay_3}>
          <ConfLogo>{logo3}</ConfLogo>
        </div>
      </div>
    </div>
  );
}
