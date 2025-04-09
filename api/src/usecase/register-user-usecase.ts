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
    private clientRegister: IRegisterStrategy
  ) {
    this.strategies = {
      user: this.clientRegister,
    };
  }
  async execute(user: UserDTO): Promise<void> {
    const strategy = this.strategies[user.role];
    if (!strategy) {
      throw new CustomError(ERROR_MESSAGES.INVALID_ROLE, HTTP_STATUS.FORBIDDEN);
    }
    await strategy.register(user);
  }
}
