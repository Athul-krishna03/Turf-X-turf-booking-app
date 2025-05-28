import { Document, ObjectId, model } from "mongoose";
import { IWalletEntity } from "../../../entities/models/wallet.entity";
import { WalletSchema } from "../schemas/wallet.Schema";


export interface IWalletModel extends Omit<IWalletEntity, "id">, Document {
  _id: ObjectId;
}

export const WalletModel = model<IWalletModel>("Wallet",WalletSchema);