import { inject, injectable } from "tsyringe";
import { IGetUserBookingDetialsUseCase } from "../entities/useCaseInterfaces/user/IGetUserBookingDetialsUseCase";
import { IBookingRepository } from "../entities/repositoryInterface/booking/IBookingRepository";
import { BookingDTO } from "../entities/models/booking.entity";
import { ITurfRepository } from "../entities/repositoryInterface/turf/ITurfRepository";
import { ISlotRepository } from "../entities/repositoryInterface/turf/ISlotRepository";

@injectable()
export class GetUserBookingDetialsUseCase implements IGetUserBookingDetialsUseCase{
    constructor(
        @inject("IBookingRepository") private bookingRepo:IBookingRepository,
        @inject("ISlotRepository") private slotRepo:ISlotRepository, 
        @inject("ITurfRepository") private turfRepo: ITurfRepository
    ){}

    async execute(userId: string): Promise<{
        upcoming: BookingDTO[],
        past: BookingDTO[]
    }> {
        const data = await this.bookingRepo.getUserBookingDetials(userId);
        const upcoming: BookingDTO[] = [];
        const past: BookingDTO[] = [];
        const today = new Date();

        today.setHours(0, 0, 0, 0); 
        for (let booking of data) {
            console.log(booking);
            
        const bookingDate = new Date(booking.date + 'T00:00:00'); 
        const turf = await this.turfRepo.getTurfByTurfId(booking.turfId);
        const bookingWithTurf = {
            id: booking.id.toString(),
            turfId: booking.turfId,
            turfName: turf?.name || '',
            turfImage: turf?.turfPhotos || [],
            location: {city:turf?.location?.city , state:turf?.location?.state},
            date: booking.date,
            startTime: booking.slotIds[0].startTime,
            duration: booking.duration,
            price: booking.price,
            currency: "₹",
            status: booking.status,
            sport: "Football"
        };
        if (bookingDate >= today) {
            upcoming.push(bookingWithTurf);
        } else {
            past.push(bookingWithTurf);
        }
        }
        return { upcoming, past };
    }
    
}