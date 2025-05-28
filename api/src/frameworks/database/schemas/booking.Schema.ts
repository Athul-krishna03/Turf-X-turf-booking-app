import { Schema } from "mongoose";
import { IBookingModel } from "../models/booking.model";

export const BookingSchema = new Schema<IBookingModel>(
{
    userId: { type: String, ref: "Client", required: true },
    turfId: { type: String, ref: "Turf", required: true },
    bookingId: { type: String,unique: true },
    date: { type: String, required: true }, 
    time: { type: String, required: true }, 
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Booked", "Cancelled","Pending"],
        default: "Booked",
    },
},
{ timestamps: true }
);
