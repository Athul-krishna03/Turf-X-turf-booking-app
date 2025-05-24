import { inject, injectable } from "tsyringe";
import { IGetAllHostedGamesUseCase } from "../../entities/useCaseInterfaces/turf/IGetAllHostedGamesUseCase";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { IHostedGame } from "../../shared/dtos/hostGame.dto";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";
import { ITurfEntity } from "../../entities/models/turf.entity";

@injectable()
export class GetAllHostedGamesUseCase implements IGetAllHostedGamesUseCase {
  constructor(
    @inject("IBookingRepository")
    private bookingRepo: IBookingRepository,
     @inject("ITurfRepository")
    private turfRepo: ITurfRepository
) {}
async execute(userId: string): Promise<IHostedGame[]> {
    const data = await this.bookingRepo.find();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const filtered = data.filter((game) => {
        const gameDate = new Date(game.date);
        gameDate.setHours(0, 0, 0, 0);
            
        return game.userIds[0]?._id.toString() !== userId && gameDate >= today;
    });
    const mapped = await Promise.all(
    filtered.map(async (game) => {
        const turf = await this.turfRepo.getTurfByTurfId(game.turfId) as ITurfEntity;
        console.log("games", game);
        return {
            title: "Friendly Match",
            hostName: (game.userIds[0]?.name as string) || "Unknown",
            venueName: turf.name || "Unknown Venue",
            location: turf?.location?.city || "Unknown Location",
            date: game.date,
            time: game.time || "N/A",
            duration: game.duration,
            playersJoined: game.userIds.length,
            playerCount: game.playerCount,
            amountPerPlayer: Math.floor(game.price / game.playerCount),
            sportType: "football",
            description: "Join the game and showcase your skills!",
            status: game.status,
            imageUrl: turf.turfPhotos[0] || undefined,
            userIds: game.userIds,
        };
    })
    );

    return mapped
}
}
