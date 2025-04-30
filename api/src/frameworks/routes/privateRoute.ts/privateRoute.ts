import { AdminRoutes } from "../admin/adminRoutes";
import { BaseRoute } from "../baseRoute";
import { TurfRoutes } from "../turf/turf.routes";
import { ClientRoutes } from "../user/user.route";

export class PrivateRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected initializeRoutes(): void {
        this.router.use('/_ad',new AdminRoutes().router)
        this.router.use('/_us',new ClientRoutes().router)
        this.router.use('/_ts',new TurfRoutes().router)
    }
}