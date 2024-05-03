import React from "react";
import "./properycard.css";
import Icons from "../icons";
import { DM_Serif_Display } from "next/font/google";
import Image from "next/image";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

function PropertyCard({ key, data }) {
  return (
    <div key={key} className="w-full flex justify-center ">
      <div className="card cursor-pointer">
        <a href={`/projects/project-details/${data?._id}`}>
          <div className="overflow-hidden">
            <Image
              src={data?.image}
              alt="image"
              width={0}
              height={0}
              className="min-h-[75%] min-w-[100%] h-[400px] object-cover transform transition-all duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div className="content">
            <div className="flex justify-between items-center mt-2">
              <div className="flex flex-col ">
                <span
                  className="text-2xl"
                  style={{ fontFamily: `${jost.style.fontFamily}` }}
                >
                  {data?.title}
                </span>
                <span className="mt-2"> {data?.Category}</span>
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
