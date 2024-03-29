import React from "react";
import Image from "next/image";
import trend_plot from "../../../public/trend-plot-sketch.svg";

export default function TrendPlot() {
  return (
    <div>
      <div className="h-full w-auto">
        <Image className="rounded-2xl" src={trend_plot} alt="Your SVG" />
      </div>
    </div>
  );
}
