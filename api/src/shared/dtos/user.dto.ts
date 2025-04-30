import {TRole} from '../constants'

export interface LoginUserDTO{
    email:string;
    password:string;
    role:TRole
}

export interface UserDTO {
    name:string,
    email:string,
    phone:string,
    password:string,
    role: TRole
}

export interface TurfRegisterDTO extends UserDTO {
    courtSize: string;
    turfPhotos:string[];
    aminities: string[];
}
export interface ClientProfileResponse{
    name:string;
    phone:number;
    profileImage:string;
    bio:string;
    email:string;
    joinedAt: Date;
    role: string;
}

export interface TurfProfileResponse{
    name:string;
    email:string;
    phone:number;
    turfPhotos:string[];
    aminities: string[];
    location:object;
}