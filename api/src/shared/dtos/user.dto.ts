import {TRole} from '../constants'

export interface LoginUserDTO{
    email:string;
    password:string;
    role:TRole
}

export interface UserDTO {
    id?:string
    name:string,
    email:string,
    phone:string,
    password:string,
    profileImage?: string;
    role: TRole
}

