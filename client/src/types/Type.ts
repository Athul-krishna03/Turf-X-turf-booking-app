import * as z from 'zod'


export interface SignupFormValues {
    fullName: string;
    email: string;
    password: string;
    phoneNumber:string;
    confirmPassword: string;
    agreeToTerms: boolean;
  }
  export interface RegisterData {
    name: string;
    email: string;
    phone:string;
    password: string;
    role:string;
  }
  
  export interface User {
    id:string;
    name:string;
    email:string;
    role:string,
    phone:string,
    profileImage:string,
    bio:string,
    isSeller:boolean,
    walletBalance:number,
    joinedAt:Date
}
  export interface LoginData {
    email:string,
    password:string
    role:"user"|"admin"|"TurfOwner"
  }

  export interface AuthResponse{
    success:boolean;
    message:string;
    user:{
      id:string;
      name:string;
      email:string;
      role:"user" | "admin" | "TurfOwner"
    }
  }