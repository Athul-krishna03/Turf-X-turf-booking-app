import { injectable } from "tsyringe";
import { ITurfRepository } from "../../../entities/repositoryInterface/turf/ITurfRepository";
import { ITurfEntity } from "../../../entities/models/turf.entity";
import { TurfModel } from "../../../frameworks/database/models/turf.model";


@injectable()
export class TurfRepository implements ITurfRepository{
    async save(data: Partial<ITurfEntity>): Promise<ITurfEntity> {
        return await TurfModel.create(data)
    }
    async findByEmail(email: string): Promise<ITurfEntity | null> {
        const client = await TurfModel.findOne({email}).lean();
        console.log("turf client inside findby email",client)
        if(!client) return null;

        return{
            ...client,
            role:"TurfOwner",
            id:client._id.toString()
        } as ITurfEntity
    }

    async find(filter: any, skip: number, limit: number): Promise<{ turfs: ITurfEntity[] | []; total: number; }> {
        const turfs = await TurfModel.find({...filter}).skip(skip).limit(limit);
        return {turfs,total:turfs.length}
    }
}