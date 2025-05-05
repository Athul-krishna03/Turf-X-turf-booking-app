import { Request, Response } from "express";
import { ISlotController } from "../../../entities/controllerInterfaces/slot/ISlotController";
import { inject, injectable } from "tsyringe";
import { ISlotRepository } from "../../../entities/repositoryInterface/turf/ISlotRepository";
import { addHours, format, parse } from "date-fns";

@injectable()
export class SlotController implements ISlotController {
  constructor(
    @inject("ISlotRepository") private slotRepo: ISlotRepository
  ) {}

  async updateSlot(req: Request, res: Response): Promise<void> {
    try {
      const { slotId } = req.params;
      const { isBooked, price, duration } = req.body as { isBooked: boolean; price?: number; duration: number };
      console.log("Updating slot:", { slotId, isBooked, duration});

      // Fetch the initial slot to get turfId and startTime
      const initialSlot = await this.slotRepo.findById(slotId);
      console.log("Initial slot:", initialSlot);
      if (!initialSlot) {
        res.status(404).json({ error: "Slot not found" });
        return;
      }

      if (duration < 1) {
        res.status(400).json({ error: "Duration must be at least 1 hour" });
        return;
      }

      // Handle multi-hour booking
    const updatedSlots: any[] = [];
    if (duration > 1) {
        const { turfId, date, startTime } = initialSlot;
        const startDateTime = parse(startTime, "HH:mm", new Date(date));
        const slotsToUpdate: string[] = [slotId];

        // Find consecutive slots
        for (let i = 1; i < duration; i++) {
            const nextTime = addHours(startDateTime, i);
            const nextTimeStr = format(nextTime, "HH:mm");
            const nextSlot = await this.slotRepo.findOne({ turfId, date, startTime: nextTimeStr });
            console.log(`Checking slot ${nextTimeStr}:`, nextSlot);
            if (!nextSlot || nextSlot.isBooked) {
                res.status(400).json({ error: `Slot at ${nextTimeStr} is unavailable or already booked` });
                return;
        }
        slotsToUpdate.push(nextSlot.id);
        }

        // Update all slots
        for (const id of slotsToUpdate) {
        const updatedSlot = await this.slotRepo.update(id, { isBooked });
        console.log(`Updated slot ${id}:`, updatedSlot);
        if (!updatedSlot) {
            res.status(404).json({ error: `Failed to update slot ${id}` });
            return;
        }
        updatedSlots.push(updatedSlot);
        }
    } else {
        // Single slot update
        const updatedSlot = await this.slotRepo.update(slotId, { isBooked });
        console.log("Updated slot:", updatedSlot);
        if (!updatedSlot) {
        res.status(404).json({ error: "Slot not found" });
        return;
        }
        updatedSlots.push(updatedSlot);
    }

    res.json(updatedSlots);
    } catch (error) {
        console.error("Slot update failed:", error);
        res.status(500).json({ error: "Failed to update slot" });
    }
}
}