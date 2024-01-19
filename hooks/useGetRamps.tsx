import { useState, useEffect } from 'react'

export interface Ramp {
    address: string
    addressTo: string
    email: string 
    txn: string
    ref: string 
    amountGHO: string 
    amountUSD: string
    status: string
    createdAt: string
}
export const useGetRamps = (address: string) => {
    const [ramps, setRamps] = useState<Ramp[] | null>(null)
    const [loadingRamps, setLoading] = useState<boolean | null>(null)
    const [error, setError] = useState<any | null>(null)

    useEffect (() =>{
        const getRamps = async ()=>{
            setLoading(true)
            try {
                const res = await fetch('api/getRamps', {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                      address,
                    })
                })
                const data = await res.json()
                setRamps(data)
            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
        getRamps()
    },[ address ])

    const getBackRamps = async ()=>{
        setLoading(true);
        try {
            const res = await fetch('api/getRamps' ,{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    address: address,
                })
            })
            const data = await res.json()
            setRamps(data)
        } catch(err){
            setError(err)
        }
        setLoading(false)
    }

    return {ramps, loadingRamps, error, getBackRamps}
}