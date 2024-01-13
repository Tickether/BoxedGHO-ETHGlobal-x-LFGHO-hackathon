import ConnectKit from "@/components/connectKit/ConnectKit";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
export default function Home() {
  return (
    <main className="flex min-h-screen item-center  w-[100vw] flex-col bg-[#232423]">
      <Navbar />
      <div className="text-white h-[80vh] flex flex-row justify-center items-center  ">
        <div className="max-w-[500px] flex flex-col  gap-9 ">
          <div className="text-6xl font-semibold"> Easy, Fast & Secure</div>
          <div>Convert , send Online Money Fast With BoxedGHO</div>
          <div>
            <button className="border-2 p-3 rounded-2xl hover:bg-white hover:text-black border-solid font-semibold text-xl border-white">
              Lets'Start
            </button>
          </div>
        </div>
        <Image src="/doggyonthebox.png" alt="doggy" width={450} height={450} />
      </div>
    </main>
  );
}
