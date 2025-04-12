import { container } from "tsyringe";

//respoitory imports
import { IClientRepository } from "../../entities/repositoryInterface/client/IClient-repository.interface";
import { ClientRepository } from "../../interface/repositories/client/client.repository";
import { IRefreshTokenRepository } from "../../entities/repositoryInterface/auth/IRefreshToken_RepositoryInterface";
import { RefreshTokenRepository } from "../../interface/repositories/auth/refreshTokenRepository";
import { ITokenService } from "../../entities/services/ITokenServices";
import { JWTService } from "../../interface/services/JwtTokenService";
import { IUserExistenceService } from "../../entities/services/Iuser-existence-service.interface";
import { UserExistenceService } from "../../interface/services/UserExistenceServices";
import { IOtpService } from "../../entities/services/IOtpServices";
import { OtpService } from "../../interface/services/OtpService";
import { INodemailerService } from "../../entities/services/INodeMailerService";
import { NodemailerService } from "../../interface/services/NodeMailerServices";



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
        container.register<IUserExistenceService>("IUserExistenceService",{
            useClass:UserExistenceService
        })
        container.register<IOtpService>("IOtpService",{
            useClass:OtpService
        })

        container.register<INodemailerService>("INodemailerService",{
            useClass:NodemailerService
        })
    }
}