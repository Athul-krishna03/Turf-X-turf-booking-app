import { inject, injectable } from "tsyringe";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { ISlotRepository } from "../../entities/repositoryInterface/turf/ISlotRepository";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";
import { IGetUserBookingDetialsUseCase } from "../../entities/useCaseInterfaces/user/IGetUserBookingDetialsUseCase";
import { BookingDTO } from "../../entities/models/booking.entity";
import { ISharedBookingEntity } from "../../entities/models/sharedBooking.entity";

@injectable()
export class GetUserBookingDetialsUseCase implements IGetUserBookingDetialsUseCase {
  constructor(
    @inject("IBookingRepository") private bookingRepo: IBookingRepository,
    @inject("ISlotRepository") private slotRepo: ISlotRepository,
    @inject("ITurfRepository") private turfRepo: ITurfRepository
  ) {}

  async execute(userId: string): Promise<{
    upcoming: BookingDTO[],
    past: BookingDTO[],
    joinedGames: {
        upcoming: any[],
        past: any[]
    }
  }> {
    const today = new Date();


    const data = await this.bookingRepo.getUserBookingDetials(userId);
    const upcoming: BookingDTO[] = [];
    const past: BookingDTO[] = [];
    
    const isUpcoming = (date: string, time: string): boolean => {
      try {
        const bookingDateTime = new Date(`${date}T${time}:00+05:30`);
        return bookingDateTime > today;
      } catch (error) {
        console.error(`Invalid date/time format: ${date} ${time}`, error);
        return false; 
      }
    };
    // Regular bookings
    for (let booking of data) {
      const utcDate = new Date(booking.date); 
      const IST_OFFSET = 5.5 * 60 * 60 * 1000;
      const istTime = new Date(utcDate.getTime() + IST_OFFSET);
      const istDatePart = istTime.toISOString().split('T')[0];
      const [hours, minutes = '00'] = booking.time.split(':'); 
      const bookingDateTime = new Date(`${istDatePart}T${hours.padStart(2, '0')}:${minutes.padEnd(2, '0')}:00+05:30`);
      console.log("istTime:", istTime);
      console.log("BookingDateTime IST:", bookingDateTime);
      console.log("Current time (UTC):", today);
      console.log("Current time (IST):", new Date(today.getTime() + IST_OFFSET));
      
      const turf = await this.turfRepo.getTurfByTurfId(booking.turfId);
      const bookingWithTurf = {
        id: booking.id.toString(),
        turfId: booking.turfId,
        turfName: turf?.name || '',
        turfImage: turf?.turfPhotos || [],
        location: { city: turf?.location?.city, state: turf?.location?.state },
        date: booking.date,
        startTime: booking.time,
        duration: booking.duration,
        price: booking.price,
        currency: "₹",
        status: booking.status,
        sport: "Football"
      };
      if (bookingDateTime > today) {
        upcoming.push(bookingWithTurf);
      } else {
        past.push(bookingWithTurf);
      }
    }

    // Joined Shared Games
    const joinedGamesData = await this.bookingRepo.find();
    const userJoinedGames = joinedGamesData.filter((game: ISharedBookingEntity) =>
        game.userIds.some((val) => val._id.toString() === userId)
    );

    const upcomingJoined: any[] = [];
    const pastJoined: any[] = [];
    console.log("inside cond",joinedGamesData);
    for (let game of userJoinedGames) {
  
        const turf = await this.turfRepo.getTurfByTurfId(game.turfId);
        const walletBalance = game.walletSum

        const sharedGameFormatted = {
            id: game?.id.toString(),
            turfId: game.turfId,
            turfName: turf?.name || '',
            turfImage: turf?.turfPhotos || [],
            location: { city: turf?.location?.city, state: turf?.location?.state },
            date: game.date,
            startTime: game.time,
            duration: game.duration,
            price: game.price,
            currency: "₹",
            status: game.status,
            sport: "Football",
            walletBalance,
            playerCount: game.playerCount,
            // isHost: game.hostId === userId,
            // canConfirmSlot: game.hostId === userId && game.isSlotLocked === false,
            joinedUsers: game.userIds
    };

    if (isUpcoming(game.date,game.time)) {
        upcomingJoined.push(sharedGameFormatted);
    } else {
        pastJoined.push(sharedGameFormatted);
    }
    }

    return {
        upcoming,
        past,
        joinedGames: {
            upcoming: upcomingJoined,
            past: pastJoined
        }
    };
    }
}
