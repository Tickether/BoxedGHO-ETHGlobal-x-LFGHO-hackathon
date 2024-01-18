import { Address, encodeFunctionData, parseUnits } from 'viem';
import { erc20ABI, writeContract, readContract } from '@wagmi/core';
import { usePrepareSendUserOperation, useSendUserOperation } from '@zerodev/wagmi';





// Prepare the tx

// Wait on the status of the tx
/*
useWaitForTransaction({
  hash: data?.hash,
  enabled: !!data,
  onSuccess(data) {
      console.log("Transaction was successful.")
  }
})
*/
export const approveToken = async ({
  token,
  spender,
  amount,
}: {
  token: Address;
  spender: Address;
  amount: bigint;
}) => {
  try {
    const calldata = encodeFunctionData({
      abi: erc20ABI,
      functionName: 'approve',
      args: [ (spender), (amount) ]
    })
    const { config, error } = usePrepareSendUserOperation({
      to: token,// gho token
      data: calldata,
      value: 0,
    })
    console.log(config)
    const { sendUserOperation, data } = useSendUserOperation(config);
    console.log(data)
    sendUserOperation!()
    return data?.hash;
  } catch (e) {
    console.log(e);
  }
};

export const getAllowance = async ({
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