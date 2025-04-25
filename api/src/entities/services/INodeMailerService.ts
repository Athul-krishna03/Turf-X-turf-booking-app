export interface INodemailerService {
    sendOtpEmail(email: string, otp: string): Promise<{ success: boolean; message: string }>;
    sendRestEmail(email:string,subject:string,resetLink:string):Promise<void>;
    sendEmail(email:string | undefined,subject:string,content:string):Promise<void>;
}
