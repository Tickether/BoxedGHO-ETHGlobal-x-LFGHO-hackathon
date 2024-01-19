import { BoxActionResponse, ChainId, EvmTransaction, TokenInfo } from "@decent.xyz/box-common";
import { usePrepareSendUserOperation, useSendUserOperation } from "@zerodev/wagmi";
import { Address, Chain, Hex, encodeFunctionData, zeroAddress } from "viem";
import { erc20ABI, readContract } from '@wagmi/core';
import { toast } from "react-toastify";
import { switchNetwork } from "@wagmi/core";
import { generateDecentAmountInParams, generateDecentAmountOutParams } from "@/helpers/generateDecentParams";
import { useWaitForTransaction } from "wagmi";

export const useApproveExecuteOp = ({
    srcChain,
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

    const defaultTx = {
        to: undefined, // bridge
        data: undefined,
        value: undefined,
    }

    const tx = actionResponse ? actionResponse?.tx as EvmTransaction : defaultTx

    

    //execute
    const prepareExecuteUserOp = usePrepareSendUserOperation({
        to: tx.to, // bridge
        data: tx.data,
        value: tx.value,
    })
    console.log(prepareExecuteUserOp.config)
    const exucuteUserOp = useSendUserOperation(prepareExecuteUserOp.config);

    // Wait on the status of the tx
    
    useWaitForTransaction({
        hash: approvalUserOp.data?.hash,
        enabled: !!approvalUserOp.data,
        onSuccess(data) {
            console.log("Approval was successful.")
        }
    })
    useWaitForTransaction({
        hash: exucuteUserOp.data?.hash,
        enabled: !!exucuteUserOp.data,
        onSuccess(data) {
            console.log("Approval was successful.")
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
                
                        // old stuff replaced hash
                        setSubmitting?.(false);
                        setHash?.(exucuteUserOp.data?.hash!);
 
                    } else if (
                        amountApproved >= (actionResponse?.tokenPayment?.amount || BigInt(0))
                    ) {

                        //send tx as from zerodev0
                        exucuteUserOp.sendUserOperation!()
                        console.log(exucuteUserOp.data)
                
                        // old stuff replaced hash
                        setSubmitting?.(false);
                        setHash?.(exucuteUserOp.data?.hash!);
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