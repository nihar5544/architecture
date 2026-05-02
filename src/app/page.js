"use client";
import Header from "@/components/navigationbar/Header";
import Image from "next/image";
import { DM_Serif_Display } from "next/font/google";
import ButtonDark from "@/components/button/ButtonDark";
import ReadmoreCard from "@/components/cards/ReadmoreCard";
import Icons from "@/components/icons";
import ContactUs from "@/components/cards/ContactUs";
import { useEffect, useState } from "react";
import ScrollAnimation from "@/components/ui/Animation";
import { useRouter } from "next/navigation";
import axios from "axios";

const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

const DEFAULT = {
  hero: {
    title: "Let Your Home\nBe Unique",
    subtitle:
      "Your home should be as unique as you are. We create spaces tailored to your personal style, ensuring every detail reflects your individuality.",
    buttonText: "Get Started",
  },
  about: {
    title: "Elevating the Art of\nStylish Living",
    description:
      "We design spaces that blend beauty and function. Every project is thoughtfully crafted to reflect your unique style and needs, creating environments that are both timeless and practical.",
    phone: "+91 98257 39499",
    buttonText: "Get Free Estimate",
  },
  stats: [
    { value: "25+", label: "Years Of Experience" },
    { value: "85+", label: "Success Project" },
    { value: "3+", label: "Active Project" },
    { value: "100+", label: "Happy Customers" },
  ],
  services: [
    {
      title: "Project Plan",
      content:
        "While there are countless variations of passages available, not all are created equal. At M-Cad, we prioritize precision and quality in every aspect of our projects. Our approach ensures that each phase, from concept to completion, is meticulously crafted to meet your unique needs.",
    },
    {
      title: "Interior Work",
      content:
        "Interior design is more than just aesthetics; it's about creating spaces that resonate with your lifestyle. While there are many approaches to design, we focus on delivering results that combine functionality with elegance. Our team ensures that every detail is thoughtfully curated, resulting in interiors that are both beautiful and practical.",
    },
    {
      title: "Realization",
      content:
        "Turning ideas into reality requires skill, precision, and a deep understanding of both design and execution. While there are many ways to approach a project, we believe in a method that guarantees quality and attention to detail. Our commitment is to bring your vision to life, ensuring that the final realization surpasses your expectations.",
    },
  ],
  followTitle: "Follow Our Projects",
  followSubtitle:
    "Stay connected with our latest work. Explore how we transform ideas into stunning spaces, showcasing the art of thoughtful design and execution.",
};

export default function Home() {
  const [triggered, setTriggered] = useState(true);
  const [triggered2, setTriggered2] = useState(false);
  const [triggered3, setTriggered3] = useState(false);
  const [triggered4, setTriggered4] = useState(false);
  const [triggered5, setTriggered5] = useState(false);
  const [cms, setCms] = useState(DEFAULT);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/cms/home")
      .then((res) => {
        if (res.data?.data) setCms({ ...DEFAULT, ...res.data.data });
      })
      .catch(() => {});
  }, []);

  const hero = { ...DEFAULT.hero, ...cms.hero };
  const about = { ...DEFAULT.about, ...cms.about };
  const stats = cms.stats?.length ? cms.stats : DEFAULT.stats;
  const services = cms.services?.length ? cms.services : DEFAULT.services;

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
            {hero.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < hero.title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </span>
          <span className="py-4">{hero.subtitle}</span>
          <ButtonDark name={hero.buttonText} />
        </div>
      </div>
      <div className="lg:w-[70%] justify-center items-center">
        <ScrollAnimation setTriggered={setTriggered2} triggered={triggered2} />
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 my-40 max-sm:my-20 max-sm:p-5animate fadeInDown one`}
        >
          {services.map((s, i) => (
            <ReadmoreCard key={i} title={s.title} contant={s.content} />
          ))}
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
              {about.title.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < about.title.split("\n").length - 1 && <br />}
                </span>
              ))}
            </span>
            <span className="my-8">{about.description}</span>
            <div className="flex">
              <Icons name="Call-Icon" />
              <div className="ml-4 flex flex-col">
                <span className="font-bold">{about.phone}</span>
                <span>Call Us Anytime</span>
              </div>
            </div>
            <div className="mt-8">
              <ButtonDark
                name={about.buttonText}
                handlesubmit={() => router.push("/contact")}
              />
            </div>
          </div>
          <div
            className={`flex items-end justify-end max-sm:p-5 w-full ${
              triggered3 ? "animate fadeInRight one" : "hidden"
            }`}
          >
            <Image
              src={`/images/Dashboard2.webp`}
              width={500}
              height={100}
              alt="architecture-about"
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
            {cms.followTitle || DEFAULT.followTitle}
          </span>
          <span className="mt-2 w-1/2 max-sm:w-full">
            {cms.followSubtitle || DEFAULT.followSubtitle}
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-24 my-20">
            <div className="flex flex-col">
              <Image
                src={`/images/Dashboard3.webp`}
                width={500}
                height={100}
                alt="project-1"
                className=" rounded-tr-[100px]"
              />
              <div className="flex justify-between items-center mt-10">
                <div className="flex flex-col ">
                  <span
                    className="text-2xl"
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
                    Modern Kitchen
                  </span>
                  <span className="mt-2"> Decor / Architecture</span>
                </div>
                <Icons name={"Next-Arrow"} />
              </div>
            </div>
            <div className="flex flex-col">
              <Image
                src={`/images/Dashboard4.webp`}
                width={500}
                height={100}
                alt="project-2"
                className=" rounded-tl-[100px]"
              />
              <div className="flex justify-between items-center mt-10">
                <div className="flex flex-col ">
                  <span
                    className="text-2xl"
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
                    Modern Kitchen
                  </span>
                  <span className="mt-2"> Decor / Architecture</span>
                </div>
                <Icons name={"Next-Arrow"} />
              </div>
            </div>
            <div className="flex flex-col">
              <Image
                src={`/images/Dashboard3.webp`}
                width={500}
                height={100}
                alt="project-3"
                className=" rounded-br-[100px]"
              />
              <div className="flex justify-between items-center mt-10">
                <div className="flex flex-col ">
                  <span
                    className="text-2xl"
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
                    Modern Kitchen
                  </span>
                  <span className="mt-2"> Decor / Architecture</span>
                </div>
                <Icons name={"Next-Arrow"} />
              </div>
            </div>
            <div className="flex flex-col">
              <Image
                src={`/images/Dashboard5.webp`}
                width={500}
                height={100}
                alt="project-4"
                className=" rounded-bl-[100px]"
              />
              <div className="flex justify-between items-center mt-10">
                <div className="flex flex-col ">
                  <span
                    className="text-2xl"
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
                    Modern Kitchen
                  </span>
                  <span className="mt-2"> Decor / Architecture</span>
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
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <span
                className="text-7xl text-[#CDA274]"
                style={{ fontFamily: `${jost.style.fontFamily}` }}
              >
                {stat.value}
              </span>
              <span className="text-[#4D5053]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="my-20 lg:w-[70%]">
        <ContactUs />
      </div>
    </main>
  );
}
