import { inject, injectable } from "tsyringe";
import { IGetJoinedGameDetialsUseCase } from "../../entities/useCaseInterfaces/user/IGetJoinedGameDetialsUseCase";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { ISharedBookingEntity } from "../../entities/models/sharedBooking.entity";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";
import { ITurfEntity } from "../../entities/models/turf.entity";

@injectable()
export class GetJoinedGameDetials implements IGetJoinedGameDetialsUseCase{
    constructor(
        @inject("IBookingRepository") private _bookingRepo:IBookingRepository,
        @inject("ITurfRepository") private _turfRepo:ITurfRepository
    ){}
    async execute(bookingId: string): Promise<{booking: ISharedBookingEntity; turf: ITurfEntity | null;}> {
        const data = await this._bookingRepo.findById(bookingId)
        const turfData = await this._turfRepo.getTurfByTurfId(data.turfId)
        return {
            booking:data,
            turf:turfData
        }
    }
}