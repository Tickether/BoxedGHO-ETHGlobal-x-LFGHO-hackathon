import { setFips } from "crypto";
import React, { useState } from "react";
import Image from "next/image";
import { Ramp } from "@/hooks/useGetRamps";

const OnRamp = ({ data }: { data: Ramp }) => {
  const [flag, setflag] = useState<boolean>(false);
  const {
    address,
    email,
    txn,
    ref,
    amountGHO,
    amountUSD,
    status,
    createdAt,
    addressTo,
  } = data;
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
              🛒Buy
            </span>
            <span className=" hover:bg-white hover:text-black px-2 rounded-lg">
              cost : {amountUSD}$
            </span>
            <span className=" hover:bg-white hover:text-black px-2 rounded-lg">
              {amountGHO} GHO{" "}
            </span>
            <span
              onClick={() =>
                window.open(`https://sepolia.etherscan.io/tx/${txn}`)
              }
              className=" cursor-pointer hover:bg-white hover:text-black px-2 rounded-lg "
            >{` txhash : ${txn.slice(0, 4)}...${txn.slice(
              txn.length - 5,
              txn.length
            )}`}</span>
            <span className=" hover:bg-white hover:text-black px-2 rounded-lg">
              {status}
            </span>
          </div>
          <button
            className="mr-7 "
            onClick={() => {
              setflag(true);
            }}
          >
            ⬇️
          </button>
        </div>

        {/* Modal Part */}
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
          <div className="  flex justify-between gap-3 h-fit shadow-md rounded-lg px-3  py-8 items-center min-w-[1000px]  shadow-blue-500 flex-col w-[50%]">
            <span className="text-xl">
              Purchase By : {""}
              <span className="text-xl border-b-2 border-blue-600">
                {email}
              </span>
            </span>
            <div className="w-[80%] mt-11 flex justify-between text-lg">
              <span className="text-slate-600 font-sans font-semibold">
                Status
              </span>
              <span className="text-[16px] bg-green-500 px-3 rounded-2xl flex justify-center w-[50%]">
                {status}
              </span>
            </div>
            <div className="w-[80%] flex justify-between text-lg">
              <span className="text-slate-600 font-sans font-semibold">
                From
              </span>
              <span className="text-[16px] w-[50%]">{address}</span>
            </div>
            <div className="w-[80%] flex justify-between text-lg">
              <span className="text-slate-600 font-sans font-semibold">To</span>
              <span className="text-[16px] w-[50%]">{addressTo}</span>
            </div>
            <div className="w-[80%]  flex justify-between text-lg">
              <span className="text-slate-600 font-sans font-semibold">
                Transaction Hash
              </span>
              <span className="text-[16px] w-[50%]">
                {`${txn.slice(0, 8)}...${txn.slice(
                  txn.length - 8,
                  txn.length
                )}`}
              </span>
            </div>
            <div className="w-[80%] flex justify-between text-lg">
              <span className="text-slate-600 font-sans font-semibold">
                Purchase At
              </span>
              <span className="text-[16px] w-[50%]">{formattedDate}</span>
            </div>

            <div className="w-[80%] flex justify-between text-lg">
              <span className="text-slate-600 font-sans font-semibold">
                GHO Ammount{" "}
              </span>
              <span className="text-[16px] w-[50%]">{amountGHO} GHO</span>
            </div>
            <div className="w-[80%] mb-1 flex justify-between text-lg">
              <span className="text-slate-600 font-sans font-semibold">
                Total cost
              </span>
              <span className="text-[16px] w-[50%]">{amountUSD} $</span>
            </div>
            <div className="w-[80%] mb-1 flex justify-between text-lg">
              <span className="text-slate-600 font-sans font-semibold">
                Ref
              </span>
              <span className="text-[16px] w-[50%]">{ref}</span>
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

export default OnRamp;
