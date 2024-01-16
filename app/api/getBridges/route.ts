import Bridge from "@/models/bridge"
import connectDB from "@/utils/db/mongodb"

export async function POST(
    req: Request,
) {
    const { address } = await req.json()
    try {
        await connectDB()
        const bridges = await Bridge.find({ address: address })
        return new Response(JSON.stringify(bridges))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}