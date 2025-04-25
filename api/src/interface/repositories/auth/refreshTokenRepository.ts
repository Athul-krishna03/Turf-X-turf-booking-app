import { injectable } from "tsyringe";
import { IRefreshTokenRepository } from "../../../entities/repositoryInterface/auth/IRefreshToken_RepositoryInterface";
import { TRole } from "../../../shared/constants";
import { RefreshTokenModel } from "../../../frameworks/database/schemas/refresh-token-schema";


@injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository{
    async save(data: { token: string; userType: TRole; user: string; expiresAt: number; }): Promise<void> {
        await RefreshTokenModel.create({
            token:data.token,
            userType:data.userType,
            user:data.user,
            expiresAt:data.expiresAt
        })
    }

    async revokeRefreshToken(token:string):Promise<void>{
        await RefreshTokenModel.deleteOne({token})
    }
}