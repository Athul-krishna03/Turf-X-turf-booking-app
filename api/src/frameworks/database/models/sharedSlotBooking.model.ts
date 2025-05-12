import { model, ObjectId } from "mongoose";
import { ISharedBookingEntity } from "../../../entities/models/sharedBooking.entity";
import { SharedBookingSchema } from "../schemas/sharedBooking.Schema";

export interface ISharedSlotBookingModel extends Omit<ISharedBookingEntity,"id">,Document{
    _id: ObjectId;
}

export const SharedSlotBookingModel = model<ISharedSlotBookingModel>("SharedBooking",SharedBookingSchema)