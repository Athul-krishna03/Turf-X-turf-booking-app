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
    role: "user"
}