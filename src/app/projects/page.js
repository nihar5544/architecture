"use client";
import PropertyCard from "@/components/cards/PropertyCard";
import BuildingLoading from "@/components/loader/pageLoader";
import PageHeader from "@/components/navigationbar/PageHeader";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Project() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(data ? false : true);
  useEffect(() => {
    axios
      .get("/api/projectDetails")
      .then((res) => {
        setLoading(false);
        setData(res?.data?.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  console.log(data);
  return (
    <div className="w-full flex flex-col justify-center items-center one fadeIn animate">
      <PageHeader name="Projects" />
      {loading ? (
        <BuildingLoading />
      ) : (
        <div className="md:w-[70%] w-[90%] flex flex-col mt-44">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-14">
            {" "}
            {data &&
              data.length > 0 &&
              data.map((item, index) => (
                <PropertyCard key={index} data={item} />
              ))}
          
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;
