import { TRole } from "../../../shared/constants";
import { IClientEntity } from "../../models/client.entity";

export interface IGoogleAuthUseCase {
    execute(
        credentials:any,
        client_id:any,
        role:TRole
    ):Promise<Partial<IClientEntity>>
}