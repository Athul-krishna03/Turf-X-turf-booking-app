import { inject, injectable } from "tsyringe";
import { ILoginUserUseCase } from "../entities/useCaseInterfaces/auth/ILoginUserUseCase";
import { IUserEntity } from "../entities/models/user.entity";
import { LoginUserDTO } from "../shared/dtos/user.dto";
import { ILoginStrategy } from "./auth/login-strategies/login-strategy";
import { CustomError } from "../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../shared/constants";

@injectable()

export class LoginUserUseCase implements ILoginUserUseCase{
    private strategies:Record<string,ILoginStrategy>;
    constructor(
        @inject("ClientLoginStrategy")
        private clientLogin:ILoginStrategy
    ){
        this.strategies={
            user:clientLogin
        }
    }
    async execute(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
        const strategy = this.strategies[user.role];
        if(!strategy){
            throw new CustomError(
                ERROR_MESSAGES.INVALID_ROLE,
                HTTP_STATUS.FORBIDDEN
            )
        }
        return await strategy.login(user)
    }
}