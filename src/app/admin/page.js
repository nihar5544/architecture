"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
function Admin() {
  const router = useRouter();
  function handleLogout() {
    axios
      .post("/api/logout")
      .then((response) => {
        response.data;
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout Error");
      });
  }

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Link href="/admin/create">
          <div className="p-10 border-2 border-slate-400 rounded-xl shadow-xl  hover:bg-gradient-to-r hover:from-cyan-200/30 flex items-center justify-center">
            <span className="text-3xl">Create New Property</span>
          </div>
        </Link>
        <Link href="/admin/projects">
          <div className="p-10 border-2 border-slate-400 rounded-xl shadow-xl  hover:bg-gradient-to-r hover:from-cyan-200/30 flex items-center justify-center">
            <span className="text-3xl">All Property Details</span>
          </div>
        </Link>
        <Link href="/admin/inquiry-details">
          <div className="p-10 border-2 border-slate-400 rounded-xl shadow-xl  hover:bg-gradient-to-r hover:from-cyan-200/30 flex items-center justify-center">
            <span className="text-3xl">Inquiry Details</span>
          </div>
        </Link>
        <button onClick={handleLogout}>
          <div className="p-10 border-2 border-slate-400 rounded-xl shadow-xl  hover:bg-gradient-to-r hover:from-cyan-200/30 flex items-center justify-center">
            <span className="text-3xl">logout</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Admin;
