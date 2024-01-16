import mongoose from "mongoose"
const { Schema } = mongoose

const BridgeSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        txn: {
            type: String,
            unique: true,
            required: true,
        },
        amountGHO: {
            type: String,
            required: true,
        },
        amountBridged: {
            type: String,
            required: true,
        },
        bridgeChain: {
            type: String,
            required: true,
        },
        bridgeToken: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Add timestamps
    }
)

const Bridge = mongoose.models.Bridge || mongoose.model('Bridge', BridgeSchema)

export default Bridge