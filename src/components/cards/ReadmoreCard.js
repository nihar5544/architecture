import React from "react";
import { DM_Serif_Display } from "next/font/google";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
function ReadmoreCard() {
  return (
    <div className="flex flex-col items-center justify-center">
      <span style={{ fontFamily: `${jost.style.fontFamily}` }}>
        Project Plan
      </span>
      <span className="my-4 text-center">
        There are many variations of the passages of lorem Ipsum from available,
        majority.
      </span>
      <span className="mt-4">Read More</span>
    </div>
  );
}

export default ReadmoreCard;
