import { NextFunction, Request,Response } from "express";
import { JWTService } from "../services/JwtTokenService";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGES,HTTP_STATUS } from "../../shared/constants";
import redisClient from "../../frameworks/redis/redisClient";
import { handleErrorResponse } from "../../shared/utils/errorHandler";

const tokenService = new JWTService();

export interface CustomJwtPayload extends JwtPayload{
    id:string,
    email:string,
    role:string,
    access_token:string,
    refresh_token:string
}

export interface CustomRequest extends Request{
    user:CustomJwtPayload;
}

const extractToken = (req:Request):{access_token:string,refresh_token:string} | null=>{
    const pathSegment = req.path.split("/");
    const routeIndex = pathSegment.indexOf("");
    console.log(req.path)
    console.log(pathSegment)
    console.log(routeIndex)
    if(routeIndex !== -1 && pathSegment[routeIndex + 1]){
     const userType = pathSegment[routeIndex + 1];
        console.log("HELLO",userType)
        console.log("access_token:",req.cookies[`${userType}_access_token`])
     return{
        access_token:req.cookies[`${userType}_access_token`],
        refresh_token:req.cookies[`${userType}_refresh_token`]
     };
    }
    return null;
}

const isBlacklisted = async (token:string):Promise<boolean> => {
    const result = await redisClient.get(token)
    return result !== null;
}

export const verifyAuth = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
try {
    const token = extractToken(req);
    console.log("extract token ",token)
    if(!token){
        console.log("There is no token");
        res.status(HTTP_STATUS.UNAUTHORIZED).json({message:ERROR_MESSAGES.UNAUTHORIZED_ACCESS})
        return
    }
    if(await isBlacklisted(token.access_token)){
        res.status(HTTP_STATUS.FORBIDDEN).json({message:"Token is blacklisted"});
        return;
    }

    const user = tokenService.verifyAccessToken(
        token.access_token,
    )as CustomJwtPayload;
    console.log("hello ",user)
    if(!user || !user.id){
        console.log("this 1 si triggering");
        res.status(HTTP_STATUS.UNAUTHORIZED).json({message:ERROR_MESSAGES.TOKEN_EXPIRED})
    return;
    }
    (req as CustomRequest).user = {
        ...user,
        access_token:token.access_token,
        refresh_token:token.refresh_token
    };
    next();
} catch (error:any) {
    console.log("secodn is, ",error)
    if(error.name === "TokenExpiredError"){
    res
    .status(HTTP_STATUS.UNAUTHORIZED)
    .json({message:ERROR_MESSAGES.TOKEN_EXPIRED});
    return
    }

    res.status(HTTP_STATUS.UNAUTHORIZED).json({message:ERROR_MESSAGES.INVALID_TOKEN})
}
}

export const authorizeRole = (allowedRoles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const user = (req as CustomRequest).user;

        if(!user || !allowedRoles.includes(user.role)){
            console.log("role not allowed");
            res.status(HTTP_STATUS.FORBIDDEN).json({
                message:ERROR_MESSAGES.NOT_ALLOWED,
                userRole:user ? user.role :"None",
            })
            return 
        }
        next();
    }
}

export const decodeToken = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try {
        const token = extractToken(req);
        console.log("Refresh Token Triggerd");
        if(!token){
            console.log("no token")
            res.status(HTTP_STATUS.UNAUTHORIZED).json({message:ERROR_MESSAGES.UNAUTHORIZED_ACCESS})
            return;
        }
        if(await isBlacklisted(token.access_token)){
            console.log("token is black listed");
            res.status(HTTP_STATUS.FORBIDDEN).json({message:"Token is blacklisted"});
            return
        }
        const user = tokenService.decodeAccessToken(token?.access_token);
        (req as CustomRequest).user = {
            id:user?.id,
            email: user?.email,
            role: user?.role,
            access_token: token.access_token,
            refresh_token: token.refresh_token,
          };
          next();
    } catch (error) {
        handleErrorResponse(res,error)
    }
}









