import { Response } from "express";
import { config } from "../config";

export const setAuthCookies=(
    res:Response,
    accessToken:string,
    refreshToken:string,
    accessTokenName:string,
    refreshTokenName:string
)=>{
    const isProduction = config.server.NODE_ENV === "production";

    res.cookie(accessTokenName,accessToken,{
        httpOnly:true,
        secure:isProduction,
        sameSite:"strict"
    })

    res.cookie(refreshTokenName,refreshToken,{
        httpOnly:true,
        secure:isProduction,
        sameSite:"strict"
    })
}