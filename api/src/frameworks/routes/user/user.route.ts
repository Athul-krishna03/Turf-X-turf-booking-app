import { Response ,Request} from "express";
import { authorizeRole, verifyAuth } from "../../../interface/middlewares/authMiddleware";
import { BaseRoute } from "../baseRoute";
import { authController, userController } from "../../di/resolver";
import { BlockStatusMiddleware } from "../../../interface/middlewares/blockstatusMiddleware";

export class ClientRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected initializeRoutes(): void {
        this.router.post(
            "/user/logout",
            verifyAuth,
            authorizeRole(["user"]),
            (req:Request,res:Response)=>{
                console.log("logout");
                authController.logout(req,res)
                
            }
        ),

        this.router.patch(
            "/user/edit-profile",
            verifyAuth,
            authorizeRole(["user"]),
            
            (req:Request,res:Response)=>{
                console.log("edit user");
                userController.editUser(req,res)
                
            }
        )
    }
}