import { Schema } from "mongoose";
import { IWalletModel } from "../models/wallet.model";

export const WalletSchema = new Schema<IWalletModel>(
{
    userId: { type: String, ref: "Client", required: true },
    userType: { type: String, enum: ["client", "turf"], required: true },
    balance: { type: Number, default: 0, required: true },
    transaction: [
        {
            type: { type: String, enum: ["credit", "debit"], required: true },
            amount: { type: Number, required: true },
            date: { type: Date, default: Date.now },
            description: { type: String, required: false }
        }
    ]
},
{ timestamps: true }
)