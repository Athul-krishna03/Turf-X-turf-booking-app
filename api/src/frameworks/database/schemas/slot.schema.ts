import { Schema } from "mongoose";
import { ISlotModel } from "../models/slot.model";

export const SlotSchema = new Schema<ISlotModel>({
    turfId:{
        type:String,
        ref:"Turf"
    },
    date:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false
    },
    duration:{
        type:Number,
    },
    price:{
        type:Number,
    }
})

