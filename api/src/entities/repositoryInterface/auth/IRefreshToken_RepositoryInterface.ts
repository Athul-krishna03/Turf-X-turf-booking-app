import { TRole } from "../../../shared/constants";

export interface IRefreshTokenRepository{
    revokeRefreshToken(token: string): unknown;
    save(data:{
        token:string;
        userType:TRole,
        user:string;
        expiresAt:number;
    }):Promise<void>;
}