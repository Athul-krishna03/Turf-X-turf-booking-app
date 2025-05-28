// jobs/BookingDeadlineChecker.ts
import { inject, injectable } from "tsyringe";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { ISharedBookingEntity } from "../../entities/models/sharedBooking.entity";
import { IClientRepository } from "../../entities/repositoryInterface/client/IClient-repository.interface";
import { IDeleteUnfilledGamesUseCase } from "../../entities/useCaseInterfaces/IDeleteUnfilledGamesUseCase";
// import { processRefund } from "../../utils/paymentGateway"; // Mock Stripe
// import { notifyPlayer, notifyHost } from "../../utils/notifications"; // Mock Firebase/Twilio

@injectable()
export class DeleteUnfilledGamesUseCase  implements IDeleteUnfilledGamesUseCase{
  constructor(
    @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
    @inject("IClientRepository") private _clientRepo: IClientRepository,
  ) {}

  async checkDeadlines(): Promise<void> {
    try {
      // Find bookings within 2 hours of start time
      const now = new Date();
      const deadline = new Date(now.getTime() + 6 * 60 * 60 * 1000); // 2 hours from now
      // Adjust this call to match your repository's interface, e.g.:
      // const bookings = await this._bookingRepo.findPendingWithinDeadline(now, deadline);
      // Or, if you need to filter in-memory:
      const allBookings = await this._bookingRepo.find();
      const bookings = allBookings.filter(booking => {
        if (booking.status !== "Pending" || booking.isSlotLocked) return false;
        const bookingDate = new Date(`${booking.date}T${booking.time}:00+05:30`);
        return bookingDate >= now && bookingDate <= deadline;
      });

      for (const booking of bookings) {
        const totalPaid = Object.values(booking.walletContributions).reduce(
          (sum, amt) => sum + amt,
          0
        );
        if (
          booking.playerCount < booking.userIds.length ||
          totalPaid < booking.price
        ) {
          try {
            // Cancel booking
            await this._bookingRepo.updateJoinedGameBookingStatus(booking.id, {
                status: "Cancelled",
                cancelledUsers: booking.userIds,
                refundsIssued: booking.walletContributions,
            });

            // Process refunds
            for (const userId of booking.userIds) {
              const amount = booking.walletContributions.get(userId) || 0;
              try {
                await this._clientRepo.findByIdAndUpdateWallet(userId, booking.price/booking.playerCount);
              } catch (refundError:any) {
                console.error("Refund failed:", {
                  userId,
                  bookingId: booking.id,
                  error: refundError.message,
                });
                // Log to a failed refunds collection for retry
              }
            }

            // notifyHost(
            //   booking.hostId,
            //   `Booking ${booking._id} canceled: not enough players.`
            // );
          } catch (updateError:any) {
            console.error("Failed to cancel booking:", {
              bookingId: booking.id,
              error: updateError.message,
            });
          }
        }
      }
    } catch (error) {
      console.error("BookingDeadlineChecker error:", error);
    }
  }
}
