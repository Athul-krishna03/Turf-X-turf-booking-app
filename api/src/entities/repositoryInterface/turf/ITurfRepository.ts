import { ITurfEntity } from "../../models/turf.entity";
import { IBaseRepository } from "../IBase-repository-interface";

export interface ITurfRepository extends IBaseRepository<ITurfEntity>{
    updateProfileById(turfId: string, data: Partial<ITurfEntity>): unknown;
    getTurfByTurfId(turfId: string): Promise<ITurfEntity | null>
    findById(id:string):Promise<ITurfEntity | null>;
    findByEmail(email: string): Promise<ITurfEntity | null>;
    find(
            filter:any,
            skip:number,
            limit:number
        ):Promise<{turfs:ITurfEntity[] | [];total:number}>
    findByIdAndUpdatePassWord(id:string,password:string):Promise<void>
    findByIdAndUpdateStatus(id:string):Promise<void>
    findByIdAndUpdateRequest(id:string,status:string):Promise<void>
    
}