import ReadmoreCard from "@/components/cards/ReadmoreCard";
import PageHeader from "@/components/navigationbar/PageHeader";
import Image from "next/image";
import React from "react";
import { DM_Serif_Display } from "next/font/google";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
import Icons from "@/components/icons";
import ContactUs from "@/components/cards/ContactUs";
function page() {
  return (
    <div className="w-full flex flex-col justify-center items-center one fadeIn animate">
      <PageHeader name={"Services"} />
      <div className="lg:w-[70%] flex flex-col">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 my-40 max-sm:p-5">
          <ReadmoreCard
            title={"Project Plan"}
            contant={
              "  There are many variations of the passages of lorem Ipsum from available, majority"
            }
          />
          <ReadmoreCard
            title={"Interior Work"}
            contant={
              "  There are many variations of the passages of lorem Ipsum from available, majority"
            }
          />
          <ReadmoreCard
            title={"Retail Design"}
            contant={
              "  There are many variations of the passages of lorem Ipsum from available, majority"
            }
          />
        </div>
        <div className="w-full rounded-2xl bg-[#F4F0EC] flex flex-col items-center justify-center lg:p-4">
          <span
            className="text-5xl mb-2 mt-8"
            style={{ fontFamily: `${jost.style.fontFamily}` }}
          >
            How We Work
          </span>
          <div className="flex flex-col p-20">
            {" "}
            <div className="grid grid-cols-1 lg:grid-cols-2 mb-20">
              <Image
                // eslint-disable-next-line no-undef
                src={`/images/Service1.png`}
                width={400}
                height={400}
                alt="coindelta-logo"
                className=""
              />
              <div className="flex flex-col  justify-evenly">
                <div className="flex justify-between">
                  <Icons name={"service1"} />{" "}
                  <span
                    className="text-7xl text-white mb-2 "
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
                    01
                  </span>
                </div>
                <div className="flex flex-col">
                  {" "}
                  <span
                    className="text-4xl mb-2 text-back"
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
                    Concept & Details
                  </span>
                  <span>
                    It is a long established fact will be distracted. Lorem
                    Ipsum is simply dummy from text of the and typesetting
                    indufstry.{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 mb-20">
              <div className="flex flex-col  justify-evenly">
                <div className="flex justify-between">
                  <Icons name={"service1"} />{" "}
                  <span
                    className="text-7xl text-white mb-2 "
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
                    02
                  </span>
                </div>
                <div className="flex flex-col">
                  {" "}
                  <span
                    className="text-4xl mb-2 text-back"
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
                    Idea for Work
                  </span>
                  <span>
                    It is a long established fact will be distracted. Lorem
                    Ipsum is simply dummy from text of the and typesetting
                    indufstry.{" "}
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <Image
                  // eslint-disable-next-line no-undef
                  src={`/images/Service2.png`}
                  width={400}
                  height={400}
                  alt="coindelta-logo"
                  className=""
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 mb-20">
              <Image
                // eslint-disable-next-line no-undef
                src={`/images/Service3.png`}
                width={400}
                height={400}
                alt="coindelta-logo"
                className=""
              />
              <div className="flex flex-col  justify-evenly">
                <div className="flex justify-between">
                  <Icons name={"service1"} />{" "}
                  <span
                    className="text-7xl text-white mb-2 "
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
                    03
                  </span>
                </div>
                <div className="flex flex-col">
                  {" "}
                  <span
                    className="text-4xl mb-2 text-back"
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
                    Design
                  </span>
                  <span>
                    It is a long established fact will be distracted. Lorem
                    Ipsum is simply dummy from text of the and typesetting
                    indufstry.{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2  mb-20">
              <div className="flex flex-col  justify-evenly">
                <div className="flex justify-between">
                  <Icons name={"service1"} />{" "}
                  <span
                    className="text-7xl text-white mb-2 "
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
                    04
                  </span>
                </div>
                <div className="flex flex-col">
                  {" "}
                  <span
                    className="text-4xl mb-2 text-back"
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >Perfection</span>
                  <span>
                    It is a long established fact will be distracted. Lorem
                    Ipsum is simply dummy from text of the and typesetting
                    indufstry.{" "}
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                {" "}
                <Image
                  // eslint-disable-next-line no-undef
                  src={`/images/Service4.png`}
                  width={400}
                  height={400}
                  alt="coindelta-logo"
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-40">
        <ContactUs />
      </div>
      </div>
    </div>
  );
}

export default page;
