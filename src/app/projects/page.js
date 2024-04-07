import PropertyCard from "@/components/cards/PropertyCard";
import PageHeader from "@/components/navigationbar/PageHeader";
import React from "react";

function page() {
  return (
    <div className="w-full flex flex-col justify-center items-center one fadeIn animate">
      <PageHeader name="Projects" />
      <div className="md:w-[70%] w-[90%] flex flex-col mt-44">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-14">
          {" "}
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>
      </div>
    </div>
  );
}

export default page;
