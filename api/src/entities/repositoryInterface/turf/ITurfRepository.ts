import { ITurfEntity } from "../../models/turf.entity";

export interface ITurfRepository{
    save(data:Partial<ITurfEntity>):Promise<ITurfEntity>;
    findByEmail(email: string): Promise<ITurfEntity | null>;
    find(
            filter:any,
            skip:number,
            limit:number
        ):Promise<{turfs:ITurfEntity[] | [];total:number}>
}