import { inject, injectable } from "tsyringe";
import { IJoinGameUseCase } from "../../entities/useCaseInterfaces/booking/IJoinGameUseCase";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { ISharedBookingEntity } from "../../entities/models/sharedBooking.entity";

@injectable()
export class JoinGameUseCase implements IJoinGameUseCase{
    constructor(
        @inject("IBookingRepository") private bookingRepo: IBookingRepository
    ){}
    async execute(data: object): Promise< ISharedBookingEntity | null> {
        return await this.bookingRepo.joinGame(data);
        
    }
}