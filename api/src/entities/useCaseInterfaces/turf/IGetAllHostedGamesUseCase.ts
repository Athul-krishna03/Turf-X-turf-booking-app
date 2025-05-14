import { IHostedGame } from "../../../shared/dtos/hostGame.dto";


export interface IGetAllHostedGamesUseCase{
    execute(userId:string): Promise<IHostedGame[]>
}