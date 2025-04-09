import { model, ObjectId } from "mongoose";
import { IRefreshTokenEntity } from "../../../entities/models/refresh.token.entity";
import { RefreshTokenSchema } from "../models/refresh.token.model";

export interface IRefreshTokenModel extends Omit<IRefreshTokenEntity,"id" | "user">,Document{
    _id:ObjectId;
    user:ObjectId;
}

export const RefreshTokenModel = model<IRefreshTokenModel>(
    "RefreshToken",RefreshTokenSchema
)