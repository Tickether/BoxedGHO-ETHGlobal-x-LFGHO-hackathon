import { BoxActionResponse, ChainId, EvmTransaction, TokenInfo } from "@decent.xyz/box-common";
import { usePrepareSendUserOperation, useSendUserOperation } from "@zerodev/wagmi";
import { Address, Chain, Hex, encodeFunctionData, zeroAddress } from "viem";
import { erc20ABI, readContract } from '@wagmi/core';
import { toast } from "react-toastify";
import { switchNetwork } from "@wagmi/core";
import { generateDecentAmountInParams, generateDecentAmountOutParams } from "@/helpers/generateDecentParams";
import { useWaitForTransaction } from "wagmi";
import { chainNames } from "@/helpers/contexts/routeSelectContext";

export const useApproveExecuteOp = ({
    srcChain,
    dstChain,
    srcToken,
    dstToken,
    setBoxActionArgs,
    updateRouteVars,
    isNative,
    recipient,
    chain,
    srcInputVal,
    dstInputVal,
    continueDisabled,
    srcDisplay,
    dstDisplay,
    contractAddress,
    signature,
    args,
    connectedAddress,
    actionResponse,
    publicClient,
    setSubmitting,
    setHash,
    setShowContinue
  }: {
    srcChain: ChainId,
    dstChain: ChainId,
    srcToken: TokenInfo,
    dstToken: TokenInfo,
    setBoxActionArgs: any,
    updateRouteVars: any,
    isNative?: boolean,
    recipient?: string,
    chain?: Chain,
    srcInputVal?: string,
    dstInputVal?: string,
    continueDisabled?: boolean,
    srcDisplay?: string,
    dstDisplay?:string,
    contractAddress?: Address,
    signature?: string,
    args?: any
    connectedAddress: Address | undefined,
    actionResponse: BoxActionResponse | undefined,
    publicClient: any
    setSubmitting?: (submitting: boolean) => void,
    setHash?: (hash: Hex) => void,
    setShowContinue?: (showContinue: boolean) => void,
  }) => {


    //approve
    const approveCalldata = actionResponse ? encodeFunctionData({
        abi: erc20ABI,
        functionName: 'approve',
        args: [ (actionResponse?.tx.to as Address), (actionResponse?.tokenPayment?.amount || BigInt(0)) ]
    }) : '0xdEAD000000000000000042069420694206942069'
    const prepareApprovalUserOp = usePrepareSendUserOperation({
        to: actionResponse?.tokenPayment?.tokenAddress as Address,// gho token
        data: approveCalldata,
        value: 0,
    })
    console.log(prepareApprovalUserOp.config)
    const approvalUserOp = useSendUserOperation(prepareApprovalUserOp.config);
    console.log(approvalUserOp.data)


    
    //execute
    const defaultTx = {
        to: undefined, // bridge
        data: undefined,
        value: undefined,
    }
    const tx = actionResponse ? actionResponse?.tx as EvmTransaction : defaultTx
    const prepareExecuteUserOp = usePrepareSendUserOperation({
        to: tx.to, // bridge
        data: tx.data,
        value: tx.value,
    })
    console.log(prepareExecuteUserOp.config)
    const exucuteUserOp = useSendUserOperation(prepareExecuteUserOp.config);
    console.log(exucuteUserOp.data)

    const postBridge = async (
        address: string,
        addressTo: string,
        txn: string,
        amountGHO: string,
        amountBridged: string,
        bridgeChain: string,
        bridgeToken: string
    ) => {
        try {
            const res = await fetch("api/postBridge", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
                },
                body: JSON.stringify({
                    address,
                    addressTo,
                    txn,
                    amountGHO,
                    amountBridged,
                    bridgeChain,
                    bridgeToken,
                }),
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
          console.log(error);
        }
    };

    // Wait on the status of the tx
    const waitForExecutedOp = useWaitForTransaction({
        hash: exucuteUserOp.data?.hash,
        confirmations: 1,
        enabled: true,
        onSuccess (data) {
            console.log("Bridge was successful.", data)
            console.log(
                connectedAddress!,
                recipient!,
                exucuteUserOp.data?.hash!,
                srcInputVal!,
                dstDisplay!,
                chainNames[dstChain],
                dstToken.name  
            )
            //set Tx Hash from Executed OP
            if (exucuteUserOp.data?.hash) {
                setHash?.(exucuteUserOp.data?.hash); 
                postBridge(
                    connectedAddress!,
                    recipient!,
                    exucuteUserOp.data?.hash!,
                    srcInputVal!,
                    dstDisplay!,
                    chainNames[dstChain],
                    dstToken.name  
                );
                console.log("Bridge Offchain successful.", data)
            }  
        }
    })


    const getAllowance = async ({
        user,
        token,
        spender,
    }: {
        user: Address;
        spender: Address;
        token: Address;
    }) => {
        return await readContract({
          address: token,
          abi: erc20ABI,
          functionName: 'allowance',
          args: [user, spender],
        });
    };


    const confirmRoute = async () => {
        const toAddress = recipient || connectedAddress;
        const amtOutConfig = signature ? 
        { 
            srcToken,
            dstToken: dstToken,
            dstAmount: dstInputVal,
            connectedAddress,
            toAddress,
            signature,
            args,
            isNative,
            contractAddress
        } : 
        { 
            srcToken,
            dstToken: dstToken,
            dstAmount: dstInputVal,
            connectedAddress,
            toAddress,
        };
        setBoxActionArgs(undefined);
        if (chain?.id !== srcChain) {
          toast.warning('Please switch networks.', {
            position: toast.POSITION.BOTTOM_CENTER
          })
          await switchNetwork({
            chainId: srcChain
          })
          return;
        }
        if (continueDisabled) return;
        setSubmitting?.(true);
        updateRouteVars({
          purchaseName: `${Number(srcDisplay).toPrecision(2)} ${dstToken.symbol}`,
        }); 
        if (srcInputVal) {
            const actionArgs = generateDecentAmountInParams({
                srcToken,
                dstToken: dstToken,
                srcAmount: srcInputVal,
                connectedAddress,
                toAddress,
            });
            setBoxActionArgs(actionArgs);
            setShowContinue?.(false);
            setSubmitting?.(false);
        } else if (dstInputVal) {
            const actionArgs = generateDecentAmountOutParams(amtOutConfig);
            setBoxActionArgs(actionArgs);
            setShowContinue?.(false);
            setSubmitting?.(false);
        } else {
            setSubmitting?.(false);
            toast.error('Error finding route.', {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
    };


    const executeTransaction = async () => {
      
        if (!actionResponse) {
            toast.error('Failed to fetch routes', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        } else {
            setSubmitting?.(true);
            try {
                if (
                    actionResponse?.tokenPayment?.tokenAddress &&
                    actionResponse.tokenPayment.tokenAddress != zeroAddress
                ) {
                    const amountApproved = await getAllowance({
                        user: connectedAddress!,
                        spender: actionResponse.tx.to as Address,
                        token: actionResponse.tokenPayment.tokenAddress as Address,
                    });

                    if (
                        amountApproved < (actionResponse?.tokenPayment?.amount || BigInt(0))
                    )   {
                        approvalUserOp.sendUserOperation!()
                        console.log(approvalUserOp.data)
                        const approveResult = await publicClient({
                            chainId: srcChain,
                        }).waitForTransactionReceipt({ hash: approvalUserOp.data?.hash });
                        console.log('approved!', approveResult);

                        //send tx as from zerodev0
                        exucuteUserOp.sendUserOperation!()
                        console.log(exucuteUserOp.data)
                        
                        return;
                    } else if (
                        amountApproved >= (actionResponse?.tokenPayment?.amount || BigInt(0))
                    ) {

                        //send tx as from zerodev0
                        exucuteUserOp.sendUserOperation!()
                        console.log(exucuteUserOp.data)
                
                        return;
                    }
                }
            } catch (e) {
                toast.error('Error sending transaction.', {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                console.log("Error sending tx.", e);
                setShowContinue?.(true);
                setSubmitting?.(false);
            }
        }
    };

 return { confirmRoute, executeTransaction}
}