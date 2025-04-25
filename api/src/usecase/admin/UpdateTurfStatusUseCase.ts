import { inject, injectable } from "tsyringe";
import { IUpdateTurfStatusUseCase } from "../../entities/useCaseInterfaces/admin/IUpdateTurfStatusUseCase";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";

@injectable()
export class UpdateTurfStatusUseCase implements IUpdateTurfStatusUseCase{
    constructor(
        @inject("ITurfRepository") private turfRepository:ITurfRepository
    ){}
    async execute(id: string): Promise<void> {
        await this.turfRepository.findByIdAndUpdateStatus(id);
    }
}