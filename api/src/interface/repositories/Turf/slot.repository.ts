import { ISlotEntity } from "../../../entities/models/slot.entity";
import { ISlotRepository } from "../../../entities/repositoryInterface/turf/ISlotRepository";
import { SlotModlel } from "../../../frameworks/database/models/slot.model";

export class SlotRepository implements ISlotRepository{
    async createSlots(slots:ISlotEntity[]):Promise<ISlotEntity[]>{
        return await SlotModlel.create(slots)
    }

}