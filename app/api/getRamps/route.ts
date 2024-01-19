import Ramp from "@/models/ramp";
import connectDB from "@/utils/db/mongodb";

export async function POST(req: Request) {
  const { address } = await req.json();
  try {
    await connectDB();
    const ramps = await Ramp.find({ address: address }).sort({ createdAt: -1 });
    return new Response(JSON.stringify(ramps));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
