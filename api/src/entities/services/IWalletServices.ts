import { IWalletEntity } from "../models/wallet.entity";

export interface IWalletSercvices {
    addFundsToWallet(userId: string, amount: number,data:object): Promise<IWalletEntity>;
}