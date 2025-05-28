import { Request, Response } from "express";
import { ISlotController } from "../../../entities/controllerInterfaces/slot/ISlotController";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { IUpdateSlotStatusUseCase } from "../../../entities/useCaseInterfaces/IUpdateSlotStatusUseCase";
import { IGetSlotDataUseCase } from "../../../entities/useCaseInterfaces/slot/IGetSlotDataUseCase";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";
import { BookingRequestSchema } from "../../../shared/dtos/booking.dto";
import { SlotBookingService } from "../../services/BookingServices";



@injectable()
export class SlotController implements ISlotController {
  constructor(
    @inject("IUpdateSlotStatusUseCase") private updateSlotStatusUseCase: IUpdateSlotStatusUseCase,
    @inject("IGetSlotDataUseCase") private getSlotDetails: IGetSlotDataUseCase,
    @inject(SlotBookingService) private slotBookingService: SlotBookingService // <== Injected service
  ) {}

  async updateSlot(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as CustomRequest).user.id;

      const parseResult = BookingRequestSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Invalid request",
          errors: parseResult.error.errors,
        });
        return;
      }

      const bookingData = parseResult.data;
      console.log("Booking dataSingle:", bookingData);
      const { bookedSlots } = await this.slotBookingService.bookSlot({ ...bookingData, userId });

      res.status(HTTP_STATUS.OK).json({ success: true, bookedSlots });
    } catch (error: any) {
      console.error("Slot update failed:", error);
      handleErrorResponse(res, error);
    }
  }

  async updateSlotStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.query as { id: string };
      await this.updateSlotStatusUseCase.execute(id);
      res.status(HTTP_STATUS.OK).json({ success: true, message: SUCCESS_MESSAGES.SLOT_STATUS_UPDATED });
    } catch (error) {
      console.error("Error updating slot status:", error);
      handleErrorResponse(res, error);
    }
  }

  async getSlot(req: Request, res: Response): Promise<void> {
    try {
      const { slotId } = req.query as { slotId: string };
      const slotData = await this.getSlotDetails.execute(slotId);
      if (!slotData) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: "Data not found" });
      } else {
        res.status(HTTP_STATUS.OK).json({ success: true, message: "Data fetched successfully", slotData });
      }
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
}
