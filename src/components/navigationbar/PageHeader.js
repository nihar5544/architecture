import React from 'react'

import { DM_Serif_Display } from "next/font/google";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

function PageHeader({name}) {
  return (
    <div className="w-full h-[350px] relative bg-[url('/images/Sevices-header.webp')]">
        <div className="absolute bottom-0  w-full flex justify-center items-center ">
          <div className="p-4 px-20 flex flex-col bg-white rounded-t-3xl">
            {" "}
            <span
              className="text-5xl mb-2 "
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            >
              {name}
            </span>
            <span className="mb-2">Home / {name}</span>
          </div>
        </div>
      </div>
  )
}

export default PageHeader
