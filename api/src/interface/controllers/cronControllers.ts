import { inject, injectable } from "tsyringe";
import cron from 'node-cron'
import { IDeleteExpiredSlotsUseCase } from "../../entities/useCaseInterfaces/IDeleteExpiredSlotsUseCase";

@injectable()
export class CronController{
    constructor ( 
    @inject("IDeleteExpiredSlotsUseCase")
    private deleteExpiredSlotsUseCase:IDeleteExpiredSlotsUseCase
){}

    setupCronJob():void{
        cron.schedule('0 * * * *',async () => {
            console.log("Running expired slot cleanup task");
            try {
                await this.deleteExpiredSlotsUseCase.execute();
                console.log("Completed expired slots cleanup");
            } catch (error) {
                console.error('Error in cron job:', error);
            }
        })
    }
}
