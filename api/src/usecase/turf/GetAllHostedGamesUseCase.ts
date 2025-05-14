import { inject, injectable } from "tsyringe";
import { IGetAllHostedGamesUseCase } from "../../entities/useCaseInterfaces/turf/IGetAllHostedGamesUseCase";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { IHostedGame } from "../../shared/dtos/hostGame.dto";

@injectable()
export class GetAllHostedGamesUseCase implements IGetAllHostedGamesUseCase{
    constructor(
        @inject("IBookingRepository")
        private bookingRepo:IBookingRepository,
    ){}
    async execute(userId:string): Promise<IHostedGame[]> {
        return await this.bookingRepo.find(userId);
        
    }
}