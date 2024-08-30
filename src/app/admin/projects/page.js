"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Image from "next/image";
import BuildingLoading from "@/components/loader/pageLoader";
import { toast } from "sonner";

function Projects() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getData = () => {
    setLoading(true);
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
  };
  const handleDelete = (id) => {
    setDeleteLoading(true);
    axios
      .delete(`/api/projectDetails/${id}`)
      .then((res) => {
        console.log(res);
        toast.success("Project deleted successfully");
        setDeleteLoading(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        setDeleteLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <div className="w-full flex flex-col  items-center h-screen">
      <h1 className="text-5xl font-medium my-10">Projects</h1>
      {loading ? (
        <BuildingLoading />
      ) : (
        <div className="max-w-6xl w-full grid-cols-3 grid gap-8">
          {data &&
            data.length > 0 &&
            data.map((row) => (
              <div
                key={row.name}
                className="w-full flex justify-between items-center p-2 drop-shadow-xl bg-white rounded-2xl gap-6 hover:bg-gradient-to-l hover:from-cyan-200/30"
              >
                <Image
                  src={row?.image}
                  alt="img"
                  className="rounded-xl"
                  width={100}
                  height={100}
                />
                <div>
                  <h1>{row?.title}</h1>
                  <div>
                    <Button
                      variant="outlined"
                      color="success"
                      //   onClick={() => handleDelete(row?._id)}

                      href={`/admin/projects/${row?._id}`}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(row?._id)}
                      variant="outlined"
                      color="error"
                      loading={loading}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
