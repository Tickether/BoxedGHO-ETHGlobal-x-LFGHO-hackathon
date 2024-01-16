// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Bridge from '@/models/bridge'
import connectDB from '@/utils/db/mongodb'



export async function POST(
    req: Request,
) {
    const { address, txn, amountGHO, amountBridged, bridgeChain, bridgeToken } =  await req.json()
    try {
        await connectDB()
        const bridge = await Bridge.create({ 
            address: address,
            txn: txn, 
            amountGHO: amountGHO, 
            amountBridged: amountBridged, 
            bridgeChain: bridgeChain, 
            bridgeToken: bridgeToken, 
        })
        return new Response(JSON.stringify(bridge))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}