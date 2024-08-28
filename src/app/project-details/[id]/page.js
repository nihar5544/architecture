"use client";
import React, { useEffect, useState } from "react";
import { DM_Serif_Display } from "next/font/google";
import ImageZoom from "@/components/Image/ImageZoom";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import BuildingLoading from "@/components/loader/pageLoader";
import Link from "next/link";

function ProjectDetails() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  console.log("id", params.id, data);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/projectDetails/${params?.id}`)
      .then((res) => {
        setData(res.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [params?.id]);
  console.log(data);
  return (
    <>
      {loading ? (
        <BuildingLoading />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="w-full ">
            <Image
              src={data?.image}
              alt="image"
              width={0}
              height={0}
              className="w-full h-[450px] object-cover"
            />
          </div>
          <div className="lg:max-w-[70%] max-w-[90%]">
            <div className="grid max-sm:grid-cols-1 grid-cols-3  gap-10 my-28">
              <div className="bg-[#F4F0EC] p-10 flex rounded-[50px] max-h-72 max-w-xl text-[#4D5053]">
                <div className="grid grid-cols-2">
                  <span className="font-serif font-bold mr-10">Client</span>

                  <span className="font-jost ">{data?.Client}</span>

                  <span className="font-serif font-bold mr-10">Category</span>
                  <span className="font-jost ">{data?.Category}</span>
                  <span className="font-serif font-bold mr-10">Location</span>
                  <span className="font-jost ">{data?.Location}</span>
                  <span className="font-serif font-bold mr-10">Date</span>
                  <span className="font-jost ">{data?.Date}</span>
                  <span className="font-serif font-bold mr-10">Link</span>
                  <Link
                    href={data?.Link}
                    target="_blank"
                    className="font-jost underline truncate"
                  >
                    {data?.Link}
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center max-w-3xl col-span-2">
                <span className="font-serif font-bold text-[#292F36] text-5xl">
                  {data?.title}
                </span>
                <span className="text-[#4D5053] mt-10">
                  {data?.description}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center justify-center mb-20">
              {data?.otherImage &&
                data?.otherImage?.map((item, index) => (
                  <ImageZoom key={index} imageUrl={item} />
                ))}{" "}
            </div>
          </div>{" "}
        </div>
      )}
    </>
  );
}

export default ProjectDetails;
