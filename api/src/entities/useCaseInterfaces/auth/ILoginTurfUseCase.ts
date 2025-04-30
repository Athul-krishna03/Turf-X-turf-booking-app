import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { ITurfEntity } from "../../models/turf.entity";


export interface ILoginTurfUseCase{
    execute(user:LoginUserDTO):Promise<Partial<ITurfEntity>>
}