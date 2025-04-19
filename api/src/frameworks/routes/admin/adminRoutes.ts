
import { authController, turfController, userController } from "../../di/resolver";
import { BaseRoute } from "../baseRoute";
import { Request,Response } from "express";


export class AdminRoutes extends BaseRoute{
    constructor(){
        super()
    }
    protected initializeRoutes(): void {
        // this.router.post(
        //     "/admin/logout",
        //     (req:Request,res:Response)=>{
        //         authController.logout(req,res);
        //     }
        // )

        this.router.get(
            "/admin/get-Users",
            (req:Request,res:Response)=>{
                userController.getAllUsers(req,res)
            }
        ),

        this.router.get(
            "/admin/get-Turfs",
            (req:Request,res:Response)=>{
                turfController.getAllTurfs(req,res)
            }
        )
    }
}