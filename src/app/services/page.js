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
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 my-40 max-sm:my-20 max-sm:p-5">
          <ReadmoreCard
            title={"Project Plan"}
            contant={
              "Every project is unique, and so is our approach. While there are numerous methods to plan and execute, our process is tailored to ensure precision and success at every stage. From concept to completion, we focus on delivering exceptional results that align with your vision."
            }
          />
          <ReadmoreCard
            title={"Interior Work"}
            contant={
              "Interior design is more than just aesthetics—it's about creating spaces that truly reflect your personality and needs. We offer various approaches, each one focused on blending beauty with functionality to craft interiors that are as practical as they are stunning."
            }
          />
          <ReadmoreCard
            title={"Retail Design"}
            contant={
              "Retail spaces require a special touch to attract and engage customers. Our design strategies incorporate creativity and customer behavior insights to craft spaces that enhance the shopping experience. We explore a wide range of design possibilities, ensuring that your retail environment stands out and thrives."
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
                src={`/images/Service1.webp`}
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
                    We start by understanding your vision, meticulously crafting
                    the concept and refining every detail to ensure a strong
                    foundation for your project.
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
                    Strategic Planning
                  </span>
                  <span>
                    Our team develops a comprehensive plan, blending innovative
                    ideas with practical solutions to bring your project to life
                    with precision and creativity.
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <Image
                  // eslint-disable-next-line no-undef
                  src={`/images/Service2.webp`}
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
                src={`/images/Service3.webp`}
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
                    Design Excellence
                  </span>
                  <span>
                    We transform concepts into captivating designs, balancing
                    aesthetics with functionality to create spaces that inspire
                    and endure.
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
                  >
                    Perfect Execution
                  </span>
                  <span>
                    Every project is executed with utmost care, ensuring
                    flawless results that exceed expectations and bring your
                    vision to reality.
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                {" "}
                <Image
                  // eslint-disable-next-line no-undef
                  src={`/images/Service4.webp`}
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
