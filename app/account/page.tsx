"use client";
import Navbar from "@/components/navbar/Navbar";

export default function Account() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-r from-slate-900 to-slate-700">
      <Navbar />
      <div className="text-white w-full  gap-24 flex flex-col justify-center items-center mt-[20px]">
        <div className="w-[400px]  font-semibold flex justify-between">
          <span className="text-xl">Balance</span>
          <button className="border-2 p-3 rounded-2xl hover:bg-white hover:text-black border-solid font-semibold text-l border-white">
            Buy GHO
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
          <button className="border-2 p-3 rounded-2xl hover:bg-white hover:text-black border-solid font-semibold text-l border-white">
            ↗️ Send
          </button>
          <button className="border-2 p-3 rounded-2xl hover:bg-white hover:text-black border-solid font-semibold text-l border-white">
            ↘️ Receive
          </button>
        </div>
      </div>
    </main>
  );
}
