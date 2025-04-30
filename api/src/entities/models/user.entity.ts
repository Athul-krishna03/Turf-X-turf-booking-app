import { TRole } from "../../shared/constants";
export interface IUserEntity{
    id?: string;
    name?: string;
    email?: any;
    password: string;
    phone?: string;
    profileImage?: string;
    googleId: string;
    walletBalance?: number;
    joinedAt?: Date;
    role: TRole;
    bio:string,
    isBlocked: Boolean;

    // only for normal player user
    position?:string;
}