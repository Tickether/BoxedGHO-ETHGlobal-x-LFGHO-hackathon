import { ghoTokenMain } from "@/helpers/constants";
import { BoxActionContext } from "@/helpers/contexts/decentActionContext";
import { RouteSelectContext } from "@/helpers/contexts/routeSelectContext";
import { confirmRoute, executeTransaction } from "@/helpers/executeTransaction";
import { useBalance } from "@/helpers/hooks/useBalance";
import { useAmtInQuote, useAmtOutQuote } from "@/helpers/hooks/useSwapQuotes";
import { roundValue } from "@/helpers/roundValue";
import useDebounced from "@/helpers/useDebounced";
import { ChainId, TokenInfo } from "@decent.xyz/box-common";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Hex, isAddress, zeroAddress } from "viem";
import { useNetwork } from "wagmi";
import ChainSelectMenu from "../boxComps/ChainSelectorMenu";
import TokenSelectorComponent from "../boxComps/TokenSelectorComponent";
import { toast } from "react-toastify";
import Image from "next/image";



const SendToYourself = ({ connectedAddress, publicClient, forOthers }: any) => {

  const { routeVars, updateRouteVars } = useContext(RouteSelectContext);
  const {
    setBoxActionArgs,
    boxActionResponse: { actionResponse },
  } = useContext(BoxActionContext);

  const { chain } = useNetwork();

  const [showContinue, setShowContinue] = useState(true);
  const [hash, setHash] = useState<Hex>();

  const [payAddress, setPayAddress] = useState<`0x${string}`>(zeroAddress);
  const [pastedAddress, setPastedAddress] = useState<string>('');

  const { dstChain, dstToken } = routeVars;
  const srcToken = routeVars.srcToken;
  const srcChain = routeVars.srcChain;

  const setSrcChain = (c: ChainId) => updateRouteVars({ srcChain: c });
  const setSrcToken = (t: TokenInfo) => updateRouteVars({ srcToken: t });

  useEffect(() => {
    updateRouteVars({
      srcChain: ChainId.ETHEREUM,
      srcToken: ghoTokenMain,
    });
  },[srcChain, srcToken, updateRouteVars]);

  //use wamgi useBalance here instead
  const { nativeBalance: srcNativeBalance, tokenBalance: srcTokenBalance } =
    useBalance(connectedAddress, srcToken);
  const srcTokenBalanceRounded = roundValue(srcTokenBalance, 2) ?? 1;

  const [submitting, setSubmitting] = useState(false);
  const [submitErrorText, setSubmitErrorText] = useState("");

  const handleSrcAmtChange = (strVal: string) => {
    if (strVal == "") {
      setSrcInputVal("");
      return;
    }

    if (!/^\d*\.?\d*$/.test(strVal)) return;
    setSrcInputVal(strVal);
    setDstInputVal(null);
    overrideDebouncedDst(null);
    setSubmitErrorText("");
  };

  const handleDstAmtChange = (strVal: string) => {
    if (!/^\d*\.?\d*$/.test(strVal)) return;
    setDstInputVal(strVal);
    setSrcInputVal(null);
    overrideDebouncedSrc(null);
    // setSubmitErrorText('');
  };

  const [srcInputVal, setSrcInputVal] = useState<string | null>(null);
  const [dstInputVal, setDstInputVal] = useState<string | null>(null);

  const [srcInputDebounced, overrideDebouncedSrc] = useDebounced(srcInputVal);
  const [dstInputDebounced, overrideDebouncedDst] = useDebounced(dstInputVal);

  const srcDebounceWaiting = srcInputDebounced != srcInputVal;
  const dstDebounceWaiting = dstInputDebounced != dstInputVal;

  const {
    isLoading: amtOutLoading,
    errorText: amtOutErrorText,
    fees: amtOutFees,
    tx: amtOutTx,
    srcCalcedVal,
  } = useAmtOutQuote(dstInputDebounced, dstToken, srcToken, srcChain);

  const {
    isLoading: amtInLoading,
    errorText: amtInErrorText,
    fees: amtInFees,
    tx: amtInTx,
    dstCalcedVal,
  } = useAmtInQuote(srcInputDebounced, dstToken, srcToken, srcChain);

  const srcDisplay = srcCalcedVal ?? srcInputVal ?? "";
  const dstDisplay = dstCalcedVal ?? dstInputVal ?? "";
  console.log(dstInputDebounced)
  useEffect(() => {
    const srcNum = Number(srcDisplay);
    if (srcNum > srcTokenBalance) {
      setSubmitErrorText(
        "Insufficient funds. Try onramping to fill your wallet.",
      );
    } else {
      setSubmitErrorText("");
    }
  }, [srcTokenBalance, srcDisplay]);

  const srcSpinning = amtOutLoading || dstDebounceWaiting;
  const dstSpinning = amtInLoading || srcDebounceWaiting;

  const continueDisabled =
    !!submitErrorText ||
    !!amtOutErrorText ||
    !!amtInErrorText ||
    !chain ||
    srcSpinning ||
    dstSpinning ||
    !(Number(srcInputDebounced) || Number(dstInputDebounced)) ||
    submitting;
  
  const confirmDisabled = !actionResponse?.tx;

  useEffect(()=>{
    if (forOthers) {
      setPayAddress(`0x${pastedAddress}`!)
    } else {
      setPayAddress(connectedAddress!)
    }
  }, [pastedAddress, connectedAddress, forOthers])

  const handlePaste = async () => {
    const clipboardText = await navigator.clipboard.readText();
    if (isAddress(clipboardText)) {
      setPastedAddress(clipboardText);
    } else {
      //toast 
      const NotAddress = () =>
        console.log('jhjgjhgj')
        toast("Please Paste Valid Address...", {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };
  const handleClearInput = () => {
    setPastedAddress('')
  };

  return (
    <main className="w-[60%] h-full items-start mt-4 flex justify-around">
      <div className="bg-slate-900 w-[60%] flex h-fit flex-col pt-10  shadow-sm shadow-blue-500   items-center  rounded-2xl">
        <div className="p-3 text-white text border-b-[1px] w-full text-2xl border-gray-300">
          Convert GHO
        </div>
        <div className="p-3 m-3  w-full h-[60%] ">
          {/* Input GHO Part */}
          <div className="flex items-center border-b-[1px] pb-5 gap-2 p-1 h-[50%]">
            <span className="text-white text-sm"> Enter GHO Amount</span>
            <input
              className="text-blue-300 bg-slate-800 border-none w-[50%] p-2 h-11 focus:outline-none"
              type="text"
              value={srcDisplay}
              onChange={(e) => handleSrcAmtChange(e.target.value)}
              disabled={srcSpinning || submitting}
              placeholder="0"
            />
            <button className="border-[1px] text-white h-11 w-[20%] rounded-lg hover:bg-slate-500 px-3">
              Max
            </button>
            <span className="flex text-white border-[1px] h-11 justify-center rounded-lg items-center w-[30%]">
            {srcTokenBalanceRounded}/GHO
            </span>
          </div>

          {/* Coin and  Chain Selection  */}
          <div className="w-full h-[50%] border-b-[1px]  items-center py-8 gap-5 justify-center flex">
            {/* Respons / How Much you get */}
            <div className=" w-full   flex flex-col justify-center items-center px-3">
              <span className="flex text-white justify-start w-full">Receving amount</span>
              {dstSpinning && (
                <div className="absolute inset-0 rounded load-shine opacity-75" />
              )}
              <input
                className="text-blue-300 bg-slate-800 w-full flex items-center px-4 h-11 focus:outline-none"
                type="text"
                value={dstDisplay}
                onChange={(e) => handleDstAmtChange(e.target.value)}
                disabled={dstSpinning || submitting}
                placeholder="0"
              />
            </div>
            <div className="flex text-white flex-col w-[50%]">
              <span>Select Token</span>
              <TokenSelectorComponent
                chainId={dstChain}
                selectedToken={dstToken}
                onSelectToken={(t) => {
                  updateRouteVars({ dstToken: t });
                  setShowContinue(true);
                }}
              />
            </div>
            <div className="flex text-white flex-col w-[50%]">
              <span>Select Chain</span>
              <ChainSelectMenu
                chainId={dstChain}
                onSelectChain={(c) => {
                  updateRouteVars({ dstChain: c });
                  setShowContinue(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 py-4 px-2 text-sm">
          {srcInputDebounced &&
            amtInFees &&
            Object.keys(amtInFees).map((feeName) => (
              <Fragment key={feeName}>
                <div className="text-blue-300">{feeName}</div>
                <div className="text-white text-right">{amtInFees[feeName]}</div>
              </Fragment>
            ))}

          {dstInputDebounced &&
            amtOutFees &&
            Object.keys(amtOutFees).map((feeName) => (
              <Fragment key={feeName}>
                <div>{feeName}</div>
                <div className="text-right">{amtOutFees[feeName]}</div>
              </Fragment>
            ))}
        </div>
        <div className="text-red-500">{submitErrorText}</div>
        <div className={` ${submitErrorText !='' ? 'mt-auto w-[96%] pt-5 border-b-[1px] border-white' : 'mt-auto'}`}></div>
        <div className="flex w-full h-full justify-between px-3 gap-3 mt-5">
          <div className="flex w-[73%]">
            {
              forOthers 
              ?(
                <>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex gap-2">
                      <label className="text-blue-800">Paste Pay Address</label>
                      {
                        pastedAddress!.length >= 1 
                        ? (
                          <div className="cursor-pointer" onClick={handleClearInput}>
                            <Image src='/clear.svg' alt='' width={23} height={23} />
                          </div>
                        )
                        : (
                          <div className="cursor-pointer" onClick={handlePaste}>
                            <Image src='/copy.svg' alt='' width={23} height={23} />
                          </div>
                        )
                      }
                    </div>
                    <input
                      className="text-blue-300 w-full h-11 text-center"
                      required
                      placeholder={zeroAddress}
                      value={pastedAddress!}
                      onPaste={handlePaste}
                      disabled
                    />
                    
                  </div>
                </>
              )
              :(
                <></>
              )
            }
          </div>
          <div className={`flex h-full  w-[27%] ${forOthers ? 'mt-6' : 'mt-0'}`}>
          {showContinue ? (
            <button
              className={
                `${continueDisabled ? 'bg-gray-300 text-gray-600 ' : 'bg-black text-white '}` +
                "border-2 flex p-3 rounded-2xl hover:bg-green-500 hover:text-black border-solid font-semibold text-l border-white text-center"
              }
              onClick={() => confirmRoute({
                chain: chain!,
                srcChain,
                srcToken,
                dstToken,
                setBoxActionArgs,
                updateRouteVars,
                srcInputVal: srcInputDebounced!,
                dstInputVal: dstInputDebounced!,
                connectedAddress,
                continueDisabled,
                setSubmitting,
                setShowContinue,
                srcDisplay,
                recipient: payAddress //custom receiver
              })}
              disabled={continueDisabled}
            >
              Confirm Selections
            </button>
          ) : (
            <button
              className={
                `${confirmDisabled ? 'bg-gray-300 text-gray-600 ': 'bg-primary text-white '}` +
                "text-center font-medium" +
                " w-full rounded-lg p-2 mt-4" +
                " relative flex items-center justify-center"
              }
              disabled={confirmDisabled}
              onClick={() => executeTransaction({
                actionResponse,
                setSubmitting,
                setHash,
                setShowContinue,
                publicClient,
                connectedAddress, 
                srcChain: chain?.id!,
              })}
            >
              Swap
              {submitting && <div className="absolute right-4 load-spinner"></div>}
            </button>
          )}
          </div>
        </div>
        <div className="flex items-end w-[95%] justify-center mt-10 mb-2 h-full">
          {/* progress bar  */}
          <div className="w-full bg-gray-200 rounded-full  h-2.5 ">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "45%" }}
            />
          </div>
        </div>
      </div>

      {/* Transaction Status Card */}
      <div className="bg-slate-900 h-[60%]  flex flex-col justify-center items-center  rounded-2xl shadow-sm shadow-blue-500  w-[35%]">
        <div className="p-4 mt-4">
          <h1 className="text-2xl text-center font-semibold mb-6">
            Transaction Status
          </h1>
          <div className="container">
            <div className="flex flex-col  grid-cols-12 text-gray-50">
              <div className="flex ">
                <div className="col-start-2 col-end-4   relative">
                  <div className="h-full w-3 flex items-center justify-center">
                    <div className="h-full w-[2px] bg-green-500 pointer-events-none" />
                  </div>
                  <div className="w-3 h-3  absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
                    <i className="fas fa-check-circle text-white" />
                  </div>
                </div>
                <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md mx-3">
                  <h3 className="font-semibold text-m mb-1">proccessing</h3>
                </div>
              </div>
              <div className="flex ">
                <div className="col-start-2 col-end-4   relative">
                  <div className="h-full w-3 flex items-center justify-center">
                    <div className="h-full w-[2px] bg-green-500 pointer-events-none" />
                  </div>
                  <div className="w-3 h-3 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
                    <i className="fas fa-check-circle text-white" />
                  </div>
                </div>
                <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md mx-3">
                  <h3 className="font-semibold text-m mb-1">Executed</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SendToYourself;
