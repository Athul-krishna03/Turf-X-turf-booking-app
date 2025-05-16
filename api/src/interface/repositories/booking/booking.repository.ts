import { IBookingEntity } from "../../../entities/models/booking.entity";
import { ISharedBookingEntity } from "../../../entities/models/sharedBooking.entity";
import { IBookingRepository } from "../../../entities/repositoryInterface/booking/IBookingRepository";
import { BookingModel } from "../../../frameworks/database/models/booking.model";
import { SharedSlotBookingModel } from "../../../frameworks/database/models/sharedSlotBooking.model";
import { TurfModel } from "../../../frameworks/database/models/turf.model";
import { ITurfEntity } from "../../../entities/models/turf.entity";
import { IHostedGame } from "../../../shared/dtos/hostGame.dto";


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

    async find(userId:string):Promise<IHostedGame[]>{
        const result = await SharedSlotBookingModel.find().populate("userIds","name email profileImage")

        const filtered = result.filter((game) => {
        return game.userIds[0]?._id.toString() !== userId;
    });
        const mapped = await Promise.all(
            filtered.map(async (game) => {
                const turf = await TurfModel.findOne({turfId:game.turfId}).lean() as ITurfEntity
                console.log("games",game);
                
                return{
                    title:"Friendly Match",
                    hostName: game.userIds[0]?.name as string || "Unknown",
                    venueName: turf.name || "Unknown Venue",
                    location: turf?.location?.city || "Unknown Location",
                    date: game.date,
                    time: game.time || "N/A",
                    duration:game.duration,
                    playersJoined: game.userIds.length,
                    playerCount: game.playerCount,
                    amountPerPlayer: Math.floor(game.price / game.playerCount),
                    sportType:"football",
                    description: "Join the game and showcase your skills!",
                    status: game.status,
                    imageUrl: turf.turfPhotos[0] || undefined,
                    userIds: game.userIds,
                }
            })
        )
        return mapped
    }

    async saveSharedBooking(data: Partial<ISharedBookingEntity>): Promise<ISharedBookingEntity> {
        const result = await SharedSlotBookingModel.create(data);
        return result as ISharedBookingEntity
    }

    async joinGame(data: { date: string; slotId: string; userId: string; price: number }): Promise<ISharedBookingEntity | null> {
        console.log("data inside repo",data);
        
        const result = await SharedSlotBookingModel.findOneAndUpdate(
        { date: data.date, time: data.slotId },
        {
            $addToSet: { userIds: data.userId },
            $set: { [`walletContributions.${data.userId}`]: data.price }
        },
        { new: true } 
    );
    console.log("data in respo ",result);
    
    return result as ISharedBookingEntity
}

}