"use client";
import Header from "@/components/navigationbar/Header";
import Image from "next/image";
import { DM_Serif_Display } from "next/font/google";
import ButtonDark from "@/components/button/ButtonDark";
import ReadmoreCard from "@/components/cards/ReadmoreCard";
import Icons from "@/components/icons";
import ContactUs from "@/components/cards/ContactUs";
import { useState } from "react";
import ScrollAnimation from "@/components/ui/Animation";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
export default function Home() {
  const [triggered, setTriggered] = useState(true);
  const [triggered2, setTriggered2] = useState(false);
  const [triggered3, setTriggered3] = useState(false);
  const [triggered4, setTriggered4] = useState(false);
  const [triggered5, setTriggered5] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center text-center one fadeIn animate">
      <div className="vacancy-image md:rounded-bl-[300px] w-full h-[90vh] flex items-center ">
      <ScrollAnimation setTriggered={setTriggered} triggered={triggered} />
        <div className={`flex flex-col lg:ml-[20%] lg:w-1/3 ${triggered ? " animate fadeInUp " : "hidden"}`}>
          <span
            className="text-5xl lg:text-7xl"
            style={{ fontFamily: `${jost.style.fontFamily}` }}
          >
            Let Your Home <br></br>Be Unique
          </span>
          <span className="py-4">
            There are many variations of the passages of lorem Ipsum
            fromavailable,variations of the passages.
          </span>
          <ButtonDark name={" Get Started"} />
        </div>
      </div>
      <div className="lg:w-[70%] justify-center items-center">
      <ScrollAnimation setTriggered={setTriggered2} triggered={triggered2} />
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 my-40 ${triggered2 ? "animate fadeInDown two" : "hidden"}`}>
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
            title={"Realization"}
            contant={
              "  There are many variations of the passages of lorem Ipsum from available, majority"
            }
          />
        </div>
           <ScrollAnimation setTriggered={setTriggered3} triggered={triggered3} />
        <div className="grid grid-cols-1 lg:grid-cols-2 mb-20 ">
          <div className={`flex flex-col justify-between ${triggered3 ? "animate fadeInLeft two" : "hidden"}`}>
            <span
              className="text-5xl"
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            >
              We Create The Art
              <br /> Of Stylish Living <br />
              Stylishly
            </span>
            <span className="my-8">
              {" "}
              It is a long established fact that a reader will be distracted by
              the of readable content of a page when lookings at its layouts the
              points of using that it has a more-or-less normal.
            </span>
            <div className="flex">
              <Icons name="Call-Icon" />
              <div className="ml-4 flex flex-col">
                <span className="font-bold">123456789</span>
                <span>Call Us Anytime</span>
              </div>
            </div>
            <div className="mt-8">
              <ButtonDark name={"Get Free Estimate"} />
            </div>
          </div>
          <div className={`flex items-end justify-end ${triggered3 ? "animate fadeInRight two" : "hidden"}`}>
            <Image
              // eslint-disable-next-line no-undef
              src={`/images/Dashboard2.png`}
              width={500}
              height={100}
              alt="coindelta-logo"
              className="pt-[20px] rounded-tr-[300px] rounded-bl-[100px]"
            />
          </div>
        </div>
        <ScrollAnimation setTriggered={setTriggered4} triggered={triggered4} />
        <div className={`flex flex-col items-center my-40 ${triggered4 ? "animate fadeInUp two" : "hidden"}`}>
          <span
            className="text-5xl"
            style={{ fontFamily: `${jost.style.fontFamily}` }}
          >
            Follow Our Projects
          </span>
          <span className="mt-2 w-1/2">
            It is a long established fact that a reader will be distracted by
            the of readable content of page lookings at its layouts points.
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-24 my-20">
            <div className="flex flex-col">
              <Image
                // eslint-disable-next-line no-undef
                src={`/images/Dashboard3.png`}
                width={500}
                height={100}
                alt="coindelta-logo"
                className=" rounded-tr-[100px]"
              />
              <div className="flex justify-between items-center mt-10">
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
            <div className="flex flex-col">
              <Image
                // eslint-disable-next-line no-undef
                src={`/images/Dashboard4.png`}
                width={500}
                height={100}
                alt="coindelta-logo"
                className=" rounded-tl-[100px]"
              />
              <div className="flex justify-between items-center mt-10">
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
            <div className="flex flex-col">
              <Image
                // eslint-disable-next-line no-undef
                src={`/images/Dashboard3.png`}
                width={500}
                height={100}
                alt="coindelta-logo"
                className=" rounded-br-[100px]"
              />
              <div className="flex justify-between items-center mt-10">
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
            <div className="flex flex-col">
              <Image
                // eslint-disable-next-line no-undef
                src={`/images/Dashboard5.png`}
                width={500}
                height={100}
                alt="coindelta-logo"
                className=" rounded-bl-[100px]"
              />
              <div className="flex justify-between items-center mt-10">
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
          </div>
        </div>
      </div>
      <div className="bg-[#F4F0EC] py-16 w-full flex items-center justify-center">
      <ScrollAnimation setTriggered={setTriggered5} triggered={triggered5} />
        <div className={`grid grid-cols-1 lg:grid-cols-4  w-[70%] gap-y-4 lg:divide-x-4 ${triggered5 ? "animate fadeInUp two" : "hidden"}`}>
          <div className="flex flex-col items-center justify-center">
            <span
              className="text-7xl text-[#CDA274]"
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            >
              12
            </span>
            <span className="text-[#4D5053]">Years Of Experiance</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span
              className="text-7xl text-[#CDA274]"
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            >
              12
            </span>
            <span className="text-[#4D5053]">Years Of Experiance</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span
              className="text-7xl text-[#CDA274]"
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            >
              12
            </span>
            <span className="text-[#4D5053]">Years Of Experiance</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span
              className="text-7xl text-[#CDA274]"
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            >
              12
            </span>
            <span className="text-[#4D5053]">Years Of Experiance</span>
          </div>
        </div>
      </div>
      <div className="my-20 lg:w-[70%]">
        <ContactUs />
      </div>
    </main>
  );
}
