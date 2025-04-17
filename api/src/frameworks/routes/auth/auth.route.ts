import {Request,Response} from 'express';
import {BaseRoute} from '../baseRoute';
import { authController } from '../../di/resolver';


export  class AuthRoutes extends BaseRoute{
    constructor(){
        super()
    }
    protected initializeRoutes(): void {
        this.router.post("/signup",(req:Request,res:Response)=>{
            authController.register(req,res)
        }),

        this.router.post('/login',(req:Request,res:Response)=>{
            authController.login(req,res)
        }),

        this.router.post('/send-otp',(req:Request,res:Response)=>{
            authController.sendOtpEmail(req,res)
        })

        this.router.post('/verify-otp',(req:Request,res:Response)=>{
            authController.verifyOtp(req,res)
        })

        this.router.post('/google-auth',(req:Request,res:Response)=>{
            authController.googleAuth(req,res)
        })
    }
}