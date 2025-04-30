import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "./auth/register-stratergies/register-strategy.interface";
import { IRegisterUserUseCase } from "../entities/useCaseInterfaces/auth/IRegister-usecase.interface";
import { UserDTO } from "../shared/dtos/user.dto";
import { CustomError } from "../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../shared/constants";

@injectable()
export class RegisterUserUsecase implements IRegisterUserUseCase {
  private strategies: Record<string, IRegisterStrategy>;
  constructor(
    @inject("ClientRegisterStrategy")
    private clientRegister: IRegisterStrategy,
    @inject("TurfRegisterStrategy")
    private turfRegister: IRegisterStrategy
  ) {
    this.strategies = {
      user: this.clientRegister,
      turf:this.turfRegister
    };
  }
  async execute(user: UserDTO): Promise<void> {
    console.log("inside strategy",user.role)
    const strategy = this.strategies[user.role];
    console.log(strategy,"stragey")
    if (!strategy) {
      throw new CustomError(ERROR_MESSAGES.INVALID_ROLE, HTTP_STATUS.FORBIDDEN);
    }
    await strategy.register(user);
  }
}
