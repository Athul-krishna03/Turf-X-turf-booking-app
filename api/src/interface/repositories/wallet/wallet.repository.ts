import { IWalletEntity } from "../../../entities/models/wallet.entity";
import { IWalletRepository } from "../../../entities/repositoryInterface/wallet/IWalletRepository";
import { WalletModel,IWalletModel } from "../../../frameworks/database/models/wallet.model";
import { BaseRepository } from "../base.repository";


export class WalletRepository extends BaseRepository<IWalletModel> implements IWalletRepository {
    
    constructor(){
        super(WalletModel)
    }
    // async create(data: Partial<IWalletEntity>): Promise<IWalletEntity> {
    //     return await WalletModel.create(data).then((result) => {
    //         return {
    //             id: result._id.toString(),
    //             ...result,
    //         } as IWalletEntity;
    //     })
        
    // }
    async findById(id: string): Promise<IWalletEntity | null> {
        return await WalletModel.findById(id)
    }
    async findByIdAndUpdate(walletId: string, data: Partial<IWalletEntity>): Promise<{ balance: number; }> {
        const result = await WalletModel.findByIdAndUpdate({_id:walletId},
            {$set:data},
            {new:true}
        )

        return result as IWalletEntity
    }
    async findByUserId(userId: string): Promise<IWalletEntity | null> {
        const result =  await WalletModel.findOne({ userId: userId });
        if(!result) {
            const create = await this.save({ userId: userId, userType: "client" });
            return create as IWalletEntity ;
        }else{
            return result as IWalletEntity | null;
        }
        
    }
    async getWalletBalance(userId: string): Promise<number> {
        const result = await WalletModel.findOne({ userId: userId });
        if (!result) {  
            throw new Error("Wallet not found for user");
        }
        return result.balance;
    }
}