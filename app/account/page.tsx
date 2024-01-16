"use client";
import Navbar from "@/components/navbar/Navbar";
import Send from "@/components/send/Send";
import BuyGHO from "@/components/buyGho/BuyGHO";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { GHO_MAINNET } from "@/helpers/constants";
import { getTokenUSD } from "@/utils/getTokenUSD";
export default function Account() {
  const { address, isConnected } = useAccount()   

  const [openSendModal, setOpenSendModal] = useState<boolean>(false);
  const [openReciveModal, setOpenReciveModal] = useState<boolean>(false);
  const [openBuyModal, setOpenBuyModal] = useState<boolean>(false);
  const [tokenRateUSD, setTokenRateUSD] = useState<number | null>(null)

  const GHO = useBalance({
    address: address,
    token: '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60',
    watch: true
  })

  useEffect(()=> {
    const getTokenRateUSD = async () => {
      const TokenRateUSD =await getTokenUSD('ethereum', GHO_MAINNET)
      setTokenRateUSD(TokenRateUSD!)
    }
    getTokenRateUSD()
  })

  return (
    <main className="flex min-h-screen flex-col items-center  bg-gradient-to-r from-slate-900 to-slate-700">
      <Navbar />
      <div className="text-white w-[700px] rounded-2xl h-[80vh] bg-slate-800 shadow-sm shadow-blue-500 gap-24 flex flex-col justify-center items-center mt-[20px]">
        <div className="w-[400px]  font-semibold flex justify-between items-center">
          <span className="text-xl">Balance</span>
          <button
            onClick={() => {
              setOpenBuyModal(true);
            }}
            className="border-2 p-3 flex items-center rounded-2xl hover:bg-slate-700  border-solid font-semibold text-l border-white"
          >
            💳 Buy GHO
          </button>
        </div>
        {
          isConnected 
          ? (<>
              <div className="flex flex-col gap-3">
                <p className="text-6xl gap-2">
                  <span>{GHO.data?.formatted} GHO</span>
                </p>
                <p className="text-center">
                  <span>$ {Number(GHO.data?.formatted) * tokenRateUSD!}</span>
                </p>
              </div>
            </>
          )   
          : (<>
          <div className="flex">
            <p className="text-[23px] text-blue-100">
              Please Connect Wallet w/ Socials
            </p>
          </div>
            </> 
          )
        }
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
      {openBuyModal && <BuyGHO setOpenBuyModal={setOpenBuyModal} />}
    </main>
  );
}
