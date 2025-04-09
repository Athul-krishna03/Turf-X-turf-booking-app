import { inject, injectable } from "tsyringe";
import { IGenerateTokenUseCase } from "../entities/useCaseInterfaces/auth/IGenerateTokenUseCase";
import { ITokenService } from "../entities/services/ITokenServices";
import { IRefreshTokenRepository } from "../entities/repositoryInterface/auth/IRefreshToken_RepositoryInterface";
import { TRole } from "../shared/constants";


@injectable()

export class GenerateTokenUseCase implements IGenerateTokenUseCase{

    constructor(
        @inject('ITokenService') private tokenService:ITokenService,
        @inject("IRefreshTokenRepository") private refreshTokenRepository:IRefreshTokenRepository
    ){}
    async execute(id: string, email: string, role: string): Promise<{ accessToken: string; refreshToken: string; }> {
        const payload = {id,email,role};

        const accessToken = this.tokenService.generateAccessToken(payload);
        const refreshToken = this.tokenService.generateRefreshToken(payload);
          
        await this.refreshTokenRepository.save({
            token:refreshToken,
            userType:role as TRole,
            user:id,
            expiresAt:Date.now()* 7 * 24 * 60 * 60 * 100
        })

        return {accessToken,refreshToken}
    }
}