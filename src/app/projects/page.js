"use client";
import PropertyCard from "@/components/cards/PropertyCard";
import PageHeader from "@/components/navigationbar/PageHeader";
import axios from "axios";
import React, { useEffect, useState } from "react";

function page() {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("/api/projectDetails")
      .then((res) => {
        console.log(res.data);
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(data);
  return (
    <div className="w-full flex flex-col justify-center items-center one fadeIn animate">
      <PageHeader name="Projects" />
      <div className="md:w-[70%] w-[90%] flex flex-col mt-44">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-14">
          {" "}
          {data &&
            data.length &&
            data.map((item, index) => <PropertyCard key={index} data={item} />)}
          {/* <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard /> */}
        </div>
      </div>
    </div>
  );
}

export default page;
