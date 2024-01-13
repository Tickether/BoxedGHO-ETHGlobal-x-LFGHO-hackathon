"use client";
import React from "react";
import { ConnectKitButton } from "connectkit";
const Navbar = () => {
  return (
    <div className=" flex w-[100vw]  p-3   text-white justify-center">
      <div className="h-fit flex flex-row border-2 border-solid border-whtie max-w-[1200px] justify-between backdrop-blur-sm items-center  w-[80vw] p-3 rounded-2xl ">
        <div className="flex justify-start font-bold items-center text-2xl ">
          <span className="text-4xl">📦</span>BoxedGHO
        </div>
        <div className="flex flex-row font-mono text-2xl gap-10">
          <h2>Account</h2>
          <h2>History</h2>
        </div>
        <ConnectKitButton />
      </div>
    </div>
  );
};

export default Navbar;
