import { setFips } from "crypto";
import React, { useState } from "react";
import Image from "next/image";

interface Ramp {
  address: string;
  email: string;
  txn: string;
  ref: string;
  amountGHO: string;
  amountUSD: string;
  status: string;
  createdAt: string;
}
const OnRamp = ({ data }: { data: Ramp }) => {
  const [flag, setflag] = useState<boolean>(false);

  const date = new Date(data.createdAt);
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
            <span>🛒Buy</span>
            <span> cost : {data.amountUSD}$</span>
            <span>{data.amountGHO} GHO </span>
            <span
              onClick={() =>
                window.open(`https://sepolia.etherscan.io/tx/${data.txn}`)
              }
              className=" cursor-pointer"
            >{` txhash : ${data.txn.slice(0, 4)}...${data.txn.slice(
              data.txn.length - 5,
              data.txn.length
            )}`}</span>
            <span>{data.status}</span>
          </div>
          <button
            className="mr-7"
            onClick={() => {
              setflag(true);
            }}
          >
            ⬇️
          </button>
        </div>

        <div
          className={`${
            flag
              ? "  fixed  w-screen bg-slate-900 h-screen top-0 left-0 right-0 bottom-0  bg-gradient-to-r from-slate-900 to-slate-700 transition p-3 border-t-2 border-slate-700  flex justify-center gap-2  flex-col items-center rounded-b-2xl"
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
          <div className="  flex justify-between gap-5 h-fit shadow-md rounded-lg px-3  py-8 items-center  shadow-blue-500 flex-col w-[40%]">
            <span className="text-xl">
              purchase by : {""}
              <span className="text-xl border-b-2 border-blue-600">
                {data.email}
              </span>
            </span>

            <div className="w-[80%] mt-11 flex justify-between text-lg">
              <span className="text-slate-600">Transaction Hash</span>
              <span className=" w-[40%]">
                {`${data.txn.slice(0, 8)}...${data.txn.slice(
                  data.txn.length - 8,
                  data.txn.length
                )}`}
              </span>
            </div>
            <div className="w-[80%] flex justify-between text-lg">
              <span className="text-slate-600">Purchase At</span>
              <span className=" w-[40%]">{formattedDate}</span>
            </div>

            <div className="w-[80%] flex justify-between text-lg">
              <span className="text-slate-600">GHO Ammount </span>
              <span className=" w-[40%]">{data.amountGHO} GHO</span>
            </div>
            <div className="w-[80%] mb-11 flex justify-between text-lg">
              <span className="text-slate-600">Total cost</span>
              <span className=" w-[40%]">{data.amountUSD} $</span>
            </div>
            <button
              onClick={() => {
                window.open(`https://sepolia.etherscan.io/tx/${data.txn}`);
              }}
              className="border-white border-2 w-[200px] rounded-xl p-3 text-lg hover:bg-black "
            >
              view on etherscan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnRamp;
