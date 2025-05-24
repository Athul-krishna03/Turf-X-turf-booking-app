import { inject, injectable } from "tsyringe";
import { IGetAllBookingDataUseCase } from "../../entities/useCaseInterfaces/turf/IGetAllBookingDataUseCase";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";
import { ISlotRepository } from "../../entities/repositoryInterface/turf/ISlotRepository";
import { ISlotEntity } from "../../entities/models/slot.entity";
import { ISharedBookingEntity } from "../../entities/models/sharedBooking.entity";
import { IBookingEntity } from "../../entities/models/booking.entity";

@injectable()
export class GetAllBookingDataUseCase implements IGetAllBookingDataUseCase{
    constructor(
        @inject("IBookingRepository")
        private bookingRepo: IBookingRepository,
        @inject("ITurfRepository")
        private turfRepo: ITurfRepository,
        @inject("ISlotRepository")
        private slotRepo:ISlotRepository
    ){}
    async execute(): Promise<{normal:IBookingEntity[],hosted:ISharedBookingEntity[]}> {
        const normalGame = await this.bookingRepo.getAllBooking()
        const hostedGame = await this.bookingRepo.find();

        const enrichedNormal = [];

    for (const booking of normalGame) {
        const turfDetails = await this.turfRepo.getTurfByTurfId(booking.turfId); // Your existing method
        enrichedNormal.push({
        ...booking,
        turf: turfDetails,
        });
    }

        return {normal:enrichedNormal,hosted:hostedGame}

    }
}