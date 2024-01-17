import React, { useState } from "react";
import Image from "next/image";
interface Bridge {
  address: string;
  addressTo: string;
  txn: string;
  amountGHO: string;
  amountBridged: string;
  bridgeChain: string;
  bridgeToken: string;
  createdAt: string;
}
const Bridge = ({ BridgeData }: { BridgeData: Bridge }) => {
  const [flag, setflag] = useState<boolean>(false);
  console.log(BridgeData);
  return (
    <div className="w-full h-fit bg-slate-700 hover:border-2 border-blue-500 border-solid  rounded-2xl mb-5">
      <span className="text-base h-7 flex justify-start items-center pl-4 pt-2 mb-3">
        12 jan 2023
      </span>
      <div className="bg-slate-900 rounded-b-2xl ">
        <div className="h-11 text-lg flex justify-between   ">
          <div className="items-center w-[90%] pl-7 flex justify-between">
            <span>↗️ Send</span>
            <span> cost : 12$</span>
            <span>recive : 0.002 Eth</span>
            <span
              onClick={() =>
                window.open(
                  `https://goerli.etherscan.io/tx/0x5032683d9c0773258537e0f0f71196a6b1d35eb5f4e8ddc2ad513389c5d72885`
                )
              }
              className=" cursor-pointer"
            >{`9c077..3258`}</span>
            <span> reciver : 9c077...3258</span>
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
        {flag && (
          <div className=" fixed  w-screen bg-slate-900 h-screen top-0 left-0 right-0 bottom-0  bg-gradient-to-r from-slate-900 to-slate-700 transition p-3 border-t-2 border-slate-700  flex justify-center gap-2  flex-col items-center rounded-b-2xl">
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
                <span className="text-slate-600">Transaction Hash</span>
                <span className=" w-[40%]">9c077...3258</span>
              </div>
              <div className="w-[80%] flex justify-between text-lg">
                <span className="text-slate-600">Purchase At</span>
                <span className=" w-[40%]">12 jan 2030</span>
              </div>

              <div className="w-[80%] flex justify-between text-lg">
                <span className="text-slate-600"> Reciver </span>
                <span className=" w-[40%]">9c077...3258</span>
              </div>
              <div className="w-[80%] flex justify-between text-lg">
                <span className="text-slate-600"> Reciver Chain</span>
                <span className=" w-[40%]">Arbitrium</span>
              </div>
              <div className="w-[80%] flex justify-between text-lg">
                <span className="text-slate-600"> Reciver TOken</span>
                <span className=" w-[40%]">0.002 ETH</span>
              </div>
              <div className="w-[80%] flex justify-between text-lg">
                <span className="text-slate-600">GHO Ammount </span>
                <span className=" w-[40%]">12 GHO</span>
              </div>
              <div className="w-[80%] mb-11 flex justify-between text-lg">
                <span className="text-slate-600">Total cost</span>
                <span className=" w-[40%]">100 $</span>
              </div>
              <button
                onClick={() => {
                  window.open(
                    "https://sepolia.etherscan.io/tx/0xf8abafc1233ac1146251d711bea618243906657d9ad38dad3b3269a64ffaa7b0"
                  );
                }}
                className="border-white border-2 w-[200px] rounded-xl p-3 text-lg hover:bg-black "
              >
                view on etherscan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bridge;
