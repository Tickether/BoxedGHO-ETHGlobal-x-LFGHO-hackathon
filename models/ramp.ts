import mongoose from "mongoose"
const { Schema } = mongoose

const RampSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        addressTo: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        txn: {
            type: String,
            unique: true,
            required: true,
        },
        ref: {
            type: String,
            unique: true,
            required: true,
        },
        amountGHO: {
            type: String,

        },
        amountUSD: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Add timestamps
    }
)

const Ramp = mongoose.models.Ramp || mongoose.model('Ramp', RampSchema)

export default Ramp