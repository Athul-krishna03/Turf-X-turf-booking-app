import { Model } from "mongoose";
import { IBaseRepository } from "../../entities/repositoryInterface/IBase-repository-interface";
import { injectable } from "tsyringe";

@injectable()
export class BaseRepository<T> implements IBaseRepository<T>{
    constructor(protected model: Model<T>) {}
    async save(data: Partial<T>): Promise<T> {
        const entity = new this.model(data);
        const savedEntity = await entity.save();
        return savedEntity as T;
    }
}