import { BookingDTO, IBookingEntity } from "../../../entities/models/booking.entity";
import { ISharedBookingEntity } from "../../../entities/models/sharedBooking.entity";
import { IBookingRepository } from "../../../entities/repositoryInterface/booking/IBookingRepository";
import { BookingModel } from "../../../frameworks/database/models/booking.model";
import { SharedSlotBookingModel } from "../../../frameworks/database/models/sharedSlotBooking.model";

export class BookingRepository implements IBookingRepository{
    async save(data: Partial<IBookingEntity>): Promise<IBookingEntity> {
        const result= await BookingModel.create(data)
        return{
            id:result._id.toString(),
            ...result
        }
    }
    async getUserBookingDetials(userId:string):Promise<IBookingEntity[]>{
        const result = await BookingModel.find({userId:userId})
        return result as unknown as IBookingEntity[]
    }

    async saveSharedBooking(data: Partial<ISharedBookingEntity>): Promise<ISharedBookingEntity> {
        const result = await SharedSlotBookingModel.create(data);
        return result as ISharedBookingEntity
    }
}