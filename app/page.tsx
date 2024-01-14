"use client";
import ConnectKit from "@/components/connectKit/ConnectKit";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen item-center  w-[100vw] flex-col bg-gradient-to-r from-slate-900 to-slate-700">
      <Navbar />

      <div className="text-white h-[80vh] flex flex-row justify-center items-center  ">
        <div className="max-w-[500px] flex flex-col  gap-9 ">
          <div className="text-6xl font-semibold"> Easy, Fast & Secure</div>
          <div className="text-xl">
            Convert, Send GHO Cross-Chain Fast w/ BoxedGHO
          </div>
          <div>
            <button
              onClick={() => {
                router.push("/account");
              }}
              className="border-2 p-3 cursor-pointer rounded-2xl hover:bg-white hover:text-black border-solid font-semibold text-xl border-white"
            >
              {`Let's Start`}
            </button>
          </div>
        </div>
        <Image src="/doggyontheboxL.png" alt="doggy" width={450} height={450} />
      </div>
    </main>
  );
}
