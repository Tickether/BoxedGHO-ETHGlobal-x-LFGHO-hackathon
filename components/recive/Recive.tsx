import React, { useState } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import { toast, ToastContainer } from "react-toastify";
interface BuyGHOProps {
  setOpenReciveModal: (openSendModal: boolean) => void;
}
import { useAccount } from "wagmi";
const BuyGHO = ({ setOpenReciveModal }: BuyGHOProps) => {
  const { address } = useAccount();
  const [copy, setCopy] = useState<boolean>(false);
  const Success = () =>
    toast("Copied...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  return (
    <div className="fixed  text-white flex flex-col w-screen backdrop-blur-2xl h-screen items-center justify-center top-0 left-0 right-0 bottom-0  bg-gradient-to-r from-slate-900 to-slate-700">
      <button
        className="   w-[80%]  flex justify-end"
        onClick={() => {
          setOpenReciveModal(false);
        }}
      >
        <Image src="/cancel.svg" alt="doggy" width={50} height={50} />
      </button>

      {/* Main Card */}
      <div className="w-fit  max-w-[500px]  px-5 mt-11 rounded-lg flex-col   gap-5   flex items-start justify-center bg-slate-900 shadow-sm shadow-blue-500 h-fit ">
        <span className="text-center w-full mt-3 text-2xl font-sans border-b-[1px] pb-3 border-blue-600">
          Receive Assets
        </span>
        <span className="h-fit w-full bg-slate-400 py-2 px-3 rounded-xl">
          sepolia network - only send sepolia assets to this social account
        </span>
        <span className="text-sm">
          This is the address of your Social Account. Deposit funds by scanning
          the QR code or copying the address below. Only send Sepolia Network
          Tokens to this address
        </span>
        <div className="w-full bg-transparent flex justify-center">
          {" "}
          <div className=" bg-white p-[16px]">
            {address ? (
              <QRCode value={address} className="h-[100px] w-[100px]" />
            ) : (
              "please connect your wallet"
            )}
          </div>
        </div>

        <div className="group flex mb-5 w-full    justify-center relative  gap-3 items-center flex-col">
          <div className="w-full text-sm gap-2 p-3 rounded-lg bg-slate-700 items-center flex justify-center">
            {address}
            <button
              onClick={() => {
                if (address) {
                  navigator.clipboard.writeText(address);
                  setCopy(true);
                  Success();
                }
              }}
              className="h-6 border-[1px]  hover:shadow-2xl bg-white  shadow-blue-700  rounded-lg  font-semibold px-2"
            >
              <Image
                src="/copy.svg"
                width={13}
                height={13}
                alt="copy"
                className=""
              />
            </button>
          </div>
          <span className="invisible  w-full flex justify-end    group-hover:visible opacity-0 group-hover:opacity-100 transition">
            <span className="bg-white  px-3 py-2 mr-5 rounded-lg text-black">
              {copy ? "copied" : "copy to clipboard"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BuyGHO;
