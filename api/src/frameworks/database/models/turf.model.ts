import { Document, ObjectId, model } from "mongoose";
import { ITurfEntity } from "../../../entities/models/turf.entity";
import { TurfSchema } from "../schemas/turf.schema";

export interface ITurfModel extends Omit<ITurfEntity, "id">, Document {
  _id: ObjectId;
}

export const TurfModel = model<ITurfModel>("Turf", TurfSchema);
