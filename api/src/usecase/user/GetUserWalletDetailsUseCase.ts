import { inject, injectable } from "tsyringe";
import { IWalletEntity } from "../../entities/models/wallet.entity";
import { IGetUserWalletDetailsUseCase } from "../../entities/useCaseInterfaces/user/IGetUserWalletDetailsUseCase";
import { IWalletRepository } from "../../entities/repositoryInterface/wallet/IWalletRepository";

@injectable()
export class GetUserWalletDetailsUseCase implements IGetUserWalletDetailsUseCase {
    constructor(
        @inject("IWalletRepository") private _walletRepo:IWalletRepository
    ) {}

    async execute(userId: string): Promise<IWalletEntity | null> {
        try {
        const walletDetails = await this._walletRepo.findByUserId(userId);

        if (!walletDetails) {
            return null;
        }

        return walletDetails;
        } catch (error:any) {
        throw new Error(`Error fetching wallet details: ${error.message}`);
        }
    }
}