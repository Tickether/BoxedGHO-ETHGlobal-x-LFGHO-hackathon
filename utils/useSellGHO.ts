import { BaseError, ContractFunctionRevertedError, encodeFunctionData } from 'viem';
import { client, publicClient } from './client'
import { facilitateGHOABI } from './abis/FacilitateGHOABI';

export const sellGHO = async(amount: bigint, to: `0x${string}`) => {
    try {
        const data = encodeFunctionData({
            abi: facilitateGHOABI,
            functionName: 'sellGHO',
            args: [ (amount), (to)]
        })
        const hash = await client.sendTransaction({
            data: data,
            to: '0x11DC650f09138b3F569A75FB9abAC934A1C25e4d', //GHO Seller
            value: BigInt(0)
        })
        console.log(hash!)
        const transaction = await publicClient.waitForTransactionReceipt( 
            { hash: hash }
        )
        console.log(transaction.status)
        if (transaction.status == 'success') {
            return hash
        }
    } catch (err) {
        if (err instanceof BaseError) {
            const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
            if (revertError instanceof ContractFunctionRevertedError) {
                const errorName = revertError.data?.errorName ?? ''
                // do something with `errorName`
                console.log(errorName)
            }
        }
    }
}