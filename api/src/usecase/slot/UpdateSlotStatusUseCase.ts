import { inject, injectable } from "tsyringe";
import { IUpdateSlotStatusUseCase } from "../../entities/useCaseInterfaces/IUpdateSlotStatusUseCase";
import { ISlotRepository } from "../../entities/repositoryInterface/turf/ISlotRepository";
import { ISlot } from "../turf/GenerateSlotsUseCase";

@injectable()
export class UpdateSlotStatusUseCase implements IUpdateSlotStatusUseCase {
  constructor(@inject("ISlotRepository") private slotRepo: ISlotRepository) {}
  async execute(slotId: string): Promise<ISlot | null> {
    console.log("slotId", slotId);

    const updateSlot = await this.slotRepo.update(slotId, { isBooked: true });
    console.log(updateSlot);

    if (!updateSlot) {
      throw new Error("Failed to update slot status");
    }
    return updateSlot;
  }
}
