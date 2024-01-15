"use client";
import Navbar from "@/components/navbar/Navbar";
import Send from "@/components/send/Send";
import { useState } from "react";
export default function Account() {
  const [openSendModal, setOpenSendModal] = useState<boolean>(false);
  const [openReciveModal, setOpenReciveModal] = useState<boolean>(false);
  const [openBuyModal, setOpenBuyModal] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center  bg-gradient-to-r from-slate-900 to-slate-700">
      <Navbar />
      <div className="text-white w-[700px] rounded-2xl h-[80vh] bg-slate-800 shadow-sm shadow-blue-500 gap-24 flex flex-col justify-center items-center mt-[20px]">
        <div className="w-[400px]  font-semibold flex justify-between items-center">
          <span className="text-xl">Balance</span>
          <button className="border-2 p-3 flex items-center rounded-2xl hover:bg-slate-700  border-solid font-semibold text-l border-white">
            💳 Buy GHO
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-6xl ">
            <span>0</span>
            <span>GHO</span>
          </p>
          <p className="text-center">
            <span>0</span>
            <span>USD</span>
          </p>
        </div>
        <div className="flex min-w-[400px]  text-xl gap-5 justify-center">
          <button
            onClick={() => {
              setOpenSendModal(true);
            }}
            className="border-2 p-3 rounded-2xl hover:bg-slate-700  border-solid font-semibold text-l border-white"
          >
            ↗️ Send
          </button>
          <button className="border-2 p-3 rounded-2xl hover:bg-slate-700  border-solid font-semibold text-l border-white">
            ↘️ Receive
          </button>
        </div>
      </div>
      {openSendModal && <Send setOpenSendModal={setOpenSendModal} />}
    </main>
  );
}
