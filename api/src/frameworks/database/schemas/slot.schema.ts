import { Schema } from "mongoose";
import { ISlotModel } from "../models/slot.model";

export const SlotSchema = new Schema<ISlotModel>({
    turfId:{
        type:Schema.Types.ObjectId,ref:"Turf"
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
    }
})

