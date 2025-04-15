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
  
  export interface LoginData {
    email:string,
    password:string
    role:"user"|"admin" | "TurfOwner"
  }