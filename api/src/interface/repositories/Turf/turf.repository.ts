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
        return await TurfModel.findOne({email}).lean()
    }
}