import { inject, injectable } from "tsyringe";
import { IUpdateUserPassWordUseCase } from "../../entities/useCaseInterfaces/user/IUpdateUserPassWordUseCase";
import { IClientRepository } from "../../entities/repositoryInterface/client/IClient-repository.interface";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class UpdateUserPassWordUseCase implements IUpdateUserPassWordUseCase{
    constructor(
        @inject("IClientRepository") private clientRepo: IClientRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt:IBcrypt
    ){}
    async execute(userId: string, currentPassword: string, newPassword: string): Promise<void> {
        const user = await this.clientRepo.findById(userId);

        if(!user){
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }
        const isPasswordMatch = await this.passwordBcrypt.compare(currentPassword,user.password);
        console.log("pass match",isPasswordMatch);

        if(!isPasswordMatch){
            throw new CustomError(
                ERROR_MESSAGES.WRONG_CURRENT_PASSWORD,
                HTTP_STATUS.BAD_REQUEST
            )
        }
        const isCurrentMatchWithOld = await this.passwordBcrypt.compare(newPassword,user.password);
        console.log("hai    ",isCurrentMatchWithOld)
        if(isCurrentMatchWithOld){
            throw new CustomError(
                ERROR_MESSAGES.SAME_CURR_NEW_PASSWORD,
                HTTP_STATUS.BAD_REQUEST
            )
        }
        
        const hashedPassword = await this.passwordBcrypt.hash(newPassword);
        console.log(hashedPassword);
        await this.clientRepo.findByIdAndUpdatePassWord(userId,hashedPassword);

    }
}