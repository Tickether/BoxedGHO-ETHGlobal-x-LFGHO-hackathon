import React, { useState } from "react";
import Image from "next/image";
import SendToYourself from "./SendToYourself";
import { useAccount, useBalance, useNetwork } from "wagmi"
import { configureChains, mainnet } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'

interface SendProps {
  setOpenSendModal: (openSendModal: boolean) => void;
}

function Send({ setOpenSendModal }: SendProps) {
  const { address } = useAccount()
  const { chain } = useNetwork();
  const { publicClient } = configureChains([chain || mainnet], [publicProvider()])

  const [forOthers, setForOthers] = useState<boolean | null>(null)
  const [progress, setProgress] = useState<string>("20%");
  return (
    <main className=" fixed flex flex-col w-screen bg-opacity-7 h-screen items-center justify-center top-0 left-0 right-0 bottom-0  bg-gradient-to-r from-slate-900 to-slate-700">
      <button
        className="   w-[80%] flex justify-end"
        onClick={() => {
          setOpenSendModal(false);
        }}
      >
        <Image src="/cancel.svg" alt="doggy" width={50} height={50} />
      </button>

      <div
        className={
          forOthers == null
            ? "flex w-[60%] flex-col  justify-between "
            : "hidden"
        }
      >
        {/* main card  */}
        <div className="w-full h-[80vh] flex shadow-2xl bg-slate-900  justify-around items-center border-solid border-1 border-white ">
          <div className="flex flex-col gap-5">
            <Image src="/payment.svg" alt="doggy" width={300} height={300} />
            <span className=" pl-4 text-4xl font-sans font-bold text-white">
              New Transaction
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-2xl font-sans text-white font-medium">
              🪙 convert GHO for
            </span>
            <div
              onClick={() => {
                setForOthers(false);
                setProgress("40%");
              }}
              className="pl-4 text-xl hover:bg-gradient-to-r from-slate-600 to-slate-800  bg-slate-700 font-sans font-bold cursor-pointer flex justify-center items-center shadow-2xl w-[300px] py-3 rounded-3xl text-white"
            >
              🧑🏼‍🦰 your account
            </div>
            <div
              onClick={() => {
                setForOthers(true);
                setProgress("40%");
              }}
              className="pl-4 text-xl  hover:bg-gradient-to-r from-slate-600 to-slate-800  bg-slate-700  font-sans font-bold cursor-pointer flex justify-center items-center shadow-2xl w-[300px] py-3 rounded-3xl text-white"
            >
              🎁 other account
            </div>
          </div>
        </div>
        {/* progress bar  */}
        <div className="w-full bg-gray-200 rounded-full  h-2.5 ">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: "20%" }}
          />
        </div>
      </div>
      <div
        className={
          forOthers !== null
            ? "w-full h-[80vh] flex   justify-around items-center "
            : "hidden"
        }
      >
        <SendToYourself connectedAddress={address!} publicClient={publicClient} forOthers={forOthers}/>
      </div>
    </main>
  );
}

export default Send;
