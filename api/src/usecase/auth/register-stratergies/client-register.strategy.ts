import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { IClientRepository } from "../../../entities/repositoryInterface/client/IClient-repository.interface";
import { IUserEntity } from "../../../entities/models/user.entity";
import { UserDTO } from "../../../shared/dtos/user.dto";
import { CustomError } from "../../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { generateUniqueUid } from "../../../frameworks/security/uniqueuid.bcrypt";

@injectable()
export class ClientRegisterStrategy implements IRegisterStrategy {
  constructor(
    @inject("IClientRepository") private clientRepository: IClientRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
  ) {}

  async register(user: UserDTO): Promise<IUserEntity | void> {
    console.log("client register");
    
    const existingClient = await this.clientRepository.findByEmail(user.email);

    if (existingClient) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
    }

    const { name, email, phone, password ,role } = user as UserDTO;
    console.log("inside client registery strategy",role)

    let hashedPassword = null;
    if (password) {
      hashedPassword = await this.passwordBcrypt.hash(password);
    }
    const clientId = generateUniqueUid(role);

    try {
      const newUser = await this.clientRepository.save({
        name,
        email,
        password: hashedPassword ?? "",
        phone,
        clientId,
        role: role,
      });

      return newUser;
    } catch (error) {
      throw new CustomError(
        ERROR_MESSAGES.SERVER_ERROR,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }
}
