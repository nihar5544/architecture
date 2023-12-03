import React from "react";
import { DM_Serif_Display } from "next/font/google";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
function ReadmoreCard({title, contant}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <span style={{ fontFamily: `${jost.style.fontFamily}` }}>
       {title}
      </span>
      <span className="my-4 text-center">
      {contant}
      </span>
      <span className="mt-4">Read More</span>
    </div>
  );
}

export default ReadmoreCard;
