import React, { useEffect, useState } from "react";
import Image from "next/image";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { sellGHO } from "@/utils/useSellGHO";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { ZeroDevWeb3Auth } from '@zerodev/web3auth';
import { getTokenUSD } from "@/utils/getTokenUSD";
import { GHO_MAINNET } from "@/helpers/constants";

interface BuyGHOProps {
  setOpenBuyModal: (openSendModal: boolean) => void;
}
const BuyGHO = ({ setOpenBuyModal }: BuyGHOProps) => {
  const { address, isConnected } = useAccount()   
  const [ghoamount, setGhoamount] = useState<string>('');
  const [email, setEmail] = useState<string | null>(null);
  const [tokenRateUSD, setTokenRateUSD] = useState<number | null>(null);
  
  const getEmail = async () => {
    const zeroDevWeb3Auth = ZeroDevWeb3Auth.getInstance(['<project-id>'])
    const userInfo =  await zeroDevWeb3Auth.getUserInfo()
    const email = userInfo?.email
    setEmail(email!)
  }
  console.log(email)
  useEffect(()=>{
    if (isConnected) {
      getEmail()
    }
  })
  

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_TEST_KEY,
    tx_ref: `${'USD-GHO'}${Date.now()}`, //currency x timestaamp/datestamp
    amount: Number(ghoamount) + (Number(ghoamount) * 0.06),
    currency: 'USD',
    payment_options: 'card',
    customer: {
      email: email!,
      phone_number: '',
      name: '',
    },
    customizations: {
      title: 'BoxedGHO',
      description: 'Box GHO to any recipient chain/token',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/projects%2Fdva30%2Fimages%2Fdoggyonthebox_2.png',
    },
  }
  const handleFlutterPayment = useFlutterwave(config)
  const doPayUSD = () => {
    if (Number(ghoamount) > 0 && email != null) {
      handleFlutterPayment({
        callback: (response) => {
          console.log(response)
          if (response.status == 'successful') {
            //amount GHO sent to smart address
            handleSellGHO()
          }
          closePaymentModal() // this will close the modal programmatically
          setOpenBuyModal(false)
        },
        onClose: () => {  
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        },
      })
    }
  }
  const handleSellGHO = async() => {
    const amountParsed = parseUnits(String(ghoamount)!, 18)
    const txnHash = await sellGHO(amountParsed!, `0x${address!.slice(2)}`)
    return txnHash
  }

  useEffect(()=> {
    const getTokenRateUSD = async () => {
      const TokenRateUSD =await getTokenUSD('ethereum', GHO_MAINNET)
      setTokenRateUSD(TokenRateUSD!)
    }
  getTokenRateUSD()
  },[ghoamount])

  return (
    <div className="fixed  text-white flex flex-col w-screen backdrop-blur-2xl h-screen items-center justify-center top-0 left-0 right-0 bottom-0  bg-gradient-to-r from-slate-900 to-slate-700">
      <button
        className="   w-[80%]  flex justify-end"
        onClick={() => {
          setOpenBuyModal(false);
        }}
      >
        <Image src="/cancel.svg" alt="doggy" width={50} height={50} />
      </button>

      {/* Main Card */}
      <div className="w-fit   px-5 mt-11 rounded-lg flex-col   gap-5   flex items-start justify-center bg-slate-900 shadow-sm shadow-blue-500 h-fit ">
        <div className="w-full mb-5">
          <span className="flex justify-center w-full mt-5 text-2xl">
            {" "}
            🛒 Buy GHO{" "}
          </span>
          <span className="text-md  flex justify-center w-full font-sans font-normal">
            Pay w/ credit , debit card or bank account
          </span>
        </div>
        <div className=" shadow-sm shadow-white rounded-lg p-3 flex flex-col ">
          <div className="flex w-full mb-5 border-b-[1px] flex-col">
            <span className="py-1 text-[12px] ">Buy</span>

            <div className="flex">
              <span className="text-4xl font-sans">
                $ {""}
                <input
                  type="text"
                  className="bg-transparent border-none focus:outline-none text-4xl font-sans h-11"
                  placeholder="0"
                  value={ghoamount}
                  onChange={(e) => {
                    // Allow only positive integers
                    const regex = /^[1-9]\d*$/;
                    if (regex.test(e.target.value) || e.target.value === '') {
                      setGhoamount((e.target.value));
                    }
                    
                  }}
                />
              </span>
            </div>
          </div>
          <div>
            <span className="text-[13px]">Receive</span>
            <div className="w-full h-13 bg-transparent font-sans font-lighter flex flex-col rounded-md ">
              <span className="text-4xl">{ghoamount == "" ? 0 : (Number(ghoamount) * tokenRateUSD!) } <span className="text-blue-300">GHO</span></span>
              <span className="text-[10px] pt-2 text-blue-600">1 GHO = ${tokenRateUSD!}</span>
            </div>
          </div>
        </div>
        <div className=" w-full  px-3 flex justify-between">
          <span>Fees</span>
          <span className="text-blue-300">6%</span>
        </div>
        <div className=" w-full  px-3 flex justify-between">
          <span>Total</span>
          <span className="text-blue-300">$ {ghoamount == '' ? '0' : Number(ghoamount) + (Number(ghoamount) * 0.06)}</span>
        </div>
        <div className="w-full flex justify-center mt-11 pb-11">
          <button 
            className="border-[1px] w-[80%] text p-3  rounded-lg hover:bg-green-300 font-sans font-semibold"
            onClick={doPayUSD}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyGHO;
