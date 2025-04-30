import { inject, injectable } from "tsyringe";
import { IUserEntity } from "../entities/models/user.entity";
import { LoginUserDTO } from "../shared/dtos/user.dto";
import { ILoginStrategy } from "./auth/login-strategies/login-strategy";
import { CustomError } from "../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../shared/constants";
import { ILoginTurfUseCase } from "../entities/useCaseInterfaces/auth/ILoginTurfUseCase";
import { ITurfEntity } from "../entities/models/turf.entity";

@injectable()

export class LoginTurfUseCase implements ILoginTurfUseCase{
    private strategies:Record<string,ILoginStrategy>;
    constructor(
        @inject("TurfLoginStrategy")
        private turfLogin:ILoginStrategy
    ){
        this.strategies={
            turf:this.turfLogin
        }
    }
    async execute(user: LoginUserDTO): Promise<Partial<ITurfEntity>> {
        console.log(user.role);
        
        const strategy = this.strategies[user.role];
        console.log("strategy",strategy);
        
        if(!strategy){
            throw new CustomError(
                ERROR_MESSAGES.INVALID_ROLE,
                HTTP_STATUS.FORBIDDEN
            )
        }
        return await strategy.login(user)
    }
}