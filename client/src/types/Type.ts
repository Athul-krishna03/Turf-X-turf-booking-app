import * as z from 'zod'


export interface SignupFormValues {
    fullName: string;
    email: string;
    password: string;
    phoneNumber:string;
    confirmPassword: string;
    agreeToTerms: boolean;
  }

  export interface TurfFormValues {
    status: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    courtSize: string;
    isBlocked: boolean;
    aminities: string[];
    turfPhotos: File[];
    turfPhotoUrls: string[];
  }
  export interface ITurf{
    _id:string,
    turfId:string,
    name:string,
    email:string,
    phone:string,
    isBlocked:boolean,
    courtSize?: string;
    turfPhotoUrls?: string[];
    status:string,
    createdAt:Date,
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
    position:string,
    walletBalance:number,
    joinedAt:Date
}
  export interface LoginData {
    email:string,
    password:string
    role:"user"|"admin"|"TurfOwner"
  }
  export interface IClient {
    _id:string,
    clientId:string,
    name:string,
    email:string,
    phone:string,
    isBlocked:boolean,
    joinedAt:Date
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