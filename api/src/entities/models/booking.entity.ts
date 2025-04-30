import { ObjectId } from "mongoose";

export interface IBookingEntity{
    id?:string,
    userId:string | ObjectId,
    turfId:string | ObjectId,
    date:string,
    startTime:string,
    endTime:string,
    totalHours?:number,
    status:string
}