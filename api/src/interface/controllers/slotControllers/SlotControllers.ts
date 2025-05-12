import { Request, Response } from "express";
import { ISlotController } from "../../../entities/controllerInterfaces/slot/ISlotController";
import { inject, injectable } from "tsyringe";
import { ISlotRepository } from "../../../entities/repositoryInterface/turf/ISlotRepository";
import { ISlotService } from "../../../entities/services/ISlotService";
import { IBookingSlotUseCase } from "../../../entities/useCaseInterfaces/IBookingSlotUseCase";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { IUpdateSlotStatusUseCase } from "../../../entities/useCaseInterfaces/IUpdateSlotStatusUseCase";
import { IPaymentService } from "../../../entities/services/IPaymentService";
import { IRedisClient } from "../../../entities/services/IRedisClient";
import { IGetSlotDataUseCase } from "../../../entities/useCaseInterfaces/slot/IGetSlotDataUseCase";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";



@injectable()
export class SlotController implements ISlotController {
  constructor(
    @inject("ISlotRepository") private slotRepo: ISlotRepository,
    @inject("ISlotService") private slotService:ISlotService,
    @inject("IBookingSlotUseCase") private bookingSlotUseCase:IBookingSlotUseCase,
    @inject("IUpdateSlotStatusUseCase") private updateSlotStatusUseCase:IUpdateSlotStatusUseCase,
    @inject("IPaymentService") private paymentService:IPaymentService,
    @inject("IRedisClient") private redis:IRedisClient,
    @inject("IGetSlotDataUseCase") private getSlotDetials:IGetSlotDataUseCase
  ) {}

  async updateSlot(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as CustomRequest).user.id;
    const { isBooked, price, duration, slotId, paymentIntentId, date,slotLockId,paymentType } = req.body;
    console.log("booking body",req.body);
    

    const isPaymentValid = await this.paymentService.verifyPaymentIntent(paymentIntentId);
    if (!isPaymentValid) {
      res.status(400).json({ success: false, message: "Payment not completed" });
      return
    }

    const slot = await this.slotRepo.findById(slotId);
    const turfId = slot.turfId;
    const slots = await this.slotService.validateAndGetSlots(slotId, duration);
    const bookedSlots = await this.slotService.bookSlots(slots);
    const lockKey = `slot_lock:${slotId}`;

    const book = await this.bookingSlotUseCase.execute(userId, turfId, bookedSlots, duration, price, date,paymentType);
    if (!book) {
      await this.redis.releaseLock(slotLockId,lockKey)
      res.status(400).json({ success: false, message: "Booking not completed" });
      return
    }

    res.json({ success: true, bookedSlots });
  } catch (error) {
    console.error("Slot update failed:", error);
    res.status(500).json({ error: "Failed to update slot" });
  }
}


async updateSlotStatus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.query as { id: string };
    console.log("qury",id);
    
    await this.updateSlotStatusUseCase.execute(id);
    res.status(200).json({ success: true, message: "Slot status updated" });
  } catch (error) {
    console.error("Error updating slot status:", error);
    res.status(500).json({ success: false, message: "Failed to update slot status" });
  }
}

async getSlot(req:Request,res:Response):Promise<void>{
  try {
    const {slotId} = req.query as {slotId:string};
    console.log("slot id in get slot",slotId);
    
    const slotData=await this.getSlotDetials.execute(slotId);
    if(!slotData){
      res.status(HTTP_STATUS.NOT_FOUND).json({success:false,message:"Data not found"})
    }else{
      res.status(HTTP_STATUS.OK).json({success:true,message:"data fetched successfully",slotData})
    }
  } catch (error) {
    handleErrorResponse(res,error);
  }
}

}