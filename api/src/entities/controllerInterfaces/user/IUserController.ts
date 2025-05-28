import { Request,Response } from "express"

export interface IUserController{
    getAllUsers(req:Request,res:Response):Promise<void>
    updateUserStatus(req:Request,res:Response):Promise<void>
    editUser(req:Request,res:Response):Promise<void>
    updateUserPassword(req:Request,res:Response):Promise<void>
    getWalletDetails(req: Request,res: Response): Promise<void>
}