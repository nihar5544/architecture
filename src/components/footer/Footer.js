import React from "react";
import { DM_Serif_Display } from "next/font/google";
import Image from "next/image";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
function Footer() {
  return (
    <footer className="border-b-2 flex justify-center container-padding-x xl:py-[60px] lg:py-[60px] py-[60px] mt-[0px] z-[2] relative">
      <div className="flex lg:flex-row flex-col justify-between  w-[70%]">
        <div>
          {" "}
          <Image
            // eslint-disable-next-line no-undef
            src={`/images/Logo.png`}
            width={150}
            height={60}
            alt="coindelta-logo"
            className="py-[10px]"
          />
        </div>
        <div className="flex flex-col justify-between">
          {" "}
          <span
            className="text-2xl"
            style={{ fontFamily: `${jost.style.fontFamily}` }}
          >
            Pages
          </span>
          <span className="my-4">Home</span>
          <span className="my-4">Services</span>
          <span className="my-4">Project</span>
          <span className="my-4">Contact</span>
        </div>
        <div className="flex flex-col ">
          {" "}
          <span
            className="text-2xl"
            style={{ fontFamily: `${jost.style.fontFamily}` }}
          >
            Services
          </span>
          <span className="my-4">2D Design</span>
          <span className="my-4">3D Design</span>
          {/* <span className="my-4">Pages</span> */}
          {/* <span className="my-4">Pages</span> */}
        </div>
        <div className="flex flex-col ">
          <span
            className="text-2xl"
            style={{ fontFamily: `${jost.style.fontFamily}` }}
          >
            Contact
          </span>
          <span className="my-4">
            Pragatinagar, Naranpura,
            <br /> Ahmedabad - 380013{" "}
          </span>
          <span className="my-4">(123), 456- 789</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
