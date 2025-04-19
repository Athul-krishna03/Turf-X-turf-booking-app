import { Request, Response } from "express";

export interface ITurfControllers{
    getAllTurfs(req:Request,res:Response):Promise<void>
}