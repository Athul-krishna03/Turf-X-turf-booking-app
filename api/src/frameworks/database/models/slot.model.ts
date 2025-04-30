import { Document, ObjectId, model } from "mongoose";
import { ISlotEntity } from "../../../entities/models/slot.entity";
import { SlotSchema } from "../schemas/slot.schema";

export interface ISlotModel extends Omit<ISlotEntity, "id">, Document {
  _id: ObjectId;
}

export const SlotModlel = model<ISlotModel>("Slot", SlotSchema);
