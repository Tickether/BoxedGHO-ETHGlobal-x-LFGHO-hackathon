// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Ramp from '@/models/ramp'
import connectDB from '@/utils/db/mongodb'



export async function POST(
    req: Request,
) {
    const { address, email, txn, ref, amountGHO, amountUSD, status } =  await req.json()
    try {
        await connectDB()
        const ramp = await Ramp.create({ 
            address: address,
            email: email, 
            txn: txn, 
            ref: ref, 
            amountGHO: amountGHO, 
            amountUSD: amountUSD, 
            status: status, 
        })
        return new Response(JSON.stringify(ramp))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}