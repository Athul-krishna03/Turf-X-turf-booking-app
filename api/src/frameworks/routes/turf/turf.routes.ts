import { authorizeRole, decodeToken, verifyAuth } from "../../../interface/middlewares/authMiddleware"
import { authController, blockStatusMiddleware, turfController } from "../../di/resolver"
import { BaseRoute } from "../baseRoute"
import { Request,RequestHandler,Response } from "express"

export class TurfRoutes extends BaseRoute{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post(
            "/turf/logout",
            verifyAuth,
            authorizeRole(["turf"]),
            (req:Request,res:Response)=>{
                console.log("logout");
                authController.logout(req,res)
            }
        ),
        this.router.post(
            "/turf/refresh-token",
            decodeToken,
            (req:Request,res:Response)=>{
                console.log("refresh Token triggered");
                authController.refreshToken(req,res);
            }
        ),
        this.router.post(
            "/turf/generateSlots",
            verifyAuth,
            authorizeRole(["turf"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                console.log("inside route save");
                turfController.generateSlots(req,res);
            }
        ),
        this.router.patch(
            "/turf/updateProfile",
            verifyAuth,
            authorizeRole(["turf"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                console.log(req.body);
                
                turfController.editTurf(req,res)
            }
        ),
        this.router.patch(
            "/turf/change-password",
            verifyAuth,
            authorizeRole(["turf"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                turfController.updateTurfPassword(req,res);
            }
        )
    }

}