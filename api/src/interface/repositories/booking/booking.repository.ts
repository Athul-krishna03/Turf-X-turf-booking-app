import { IBookingEntity } from "../../../entities/models/booking.entity";
import { ISharedBookingEntity } from "../../../entities/models/sharedBooking.entity";
import { IBookingRepository } from "../../../entities/repositoryInterface/booking/IBookingRepository";
import { BookingModel } from "../../../frameworks/database/models/booking.model";
import {SharedSlotBookingModel} from "../../../frameworks/database/models/sharedSlotBooking.model";

export class BookingRepository implements IBookingRepository {
    async save(data: Partial<IBookingEntity>): Promise<IBookingEntity> {
        const result = await BookingModel.create(data);
        return {
        id: result._id.toString(),
        ...result,
        };
    }
    async getUserBookingDetials(userId: string): Promise<IBookingEntity[]> {
        const result = await BookingModel.find({ userId: userId });
        return result as unknown as IBookingEntity[];
    }

    async getAllBooking(): Promise<IBookingEntity[]> {
        const result = await BookingModel.find();
        return result as IBookingEntity[];
    }

    async find(): Promise<ISharedBookingEntity[]> {
        const raw = await SharedSlotBookingModel.find().populate(
        "userIds",
        "name email profileImage"
        );
        console.log("raw inside find", raw);

        return raw.map((doc) => {
        const walletContributions: Map<string, number> = doc.walletContributions;
        const walletSum = Array.from(walletContributions.values()).reduce(
            (sum, val) => sum + val,
            0
        );

        return {
            id: doc._id.toString(),
            userIds: doc.userIds,
            walletContributions,
            walletSum: walletSum,
            turfId: doc.turfId,
            time: doc.time,
            duration: doc.duration,
            price: doc.price,
            date: doc.date,
            status: doc.status,
            isSlotLocked: doc.isSlotLocked,
            playerCount: doc.playerCount,
            createdAt: doc.createdAt,
        };
        });
    }

    async findById(id: string): Promise<ISharedBookingEntity> {
        const data = await SharedSlotBookingModel.findById({ _id: id }).populate(
        "userIds"
        );
        return data as ISharedBookingEntity;
    }

    async saveSharedBooking(
        data: Partial<ISharedBookingEntity>
    ): Promise<ISharedBookingEntity> {
        const result = await SharedSlotBookingModel.create(data);
        return result as ISharedBookingEntity;
    }

    async joinGame(data: {
        date: string;
        slotId: string;
        userId: string;
        price: number;
    }): Promise<ISharedBookingEntity | null> {
        try {
        console.log("data inside repo", data);

        const result = await SharedSlotBookingModel.findOneAndUpdate(
            {
            date: data.date,
            time: data.slotId,
            userIds: { $nin: [data.userId] },
            },
            {
            $addToSet: { userIds: data.userId },
            $set: { [`walletContributions.${data.userId}`]: data.price },
            },
            { new: true }
        );
        console.log("data in respo ", result);

        return result as ISharedBookingEntity;
        } catch (error) {
        console.error("BookingRepository joinGame error:", error);
        throw new Error("Failed to join game");
        }
    }

    async cancelNormalGame(bookingId: string): Promise<IBookingEntity | null> {
        return await BookingModel.findByIdAndUpdate(
        bookingId,
        { $set: { status: "Cancelled" } },
        { new: true } 
    );
    }

async cancelGame(data: {bookingId: string;userId: string;isHost: boolean;}): Promise<ISharedBookingEntity | null> {
    try {
    const booking = await SharedSlotBookingModel.findOne({_id: data.bookingId});

    if (!booking) {
        throw new Error("Booking not found or already locked/canceled");
    }
    const gameTime = new Date(`${booking.date}T${booking.time}:00`);
    const cancellationWindow = new Date(gameTime.getTime() - 12 * 60 * 60 * 1000); // 12 hours before
    const now = new Date();
    
    if (booking.userIds[0] == data.userId || data.isHost) {
        const result = await SharedSlotBookingModel.findOneAndUpdate(
        { _id: data.bookingId },
        {
            $set: {
                status: "Cancelled",
                cancelledUsers: booking.userIds,
                refundsIssued: booking.walletContributions,
                updatedAt: new Date(),
            },
            },
            { new: true }
        );

        // for (const userId of booking.userIds) {
        //     await processRefund(userId, booking.walletContributions[userId]);
        //     notifyPlayer(userId, "Booking canceled by host. Full refund issued.");
        // }
        // notifyHost(
        //     booking.hostId || booking.userIds[0],
        //     "You canceled the booking. Penalty may apply."
        // );

        return result as ISharedBookingEntity | null;
    } else {
        // Player cancels
        if (!booking.walletContributions.get(data.userId)){
            throw new Error("User not in booking");
        }
        const amount = booking.walletContributions.get(data.userId);
        const refundAmount = now < cancellationWindow ? amount : amount || 0 * 0.5; // 50% refund if late

        const result = await SharedSlotBookingModel.findOneAndUpdate(
            { _id: data.bookingId },
            {
                $pull: { userIds: data.userId },
                $unset: { [`walletContributions.${data.userId}`]: "" },
                $addToSet: { cancelledUsers: data.userId },
                $set: {
                [`refundsIssued.${data.userId}`]: refundAmount,
                updatedAt: new Date(),
                },
            },
            { new: true }
        );

        // await processRefund(data.userId, refundAmount);
        // notifyPlayer(data.userId, `Slot canceled. Refund: $${refundAmount}`);
        // notifyHost(
        //   booking.hostId || booking.userIds[0],
        //   `Player ${data.userId} canceled. Slot reopened.`
        // );

        return booking as ISharedBookingEntity | null;
    }
    } catch (error) {
        console.error('BookingRepository cancelGame error:', error);
        throw new Error('Failed to cancel game');
    }
}
    async updateJoinedGameBookingStatus(bookingId: string, data: Partial<ISharedBookingEntity>): Promise<ISharedBookingEntity | null> {
        try {
            const updatedBooking = await SharedSlotBookingModel.findByIdAndUpdate(
            bookingId,
            { $set: data },
            { new: true }
            );
            return updatedBooking as ISharedBookingEntity | null;
        } catch (error) {
            throw new Error('Failed to update booking status');
        }
    }
}
