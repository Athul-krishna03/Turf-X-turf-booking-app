import {Request,Response} from 'express';
import {BaseRoute} from '../baseRoute';


export  class AuthRoutes extends BaseRoute{
    constructor(){
        super()
    }
    protected initializeRoutes(): void {
        this.router.post("/signup",(req:Request,res:Response)=>{
            
        })
    }
}