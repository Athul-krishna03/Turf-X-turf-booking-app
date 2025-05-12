import { ISlotEntity } from "../../../entities/models/slot.entity";
import { ISlotRepository } from "../../../entities/repositoryInterface/turf/ISlotRepository";
import { ISlotModel, SlotModlel } from "../../../frameworks/database/models/slot.model";
import { ISlot } from "../../../usecase/turf/GenerateSlotsUseCase";

export class SlotRepository implements ISlotRepository{
    async createSlots(slots:ISlot[]):Promise<ISlotEntity[]>{
        const createdSlots = await SlotModlel.create(slots);
    return createdSlots.map((slot) => ({
        id: slot._id.toString(),
        turfId: slot.turfId,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: slot.isBooked,
        duration: slot.duration,
        price: slot.price,
    }));
    }
    async findByTurfIdAndDate(turfId: string, date: string): Promise<ISlotEntity[]> {
        return await SlotModlel.find({
            turfId: turfId,
            date: date
        })
    }

    async findAll(): Promise<ISlotEntity[]> {
        const slots = await SlotModlel.find().lean().sort({startTime:1});
        return slots.map(slot =>({
            id: slot._id.toString(),
            turfId: slot.turfId,
            date: slot.date,
            startTime: slot.startTime,
            endTime:slot.endTime,
            duration: slot.duration,
            price: slot.price,
        }))
    }

    async deleteById(id: string): Promise<void> {
        await SlotModlel.deleteOne({_id:id})
    }

    async findById(id: string): Promise<ISlotEntity> {
        const slot = await SlotModlel.findById({_id:id});
        
        return slot as ISlotEntity
    }
    async update(id: string, updates: object): Promise<ISlotEntity> {
        const slot = await SlotModlel.findByIdAndUpdate(id,updates)
        return slot as ISlotEntity
        
    }
    async findOne(query: { turfId: string; date: string; startTime: string }): Promise<ISlotEntity | null> {
        const slot = await SlotModlel.findOne(query).exec();
        if (!slot) return null;
        return this.mapToEntity(slot);
    }


    private mapToEntity(slot: ISlotModel): ISlotEntity {
        return {
        id: slot._id.toString(),
        turfId: slot.turfId,
        date: slot.date,
        duration: slot.duration,
        price: slot.price,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: slot.isBooked ?? false,
        };
    }
}