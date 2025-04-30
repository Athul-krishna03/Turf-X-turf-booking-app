import { Response ,Request , RequestHandler} from "express";
import { authorizeRole, decodeToken, verifyAuth } from "../../../interface/middlewares/authMiddleware";
import { BaseRoute } from "../baseRoute";
import { authController, blockStatusMiddleware, turfController, userController } from "../../di/resolver";


export class ClientRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected initializeRoutes(): void {

        this.router.post(
            "/user/refresh-token",
            decodeToken,
            (req:Request,res:Response)=>{
            console.log("refresh Token triggered");
            authController.refreshToken(req,res);
            }
        ),
        this.router.post(
            "/user/logout",
            verifyAuth,
            authorizeRole(["user"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                console.log("logout");
                authController.logout(req,res)
                
            }
        ),

        this.router.patch(
            "/user/edit-profile",
            verifyAuth,
            authorizeRole(["user"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                console.log("edit user");
                userController.editUser(req,res)
                
            }
        ),

        this.router.patch(
            "/user/change-password",
            verifyAuth,
            authorizeRole(["user"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                userController.updateUserPassword(req,res);
            }
        ),
        this.router.get(
            "/user/get-Turfs",
            verifyAuth,
            authorizeRole(["user"]),
            (req:Request,res:Response)=>{
                turfController.getAllTurfs(req,res)
            }
        )
    }
}