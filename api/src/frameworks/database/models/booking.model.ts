import { Document, ObjectId, model } from "mongoose";
import { IBookingEntity } from "../../../entities/models/booking.entity";
import { BookingSchema } from "../schemas/booking.Schema";

export interface IBookingModel extends Omit<IBookingEntity, "id">, Document {
  _id: ObjectId;
}

export const BookingModel = model<IBookingModel>("Booking", BookingSchema);
