import { IWalletEntity } from "../../models/wallet.entity";

export interface IWalletRepository{
    create(data: Partial<IWalletEntity>): Promise<IWalletEntity>;
    findById(id: string): Promise<IWalletEntity | null>;
    findByUserId(userId: string): Promise<IWalletEntity | null>;
    getWalletBalance(userId: string): Promise<number>;
    findByIdAndUpdate(walletId: string, data: Partial<IWalletEntity>): Promise<{ balance: number }>;
    // deductFunds(userId: string, amount: number): Promise<void>;
    // getTransactionHistory(userId: string): Promise<Array<{ date: Date; amount: number; type: string }>>;
    // transferFunds(fromUserId: string, toUserId: string, amount: number): Promise<void>;
    // getUserWalletDetails(userId: string): Promise<{ balance: number; transactions: Array<{ date: Date; amount: number; type: string }> }>;
}