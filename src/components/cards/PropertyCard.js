import React from "react";
import "./properycard.css";
import Icons from "../icons";
import { DM_Serif_Display } from "next/font/google";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

function PropertyCard() {
  return (
    <div className="w-full flex justify-center ">
      <div className="card cursor-pointer">
        <a href="/projects/project-details">
          <div className="img"></div>
          <div className="content">
            <div className="flex justify-between items-center mt-2">
              <div className="flex flex-col ">
                <span
                  className="text-2xl"
                  style={{ fontFamily: `${jost.style.fontFamily}` }}
                >
                  Modern Kitchan
                </span>
                <span className="mt-2"> Decor / Artchitecture</span>
              </div>
              <Icons name={"Next-Arrow"} />
            </div>
          </div>
        </a>{" "}
      </div>
    </div>
  );
}

export default PropertyCard;
