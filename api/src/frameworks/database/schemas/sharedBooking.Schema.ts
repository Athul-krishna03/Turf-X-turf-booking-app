import { Schema } from "mongoose";

export const SharedBookingSchema = new Schema({
  userIds: { type: [String], ref: "Client", required: true },
  turfId: { type: String, ref: "Turf", required: true },
  date: { type: String, required: true },
  time:{type:String,required:true},
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  playerCount:{
    type:Number,
    required: true
  },

  walletContributions: {
    type: Map,
    of: Number,
    default: {},
  },

  isSlotLocked: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["Pending", "Booked", "Cancelled"],
    default: "Pending",
  },

  cancelledUsers: {
    type: [String],
    default: [],
  },

  refundsIssued: {
    type: Map,
    of: Number,
    default: {},
  },

}, { timestamps: true });
