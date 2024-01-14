"use client";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-start min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 text-4xl text-white items-center">
      <Navbar />
      <div className="my-[10%]">Coming Soon...</div>
    </div>
  );
};

export default page;
