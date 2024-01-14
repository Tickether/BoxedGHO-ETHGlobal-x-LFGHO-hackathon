import React from "react";
import { ConnectKitButton } from "connectkit";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  return (
    <div className=" flex w-[100vw]  p-3   text-white justify-center">
      <div className="h-fit flex flex-row border-2 border-solid border-whtie max-w-[1200px] justify-between backdrop-blur-sm items-center  w-[80vw] p-3 rounded-2xl ">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="flex cursor-pointer justify-start font-bold items-center text-2xl "
        >
          <span className="text-4xl">📦</span>
          BoxedGHO
        </div>
        <div className="flex flex-row font-mono text-2xl gap-10">
          <button
            className=" hover:border-b-4 cursor-pointer border-white "
            onClick={() => {
              router.push("/account");
            }}
          >
            Account
          </button>
          <button
            className=" hover:border-b-4 cursor-pointer border-white "
            onClick={() => {
              router.push("/history");
            }}
          >
            History
          </button>
        </div>
        <ConnectKitButton />
      </div>
    </div>
  );
};

export default Navbar;
