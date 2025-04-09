import { IUserEntity } from "../../../entities/models/user.entity";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";

export interface ILoginStrategy{
    login(user:LoginUserDTO):Promise<Partial<IUserEntity>>
}