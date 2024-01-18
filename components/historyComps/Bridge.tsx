import React, { useState } from "react";
import Image from "next/image";
import { Bridge } from "@/hooks/useGetBridges";

const BridgeComponent = ({ BridgeData }: { BridgeData: Bridge }) => {
  const [flag, setflag] = useState<boolean>(false);
  const {
    address,
    addressTo,
    txn,
    amountBridged,
    amountGHO,
    bridgeChain,
    bridgeToken,
    createdAt,
  } = BridgeData;

  // date formatting
  const date = new Date(createdAt);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: userTimeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  return (
    <div className="w-full h-fit bg-slate-700 hover:border-2 border-blue-500 border-solid  rounded-2xl mb-5">
      <span className="text-base h-7 flex justify-start items-center pl-4 pt-2 mb-3">
        {date.toDateString()}
      </span>
      <div className="bg-slate-900 rounded-b-2xl ">
        <div className="h-11 text-lg flex justify-between   ">
          <div className="items-center w-[90%] pl-7 flex justify-between">
            <span className=" hover:bg-white hover:text-black px-2 rounded-lg">
              ↗️ Send
            </span>
            <span className=" hover:bg-white hover:text-black px-2 rounded-lg">
              {amountGHO} GHO
            </span>
            <span className=" hover:bg-white hover:text-black px-2 rounded-lg">
              {amountBridged} {bridgeToken}
            </span>
            <span
              onClick={() =>
                window.open(`https://sepolia.etherscan.io/tx/${txn}`)
              }
              className="cursor-pointer hover:bg-white hover:text-black px-2 rounded-lg"
            >
              {` txhash : ${txn.slice(0, 4)}...${txn.slice(
                txn.length - 5,
                txn.length
              )}`}
            </span>
            <span
              className="cursor-pointer hover:bg-white hover:text-black px-2 rounded-lg"
              onClick={() =>
                window.open(`https://sepolia.etherscan.io/address/${addressTo}`)
              }
            >
              {` reciver : ${addressTo.slice(0, 4)}...${addressTo.slice(
                addressTo.length - 5,
                addressTo.length
              )}`}
            </span>
          </div>
          <button
            className="mr-7 animate-bounce"
            onClick={() => {
              setflag(true);
            }}
          >
            ⬇️
          </button>
        </div>

        {/* Modal Part  */}
        <div
          className={`${
            flag
              ? "fixed  w-screen bg-slate-900 h-screen top-0 left-0 right-0 bottom-0  bg-gradient-to-r from-slate-900 to-slate-700 transition p-3 border-t-2 border-slate-700  flex justify-center gap-2  flex-col items-center rounded-b-2xl"
              : "hidden"
          }`}
        >
          <button
            className="   w-[85%] flex justify-end"
            onClick={() => {
              setflag(false);
            }}
          >
            <Image src="/cancel.svg" alt="doggy" width={50} height={50} />
          </button>
          <div className="flex justify-between gap-5 h-fit shadow-md rounded-lg px-3  py-8 items-center  shadow-blue-500 flex-col w-[40%]">
            <span className="text-xl">GHO Convert Transaction Detail</span>

            <div className="w-[80%] mt-11 flex justify-between text-lg">
              <span className="font-semibold text-slate-600">
                Transaction Hash
              </span>
              <span className=" w-[40%]">
                {" "}
                {`${txn.slice(0, 8)}...${txn.slice(
                  txn.length - 8,
                  txn.length
                )}`}
              </span>
            </div>
            <div className="w-[80%] flex justify-between text-lg">
              <span className="font-semibold text-slate-600">Purchase At</span>
              <span className=" w-[40%]">{formattedDate}</span>
            </div>

            <div className="w-[80%] flex justify-between text-lg">
              <span className="font-semibold text-slate-600"> Reciver </span>
              <span className=" w-[40%]">
                {" "}
                {`${addressTo.slice(0, 6)}...${addressTo.slice(
                  addressTo.length - 5,
                  addressTo.length
                )}`}
              </span>
            </div>
            <div className="w-[80%] flex justify-between text-lg">
              <span className="font-semibold text-slate-600">
                {" "}
                Reciver Chain
              </span>
              <span className=" w-[40%]">{bridgeChain}</span>
            </div>
            <div className="w-[80%] flex justify-between text-lg">
              <span className="font-semibold text-slate-600">
                {" "}
                Reciver TOken
              </span>
              <span className=" w-[40%]">
                {amountBridged} {bridgeToken}
              </span>
            </div>
            <div className="w-[80%] flex justify-between text-lg">
              <span className="font-semibold text-slate-600">GHO Ammount </span>
              <span className=" w-[40%]">{amountGHO} GHO</span>
            </div>

            <button
              onClick={() => {
                window.open(`https://sepolia.etherscan.io/tx/${txn}`);
              }}
              className="border-white border-2 w-[200px] rounded-xl p-3 text-lg hover:bg-black "
            >
              view on etherscan
            </button>
          </div>
        </div>
        {/* Modal Part */}
      </div>
    </div>
  );
};

export default BridgeComponent;
