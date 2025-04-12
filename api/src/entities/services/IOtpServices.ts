export interface IOtpService{
    generateOtp():Promise<string>;
    
}