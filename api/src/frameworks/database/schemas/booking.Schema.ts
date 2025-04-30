import { Schema } from "mongoose";
import { IBookingModel } from "../models/booking.model";

export const BookingSchema = new Schema<IBookingModel>({
    userId:{
        type:Schema.Types.ObjectId,ref:"Client"
    },
    turfId:{
        type:Schema.Types.ObjectId,ref:"Turf"
    },
    date:{
        type:String,required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    totalHours:{
        type:Number
    },
    status: {
        type: String, 
        enum: ['booked', 'cancelled'], 
        default: 'booked' 
    }



})

