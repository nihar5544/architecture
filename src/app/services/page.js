import ReadmoreCard from "@/components/cards/ReadmoreCard";
import PageHeader from "@/components/navigationbar/PageHeader";
import Image from "next/image";
import React from "react";
import { DM_Serif_Display } from "next/font/google";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
import Icons from "@/components/icons";
import ContactUs from "@/components/cards/ContactUs";
import { dbConnect } from "../../../utils/dbConnect";
import SiteContent from "../../../models/SiteContent";

const DEFAULT = {
  cards: [
    {
      title: "Project Plan",
      content:
        "Every project is unique, and so is our approach. While there are numerous methods to plan and execute, our process is tailored to ensure precision and success at every stage. From concept to completion, we focus on delivering exceptional results that align with your vision.",
    },
    {
      title: "Interior Work",
      content:
        "Interior design is more than just aesthetics—it's about creating spaces that truly reflect your personality and needs. We offer various approaches, each one focused on blending beauty with functionality to craft interiors that are as practical as they are stunning.",
    },
    {
      title: "Retail Design",
      content:
        "Retail spaces require a special touch to attract and engage customers. Our design strategies incorporate creativity and customer behavior insights to craft spaces that enhance the shopping experience. We explore a wide range of design possibilities, ensuring that your retail environment stands out and thrives.",
    },
  ],
  steps: [
    {
      number: "01",
      title: "Concept & Details",
      description:
        "We start by understanding your vision, meticulously crafting the concept and refining every detail to ensure a strong foundation for your project.",
      image: "",
    },
    {
      number: "02",
      title: "Strategic Planning",
      description:
        "Our team develops a comprehensive plan, blending innovative ideas with practical solutions to bring your project to life with precision and creativity.",
      image: "",
    },
    {
      number: "03",
      title: "Design Excellence",
      description:
        "We transform concepts into captivating designs, balancing aesthetics with functionality to create spaces that inspire and endure.",
      image: "",
    },
    {
      number: "04",
      title: "Perfect Execution",
      description:
        "Every project is executed with utmost care, ensuring flawless results that exceed expectations and bring your vision to reality.",
      image: "",
    },
  ],
};

async function getContent() {
  try {
    await dbConnect();
    const doc = await SiteContent.findOne({ page: "services" });
    if (!doc) return DEFAULT;
    return {
      cards: doc.content?.cards?.length ? doc.content.cards : DEFAULT.cards,
      steps: doc.content?.steps?.length ? doc.content.steps : DEFAULT.steps,
    };
  } catch {
    return DEFAULT;
  }
}

const staticImages = [
  "/images/Service1.webp",
  "/images/Service2.webp",
  "/images/Service3.webp",
  "/images/Service4.webp",
];

export default async function ServicesPage() {
  const content = await getContent();
  const { cards, steps } = content;

  return (
    <div className="w-full flex flex-col justify-center items-center one fadeIn animate">
      <PageHeader name={"Services"} />
      <div className="lg:w-[70%] flex flex-col">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 my-40 max-sm:my-20 max-sm:p-5">
          {cards.map((card, i) => (
            <ReadmoreCard key={i} title={card.title} contant={card.content} />
          ))}
        </div>
        <div className="w-full rounded-2xl bg-[#F4F0EC] flex flex-col items-center justify-center lg:p-4">
          <span
            className="text-5xl mb-2 mt-8"
            style={{ fontFamily: `${jost.style.fontFamily}` }}
          >
            How We Work
          </span>
          <div className="flex flex-col p-20">
            {steps.map((step, i) => {
              const imgSrc = step.image || staticImages[i] || staticImages[0];
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`grid grid-cols-1 lg:grid-cols-2 mb-20 ${
                    isEven ? "" : ""
                  }`}
                >
                  {isEven ? (
                    <>
                      <Image
                        src={imgSrc}
                        width={400}
                        height={400}
                        alt={step.title}
                        className=""
                      />
                      <div className="flex flex-col justify-evenly">
                        <div className="flex justify-between">
                          <Icons name={"service1"} />
                          <span
                            className="text-7xl text-white mb-2"
                            style={{ fontFamily: `${jost.style.fontFamily}` }}
                          >
                            {step.number}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span
                            className="text-4xl mb-2 text-back"
                            style={{ fontFamily: `${jost.style.fontFamily}` }}
                          >
                            {step.title}
                          </span>
                          <span>{step.description}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col justify-evenly">
                        <div className="flex justify-between">
                          <Icons name={"service1"} />
                          <span
                            className="text-7xl text-white mb-2"
                            style={{ fontFamily: `${jost.style.fontFamily}` }}
                          >
                            {step.number}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span
                            className="text-4xl mb-2 text-back"
                            style={{ fontFamily: `${jost.style.fontFamily}` }}
                          >
                            {step.title}
                          </span>
                          <span>{step.description}</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Image
                          src={imgSrc}
                          width={400}
                          height={400}
                          alt={step.title}
                          className=""
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="my-40">
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
