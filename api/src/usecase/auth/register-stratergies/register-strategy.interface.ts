import { IUserEntity } from "../../../entities/models/user.entity";
import { UserDTO } from "../../../shared/dtos/user.dto";

export interface IRegisterStrategy {
  register(user: UserDTO): Promise<IUserEntity | void>;
}
