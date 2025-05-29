import { IWalletModel } from "../../../frameworks/database/models/wallet.model";
import { IWalletEntity } from "../../models/wallet.entity";
import {IBaseRepository} from "../IBase-repository-interface"

export interface IWalletRepository extends IBaseRepository<IWalletModel>{
    // create(data: Partial<IWalletEntity>): Promise<IWalletEntity>;
    findById(id: string): Promise<IWalletEntity | null>;
    findByUserId(userId: string): Promise<IWalletEntity | null>;
    getWalletBalance(userId: string): Promise<number>;
    findByIdAndUpdate(walletId: string, data: Partial<IWalletEntity>): Promise<{ balance: number }>;
}