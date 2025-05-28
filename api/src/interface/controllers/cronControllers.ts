import { inject, injectable } from "tsyringe";
import cron from 'node-cron'
import { IDeleteExpiredSlotsUseCase } from "../../entities/useCaseInterfaces/IDeleteExpiredSlotsUseCase";
import { IDeleteUnfilledGamesUseCase } from "../../entities/useCaseInterfaces/IDeleteUnfilledGamesUseCase";

@injectable()
export class CronController{
    constructor ( 
    @inject("IDeleteExpiredSlotsUseCase")
    private _deleteExpiredSlotsUseCase:IDeleteExpiredSlotsUseCase,
    @inject("IDeleteUnfilledGamesUseCase")
    private _deleteUnfilledGamesUseCase:IDeleteUnfilledGamesUseCase
){}

    setupCronJob():void{
        cron.schedule('0 * * * *',async () => {
            console.log("Running expired slot cleanup task");
            try {
                await this._deleteExpiredSlotsUseCase.execute();
                console.log("Completed expired slots cleanup");
            } catch (error) {
                console.error('Error in cron job:', error);
            }

            try {
                await this._deleteUnfilledGamesUseCase.checkDeadlines();
                console.log('Completed unfilled games cleanup');
            } catch (error) {
                console.error('Unfilled games cleanup error:', error);
            }
        })
    }
}
