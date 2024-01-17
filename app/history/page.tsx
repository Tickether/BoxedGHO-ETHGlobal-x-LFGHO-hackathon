"use client";
import Navbar from "@/components/navbar/Navbar";
import { useGetBridges } from "@/hooks/useGetBridges";
import { Ramp, useGetRamps } from "@/hooks/useGetRamps";
import { useAccount } from "wagmi";
import { useState } from "react";
import OnRamp from "@/components/historyComps/OnRamp";
import Bridge from "@/components/historyComps/Bridge";
import Image from "next/image";
export default function History() {
  const { address, isConnected } = useAccount();
  const [toggle, setToggle] = useState<boolean>(false);
  const { ramps, loadingRamps, getBackRamps } = useGetRamps(address!);
  console.log(ramps);

  const { bridges, loadingBridges, getBackBridges } = useGetBridges(address!);
  console.log(bridges);

  return (
    <div className="flex flex-col justify-start min-h-screen bg-gradient-to-r text-white  from-slate-900 to-slate-700 text-4xl  items-center">
      <Navbar />
      <div className="h-[80%] mt-[3%] w-[70%]">
        <span className="text-4xl py-5 mt-11">Transaction History</span>
        <div className=" flex items-center justify-around h-10 gap-8 my-11 ">
          <div className="w-[300px] p-3 flex justify-center items-center gap-5  rounded-2xl bg-slate-900 ">
            <span
              onClick={() => {
                setToggle(false);
              }}
              className={`${
                toggle ? "text-xl" : "text-2xl border-b-4 border-blue-700"
              } cursor-pointer pb-1`}
            >
              Bridge
            </span>

            <span
              onClick={() => {
                setToggle(true);
              }}
              className={`${
                !toggle ? "text-xl" : "text-2xl border-b-4 border-blue-700"
              } cursor-pointer pb-1`}
            >
              Onramp
            </span>
          </div>
        </div>
        {toggle ? (
          ramps?.length != 0 ? (
            ramps?.map((items: Ramp, index: number) => {
              return <OnRamp key={index} data={items} />;
            })
          ) : (
            <div className="flex text-4xl gap-5 justify-center mt-[15vh]">
              <Image src="/history.svg" alt="doggy" width={150} height={150} />
              <div className="flex text-slate-400 justify-center pt-6 items-start h-[100px] flex-col ">
                <span className="text-4xl">You {`don't`} have </span>
                <span className="text-4xl">any Onramp History</span>
              </div>
            </div>
          )
        ) : bridges?.length != 0 ? (
          bridges?.map((items: Bridge, index: number) => {
            return <Bridge BridgeData={items} key={index} />;
          })
        ) : (
          <div className="flex text-4xl gap-5 justify-center mt-[15vh]">
            <Image src="/history.svg" alt="doggy" width={150} height={150} />
            <div className="flex text-slate-400 justify-center pt-6 items-start h-[100px] flex-col ">
              <span className="text-4xl">You {`don't`} have </span>
              <span className="text-4xl">any Bridge History</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
