import {TRole} from '../constants'

export interface LoginUserDTO{
    email:string;
    password:string;
    role:TRole
}