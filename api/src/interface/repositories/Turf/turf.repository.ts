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

    async findByIdAndUpdateStatus(id: string): Promise<void> {
        console.log("id turf",id);
        const user = await TurfModel.findById({_id:id});
        console.log("user status",user);
        if(!user){
            throw new Error("User not found");
        }
        
        const updateStatus = !user.isBlocked;
        const result = await TurfModel.findByIdAndUpdate({_id:id},{$set:{isBlocked:updateStatus}})
    }

    async findByIdAndUpdateRequest(id: string,status:string): Promise<void> {
        const user = await TurfModel.findById({_id:id});
        console.log("update status in repo",status)
        console.log("user status",user);
        if(!user){
            throw new Error("User not found");
        }
        const result = await TurfModel.findByIdAndUpdate({_id:id},{$set:{status:status}})
    }

    async findById(id: string): Promise<ITurfEntity | null> {
        const client = await TurfModel.findById({_id:id}).lean();
        console.log("turf client inside findby email",client)
        if(!client) return null;

        return{
            ...client,
            role:"TurfOwner",
            id:client._id.toString()
        } as ITurfEntity
    }
}