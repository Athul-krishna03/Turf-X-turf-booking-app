import { container } from "tsyringe";

//respoitory imports
import { IClientRepository } from "../../entities/repositoryInterface/client/IClient-repository.interface";
import { ClientRepository } from "../../interface/repositories/client/client.repository";
import { IRefreshTokenRepository } from "../../entities/repositoryInterface/auth/IRefreshToken_RepositoryInterface";
import { RefreshTokenRepository } from "../../interface/repositories/auth/refreshTokenRepository";
import { ITokenService } from "../../entities/services/ITokenServices";
import { JWTService } from "../../interface/services/JwtTokenService";



export class RepositoryRegistry{
    static registerRepositories():void{
        container.register<IClientRepository>("IClientRepository",{
            useClass:ClientRepository
        });

        container.register<IRefreshTokenRepository>("IRefreshTokenRepository",{
            useClass:RefreshTokenRepository
        })

        container.register<ITokenService>("ITokenService",{
            useClass:JWTService
        })
    }
}