import { Schema } from "mongoose";
import { IRefreshTokenModel } from "../schemas/refresh-token-schema";
   


export const RefreshTokenSchema = new Schema<IRefreshTokenModel>({
    user:{type:Schema.Types.ObjectId,required:true},
    userType:{
            type:String,
            enum:["admin","user","TurfOwner"],
            required:true
    },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
});
