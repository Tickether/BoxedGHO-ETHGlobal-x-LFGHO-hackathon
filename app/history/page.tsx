"use client";
import Navbar from "@/components/navbar/Navbar";
import { useGetBridges } from "@/hooks/useGetBridges";
import { useGetRamps } from "@/hooks/useGetRamps";
import { useAccount } from "wagmi";

export default function History () {

  const { address, isConnected } = useAccount()   
  
  const { ramps, loadingRamps, getBackRamps } = useGetRamps(address!)
  console.log(ramps)

  const { bridges, loadingBridges, getBackBridges } = useGetBridges(address!)
  console.log(bridges)

  return (
    <div className="flex flex-col justify-start min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 text-4xl text-white items-center">
      <Navbar />
      <div className="my-[10%]">Coming Soon...</div>
    </div>
  );
};
