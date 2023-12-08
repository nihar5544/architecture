import React from 'react'
import { DM_Serif_Display } from "next/font/google";
import ButtonLight from '../button/ButtonLight';
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
function ContactUs() {
  return (
    <div className='bg-[#292F36] rounded-3xl w-full flex items-center justify-center'>

        <div className="flex flex-col py-12 text-center items-center justify-center">
                  <span
                    className="text-5xl  text-white"
                    style={{ fontFamily: `${jost.style.fontFamily}` }}
                  >
             Wanna join the M.cad?
                  </span>
                  <span className="my-4 text-white"> It is a long established fact  will be distracted.</span>
                  <ButtonLight name={"Contact With Us"} />
                </div>
        </div>
      
   
  )
}

export default ContactUs
