
import { authorizeRole, decodeToken, verifyAuth } from "../../../interface/middlewares/authMiddleware";
import { authController, turfController, userController } from "../../di/resolver";
import { BaseRoute } from "../baseRoute";
import { Request,Response } from "express";


export class AdminRoutes extends BaseRoute{
    constructor(){
        super()
    }
    protected initializeRoutes(): void {
        this.router.post(
            "/admin/logout",
            verifyAuth,
            authorizeRole(["admin"]),
            (req:Request,res:Response)=>{
                authController.logout(req,res);
            }
        )

        this.router.get(
            "/admin/get-Users",
            verifyAuth,
            authorizeRole(["admin"]),
            (req:Request,res:Response)=>{
                userController.getAllUsers(req,res)
            }
        ),

        this.router.get(
            "/admin/get-Turfs",
            verifyAuth,
            authorizeRole(["admin"]),
            (req:Request,res:Response)=>{
                turfController.getAllTurfs(req,res)
            }
        ),
        this.router.get(
            "/admin/get-Requests",
            verifyAuth,
            authorizeRole(["admin"]),
            (req:Request,res:Response)=>{
                turfController.getAllTurfRequest(req,res)
            }
        )
        this.router.patch(
            "/admin/user-status/:userId",
            verifyAuth,
            authorizeRole(["admin"]),
            (req:Request,res:Response)=>{
                userController.updateUserStatus(req,res)
            }
        ),
        this.router.patch(
            "/admin/turf-status/:turfId",
            verifyAuth,
            authorizeRole(["admin"]),
            (req:Request,res:Response)=>{
                turfController.updateTurfStatus(req,res)
            }
        ),
        this.router.patch(
            "/admin/request-status/:turfId",
            verifyAuth,
            authorizeRole(["admin"]),
            (req:Request,res:Response)=>{
                turfController.updateTurfRequestStatus(req,res)
            }
        ),
        
        this.router.post(
            "/admin/refresh_token",
            decodeToken,
            (req:Request,res:Response)=>{
                authController.refreshToken(req,res)
            }
    
        )
        
    }
}