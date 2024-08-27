'use client';
import React, { useState } from "react";
import { DM_Serif_Display } from "next/font/google";

const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

function ReadmoreCard({ title, contant }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center justify-top">
      <span style={{ fontFamily: `${jost.style.fontFamily}` }}>
        {title}
      </span>
      <span className="my-4 text-center">
        {isExpanded ? contant : `${contant.slice(0, 80)}...`}
      </span>
      <span
        className="mt-4 cursor-pointer"
        onClick={toggleReadMore}
      >
        {isExpanded ? "Show Less" : "Read More"}
      </span>
    </div>
  );
}

export default ReadmoreCard;
