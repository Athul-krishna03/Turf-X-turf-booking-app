import { inject, injectable } from "tsyringe";
import { INormalGameCancelUseCase } from "../../entities/useCaseInterfaces/booking/INormalGameCancelUseCase";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { IBookingEntity } from "../../entities/models/booking.entity";

@injectable()
export class NormalGameCancelUseCase implements INormalGameCancelUseCase{
    constructor(
        @inject("IBookingRepository") private _bookingRepo:IBookingRepository
    ){}
    async execute(bookingId: string): Promise<IBookingEntity | null> {
        return await this._bookingRepo.cancelNormalGame(bookingId);
    }
}