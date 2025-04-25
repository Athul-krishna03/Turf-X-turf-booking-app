import { ITurfEntity } from "../../models/turf.entity";

export interface ITurfRepository{
    save(data:Partial<ITurfEntity>):Promise<ITurfEntity>;
    findById(id:string):Promise<ITurfEntity | null>;
    findByEmail(email: string): Promise<ITurfEntity | null>;
    find(
            filter:any,
            skip:number,
            limit:number
        ):Promise<{turfs:ITurfEntity[] | [];total:number}>
    findByIdAndUpdateStatus(id:string):Promise<void>
    findByIdAndUpdateRequest(id:string,status:string):Promise<void>
}