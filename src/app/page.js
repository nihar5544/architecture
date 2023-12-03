import Header from "@/components/navigationbar/Header";
import Image from "next/image";
import { DM_Serif_Display } from "next/font/google";
import ButtonDark from "@/components/button/ButtonDark";
import ReadmoreCard from "@/components/cards/ReadmoreCard";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="vacancy-image w-full h-[90vh] flex items-center ">
        <div className="flex flex-col ml-[20%] w-1/3">
          <span
            className="text-7xl"
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
      <div className="w-[60%] justify-center items-center">
        <div className="grid grid-cols-3 gap-x-5 my-20">
       <ReadmoreCard />
       <ReadmoreCard />
       <ReadmoreCard />
        </div>
      </div>
    </main>
  );
}
