import { IWalletEntity } from "../../models/wallet.entity";

export interface IGetUserWalletDetailsUseCase {
    execute(userId: string): Promise<IWalletEntity | null>
}