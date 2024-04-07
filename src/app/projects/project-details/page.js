import React from "react";
import { DM_Serif_Display } from "next/font/google";
import ImageZoom from "@/components/Image/ImageZoom";
function page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-[350px] bg-[url('/images/Sevices-header.png')]" />
      <div className="lg:max-w-[70%] max-w-[90%]">
        <div className="flex max-sm:flex-col gap-10 my-28">
          <div className="bg-[#F4F0EC] p-10 flex rounded-[50px] max-h-72 max-w-xl text-[#4D5053]">
            <div className="flex flex-col">
              <span className="font-serif font-bold mr-10">Client</span>
              <span className="font-serif font-bold mr-10">Category</span>
              <span className="font-serif font-bold mr-10">Location</span>
              <span className="font-serif font-bold mr-10">Date</span>
              <span className="font-serif font-bold mr-10">Link</span>
            </div>
            <div className="flex flex-col">
              <span className="font-jost ">Your client name</span>
              <span className="font-jost ">Flat</span>
              <span className="font-jost ">Sydney</span>
              <span className="font-jost ">23,02, 2022</span>
              <span className="font-jost ">example.com</span>
            </div>
          </div>
          <div className="flex flex-col items-center max-w-3xl">
            <span className="font-serif font-bold text-[#292F36] text-5xl">
              Minimal Look Bedrooms
            </span>
            <span className="text-[#4D5053] mt-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aliquamsem vitae turpis dignissim maximus. Aliquam sollicitudin
              tellumassa, vbel maximus purus posuere in. Dojrices gravida
              dignissim. Praesent at nibh in mi fringilla mattis. Phasellus ut
              dolor odio. Aenean in the ipsum vel lectus bibendum commodo. In
              nec sem suscipit, convallis leo vitae, lacinia nibh. Cras amet
              tellus lectus. Vivamus ipsum nunc, mattis quis nibh id,
              pellentesque arcu. Donec a pellentesque Cras erat enim, gravida
              non ante vitae,elequis convallis elit, in viverra felis. Donec
              ultrices tellus vitae iaculisvd porta. Proin tincidunt ligula id
              purus porttitor.
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center justify-center mb-20">
        <ImageZoom imageUrl={`/images/Dashboard5.png`} />
        <ImageZoom imageUrl={`/images/Dashboard5.png`} />
        <ImageZoom imageUrl={`/images/Dashboard5.png`} />
        <ImageZoom imageUrl={`/images/Dashboard5.png`} />
        </div>
      </div>{" "}
    </div>
  );
}

export default page;
