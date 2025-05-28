import { inject, injectable } from "tsyringe";
import { INormalGameCancelUseCase } from "../../entities/useCaseInterfaces/booking/INormalGameCancelUseCase";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { IBookingEntity } from "../../entities/models/booking.entity";
import { ISlotRepository } from "../../entities/repositoryInterface/turf/ISlotRepository";
import { IClientRepository } from "../../entities/repositoryInterface/client/IClient-repository.interface";
import { IWalletSercvices } from "../../entities/services/IWalletServices";

@injectable()
export class NormalGameCancelUseCase implements INormalGameCancelUseCase{
    constructor(
        @inject("IBookingRepository") private _bookingRepo:IBookingRepository,
        @inject("ISlotRepository") private _slotRepo:ISlotRepository,
        @inject('IWalletSercvices') private _walletService: IWalletSercvices,
    ){}
    async execute(bookingId: string): Promise<IBookingEntity | null> {
        console.log("bookingId", bookingId);
        
        const result=await this._bookingRepo.cancelNormalGame(bookingId);
        if(result && result.duration > 0){
            console.log("result", result);
            
            for (let i = 0; i < result.duration; i++) {
                const date = new Date(result.date).toLocaleDateString('en-CA');
                console.log("date", date);
            const slotData = await this._slotRepo.findOne({
                turfId: result.turfId,
                date: date,
                startTime: result.time
            });

        if (slotData) {
            console.log(slotData.id, "slot id");
            const  data={
                type: "credit",
                amount: result.price,
                description: "Booking cancellation refund"
            } 
            await this._slotRepo.update(slotData.id!, { isBooked: false });
            await this._walletService.addFundsToWallet(result.userId,result.price,data);
        }
        }
        } else if (result) {
            const slotData = await this._slotRepo.findOne({
                turfId: result.turfId,
                date: result.date,
                startTime: result.time
            });

            if (slotData) {
                await this._slotRepo.update(slotData.id!, { isBooked: false });
            }
        }
    return result;
}
}