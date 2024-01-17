import { useState, useEffect } from 'react'

export interface Bridge {
    address: string
    txn: string 
    amountGHO: string 
    amountBridged: string
    bridgeChain: string
    bridgeToken: string
    createdAt: string
}
export const useGetBridges = (address: string) => {
    const [bridges, setBridges] = useState<Bridge[] | null>(null)
    const [loadingBridges, setLoading] = useState<boolean | null>(null)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        const getBridges = async ()=>{
            setLoading(true)
            try {
                const res = await fetch('api/getBridges', {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                      address,
                    })
                })
                const data = await res.json()
                setBridges(data)
            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
        getBridges()
    },[ address ])

    const getBackBridges = async ()=>{
        setLoading(true);
        try {
            const res = await fetch('api/getBridges' ,{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    address: address,
                })
            })
            const data = await res.json()
            setBridges(data)
        } catch(err){
            setError(err)
        }
        setLoading(false)
    }

    return {bridges, loadingBridges, error, getBackBridges}
}