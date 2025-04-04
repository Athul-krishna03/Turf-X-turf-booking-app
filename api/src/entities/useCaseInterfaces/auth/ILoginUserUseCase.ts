import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { IUserEntity } from "../../models/user.entity";

export interface ILoginUserUseCase{
    execute(user:LoginUserDTO):Promise<Partial<IUserEntity>>
}