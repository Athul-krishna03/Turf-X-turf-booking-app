import { AdminRoutes } from "../admin/adminRoutes";
import { BaseRoute } from "../baseRoute";

export class PrivateRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected initializeRoutes(): void {
        this.router.use('/_ad',new AdminRoutes().router)
    }
}