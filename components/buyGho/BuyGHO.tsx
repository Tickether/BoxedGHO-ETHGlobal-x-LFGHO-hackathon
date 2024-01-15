"use client";
import React, { useState } from "react";
import Image from "next/image";

interface BuyGHOProps {
  setOpenBuyModal: (openSendModal: boolean) => void;
}
const BuyGHO = ({ setOpenBuyModal }: BuyGHOProps) => {
  const [ghoamount, setGhoamount] = useState<number>(0);
  return (
    <div className="fixed  text-white flex flex-col w-screen backdrop-blur-2xl h-screen items-center justify-center top-0 left-0 right-0 bottom-0  bg-gradient-to-r from-slate-900 to-slate-700">
      <button
        className="   w-[80%]  flex justify-end"
        onClick={() => {
          setOpenBuyModal(false);
        }}
      >
        <Image src="/cancel.svg" alt="doggy" width={50} height={50} />
      </button>

      {/* Main Card */}
      <div className="w-fit   px-5 mt-11 rounded-lg flex-col   gap-5   flex items-start justify-center bg-slate-900 shadow-sm shadow-blue-500 h-fit ">
        <div className="w-full mb-5">
          <span className="flex justify-center w-full mt-5 text-2xl">
            {" "}
            🛒 Buy GHO{" "}
          </span>
          <span className="text-md  flex justify-center w-full font-sans font-normal">
            Pay w/ credit , debit card or bank account
          </span>
        </div>
        <div className=" shadow-sm shadow-white rounded-lg p-3 flex flex-col ">
          <div className="flex w-full mb-5 border-b-[1px] flex-col">
            <span className="py-1 text-[12px] ">Buy</span>

            <div className="flex">
              <span className="text-4xl font-sans">
                $ {""}
                <input
                  type="number"
                  className="bg-transparent border-none focus:outline-none text-4xl font-sans h-11"
                  placeholder="0"
                  onChange={(e) => {
                    setGhoamount(Number(e.target.value));
                  }}
                />
              </span>
            </div>
          </div>
          <div>
            <span className="text-[13px]">Receive</span>
            <div className="w-full h-11 bg-transparent text-4xl font-sans font-lighter flex items-center px-3 rounded-md ">
              {ghoamount} {""}GHO
            </div>
          </div>
        </div>
        <div className=" w-full  px-3 flex justify-between">
          <span>fees</span>
          <span>$2.83</span>
        </div>
        <div className=" w-full  px-3 flex justify-between">
          <span>Total</span>
          <span>{`$ ${ghoamount + 2.83}`}</span>
        </div>
        <div className="w-full flex justify-center mt-11 pb-11">
          <button className="border-[1px] w-[80%] text p-3  rounded-lg hover:bg-green-300 font-sans font-semibold">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyGHO;
