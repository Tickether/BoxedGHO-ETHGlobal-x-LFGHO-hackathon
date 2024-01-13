"use client";
import React from "react";
import { ConnectKitButton } from "connectkit";
const Navbar = () => {
  return (
    <div className=" flex w-[100vw]  p-3   text-white justify-center">
      <div className="h-fit flex flex-row border-2 border-solid border-whtie max-w-[1200px] justify-between backdrop-blur-sm items-center  w-[80vw] p-3 rounded-2xl ">
        <div className="flex justify-start font-bold text-2xl ">BoxedGHO</div>
        <div className="flex flex-row font-mono text-xl gap-10">
          <h1>Test 1 </h1>
          <h1>Test 2 </h1>
          <h2>Test 3</h2>
        </div>
        <ConnectKitButton />
      </div>
    </div>
  );
};

export default Navbar;
