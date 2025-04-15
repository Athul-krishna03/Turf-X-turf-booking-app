import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy";
import { IClientRepository } from "../../../entities/repositoryInterface/client/IClient-repository.interface";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { IUserEntity } from "../../../entities/models/user.entity";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { CustomError } from "../../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";

@injectable()

export class ClientLoginStrategy implements ILoginStrategy{
    constructor(
        @inject("IClientRepository") private clientRepository:IClientRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt:IBcrypt
    ){}

    async login(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
        console.log("inside login strategy");
        
        const client = await this.clientRepository.findByEmail(user.email);
        console.log(client);
        
        if(!client){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }
        if(client.isBlocked){
            throw new CustomError(
                ERROR_MESSAGES.BLOCKED,
                HTTP_STATUS.UNAUTHORIZED
            );
        }
        if(user.password){
            const isPasswordMatch = await this.passwordBcrypt.compare(
                user.password,
                client.password
            )

            if(!isPasswordMatch){
                throw new CustomError(
                    ERROR_MESSAGES.INVALID_CREDENTIALS,
                    HTTP_STATUS.BAD_REQUEST
                )
            }
        }
        return client
    }
    
}