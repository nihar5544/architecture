import PageHeader from "@/components/navigationbar/PageHeader";
import React from "react";
import { DM_Serif_Display } from "next/font/google";
import Icons from "@/components/icons";
import { TextField } from "@mui/material";
import ButtonDark from "@/components/button/ButtonDark";
const jost = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
function page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <PageHeader name="Contact Us" />
      <div className="lg:w-[70%] flex flex-col items-center justify-center">
        <span
          className="text-5xl mb-2 mt-24 text-center"
          style={{ fontFamily: `${jost.style.fontFamily}` }}
        >
          We love meeting new people <br /> and helping them.
        </span>
        <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-x-10 my-20">
          <div className="bg-[#F4F0EC] w-full rounded-3xl flex flex-col justify-between items-center p-6">
            <div className="flex justify-between w-full items-center">
              <Icons name={"C-mail"} />{" "}
              <span className="">info@yourdomain.com</span>
            </div>
            <div className="flex justify-between w-full items-center">
              <Icons name={"C-phone"} />{" "}
              <span className="">+1 (378) 400-1234</span>
            </div>
            <div className="flex justify-between w-full items-center">
              <Icons name={"C-web"} />{" "}
              <span className="">www.yourdomain.com</span>
            </div>
          </div>
          <div className="col-span-2">
            <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-x-5 mb-6">
              <TextField id="name" label="Name" variant="standard" />
              <TextField id="email" label="Email" variant="standard" />
            </div>
            <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-x-5 mb-6">
              <TextField id="subject" label="Subject" variant="standard" />
              <TextField id="phone" label="Phone" variant="standard" />
            </div>
            <div className=" w-full grid grid-cols-1  mb-6">
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                defaultValue="Hello, I am interested in..."
                variant="standard"
              />
            </div>
            <div className="w-full flex justify-end">
              <ButtonDark name="Send Now" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
