"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
function Admin() {

 
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
        <Link href="/admin/create">
          <div className="p-10 border-2 border-slate-400 rounded-xl shadow-xl  hover:bg-gradient-to-r hover:from-cyan-200/30 flex items-center justify-center">
            <span className="text-3xl">Inquiry Details</span>
          </div>
        </Link>
      </div>
   
    </div>
  );
}

export default Admin;
