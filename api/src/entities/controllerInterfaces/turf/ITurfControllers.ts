import { Request, Response } from "express";

export interface ITurfControllers{
    getAllTurfs(req:Request,res:Response):Promise<void>
    updateTurfStatus(req:Request,res:Response):Promise<void>
    generateSlots(req:Request,res:Response):Promise<void>
    editTurf(req:Request,res:Response):Promise<void>
    getSlots(req:Request,res:Response):Promise<void>;
    getAllHostedGames(req:Request,res:Response):Promise<void>
}