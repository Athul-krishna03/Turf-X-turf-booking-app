export interface IOtpService{
    generateOtp():Promise<string>;
    storeOtp(email:string,hashedOtp:string):Promise<void>;
    verifyOtp(email:string,otp:string):Promise<boolean>
    deleteOtp(email:string):Promise<void>
    getOtp(email:string):Promise<string |null>;
}