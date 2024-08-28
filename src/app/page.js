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
import { useRouter } from "next/navigation";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
export default function Home() {
  const [triggered, setTriggered] = useState(true);
  const [triggered2, setTriggered2] = useState(false);
  const [triggered3, setTriggered3] = useState(false);
  const [triggered4, setTriggered4] = useState(false);
  const [triggered5, setTriggered5] = useState(false);
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center text-center one fadeIn animate">
      <div className="vacancy-image md:rounded-bl-[300px] w-full h-[90vh] flex items-center ">
        <ScrollAnimation setTriggered={setTriggered} triggered={triggered} />
        <div
          className={`flex flex-col lg:ml-[20%] lg:w-1/3 max-sm:p-5 ${
            triggered ? " animate fadeInUp " : "hidden"
          }`}
        >
          <span
            className="text-5xl lg:text-7xl"
            style={{ fontFamily: `${jost.style.fontFamily}` }}
          >
            Let Your Home <br></br>Be Unique
          </span>
          <span className="py-4">
            Your home should be as unique as you are. We create spaces tailored
            to your personal style, ensuring every detail reflects your
            individuality.
          </span>
          <ButtonDark name={" Get Started"} />
        </div>
      </div>
      <div className="lg:w-[70%] justify-center items-center">
        <ScrollAnimation setTriggered={setTriggered2} triggered={triggered2} />
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 my-40 max-sm:my-20 max-sm:p-5animate fadeInDown one`}
        >
          <ReadmoreCard
            title={"Project Plan"}
            contant={
              "While there are countless variations of passages available, not all are created equal. At M-Cad, we prioritize precision and quality in every aspect of our projects. Our approach ensures that each phase, from concept to completion, is meticulously crafted to meet your unique needs."
            }
          />
          <ReadmoreCard
            title={"Interior Work"}
            contant={
              "Interior design is more than just aesthetics; it's about creating spaces that resonate with your lifestyle. While there are many approaches to design, we focus on delivering results that combine functionality with elegance. Our team ensures that every detail is thoughtfully curated, resulting in interiors that are both beautiful and practical."
            }
          />
          <ReadmoreCard
            title={"Realization"}
            contant={
              "Turning ideas into reality requires skill, precision, and a deep understanding of both design and execution. While there are many ways to approach a project, we believe in a method that guarantees quality and attention to detail. Our commitment is to bring your vision to life, ensuring that the final realization surpasses your expectations."
            }
          />
        </div>
        <ScrollAnimation setTriggered={setTriggered3} triggered={triggered3} />
        <div className="flex max-sm:flex-col-reverse mb-20 ">
          <div
            className={`flex flex-col justify-between max-sm:p-5 w-full ${
              triggered3 ? "animate fadeInLeft one" : "hidden"
            }`}
          >
            <span
              className="text-5xl"
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            >
              Elevating the Art of <br></br> Stylish Living
            </span>
            <span className="my-8">
              {" "}
              We design spaces that blend beauty and function. Every project is
              thoughtfully crafted to reflect your unique style and needs,
              creating environments that are both timeless and practical.
            </span>
            <div className="flex">
              <Icons name="Call-Icon" />
              <div className="ml-4 flex flex-col">
                <span className="font-bold">+91 98257 39499</span>
                <span>Call Us Anytime</span>
              </div>
            </div>
            <div className="mt-8">
              <ButtonDark
                name={"Get Free Estimate"}
                handlesubmit={() => {
                  router.push("/contact");
                }}
              />
            </div>
          </div>
          <div
            className={`flex items-end justify-end max-sm:p-5 w-full ${
              triggered3 ? "animate fadeInRight one" : "hidden"
            }`}
          >
            <Image
              // eslint-disable-next-line no-undef
              src={`/images/Dashboard2.webp`}
              width={500}
              height={100}
              alt="coindelta-logo"
              className="mt-[20px] rounded-tr-[300px] rounded-bl-[100px] max-sm:rounded-3xl"
            />
          </div>
        </div>
        <ScrollAnimation setTriggered={setTriggered4} triggered={triggered4} />
        <div
          className={`flex flex-col items-center my-40 max-sm:p-5 ${
            triggered4 ? "animate fadeInUp one" : "hidden"
          }`}
        >
          <span
            className="text-5xl"
            style={{ fontFamily: `${jost.style.fontFamily}` }}
          >
            Follow Our Projects
          </span>
          <span className="mt-2 w-1/2 max-sm:w-full">
            Stay connected with our latest work. Explore how we transform ideas
            into stunning spaces, showcasing the art of thoughtful design and
            execution.
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-24 my-20">
            <div className="flex flex-col">
              <Image
                // eslint-disable-next-line no-undef
                src={`/images/Dashboard3.webp`}
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
                src={`/images/Dashboard4.webp`}
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
                src={`/images/Dashboard3.webp`}
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
                src={`/images/Dashboard5.webp`}
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
        <div
          className={`grid grid-cols-1 lg:grid-cols-4  w-[70%] gap-y-4 lg:divide-x-4 max-sm:p-5 ${
            triggered5 ? "animate fadeInUp one" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <span
              className="text-7xl text-[#CDA274]"
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            >
              25+
            </span>
            <span className="text-[#4D5053]">Years Of Experiance</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span
              className="text-7xl text-[#CDA274]"
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            >
              85+
            </span>
            <span className="text-[#4D5053]">Success Project</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span
              className="text-7xl text-[#CDA274]"
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            >
              3+
            </span>
            <span className="text-[#4D5053]">Active Project</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span
              className="text-7xl text-[#CDA274]"
              style={{ fontFamily: `${jost.style.fontFamily}` }}
            >
              100+
            </span>
            <span className="text-[#4D5053]">Happy Customers</span>
          </div>
        </div>
      </div>
      <div className="my-20 lg:w-[70%]">
        <ContactUs />
      </div>
    </main>
  );
}
