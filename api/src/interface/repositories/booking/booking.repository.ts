import { BookingDTO, IBookingEntity } from "../../../entities/models/booking.entity";
import { IBookingRepository } from "../../../entities/repositoryInterface/booking/IBookingRepository";
import { BookingModel } from "../../../frameworks/database/models/booking.model";

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
}