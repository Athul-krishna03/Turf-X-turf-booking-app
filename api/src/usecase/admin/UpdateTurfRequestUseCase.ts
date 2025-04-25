import { inject, injectable } from "tsyringe";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";
import { IUpdateTurfRequestUseCase } from "../../entities/useCaseInterfaces/admin/IUpdateTurfRequestUseCase";
import { INodemailerService } from "../../entities/services/INodeMailerService";

@injectable()
export class UpdateTurfRequestUseCase implements IUpdateTurfRequestUseCase{
    constructor(
        @inject("ITurfRepository") private turfRepository:ITurfRepository,
        @inject("INodemailerService") private nodeMailerService:INodemailerService
    ){}
    async execute(id: string,status:string,reason:string): Promise<void> {
        const sub="Registration request Update";
        const turf = await this.turfRepository.findById(id);
        if(turf){
            await this.nodeMailerService.sendEmail(turf?.email,sub,reason)
            console.log("mail sended ");
            
        }
        
        await this.turfRepository.findByIdAndUpdateRequest(id,status);
    }
}