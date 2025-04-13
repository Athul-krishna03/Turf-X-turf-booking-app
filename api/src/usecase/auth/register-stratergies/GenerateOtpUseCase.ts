import { inject,injectable } from "tsyringe";
import { IOtpService } from "../../../entities/services/IOtpServices";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { IGenerateOtpUseCase } from "../../../entities/useCaseInterfaces/auth/IGenerateOtpUseCase";
import { INodemailerService } from "../../../entities/services/INodeMailerService";

@injectable()
export class GenerateOtpUseCase implements IGenerateOtpUseCase{
    constructor(
        @inject("IOtpService") private otpService:IOtpService,
        @inject("IPasswordBcrypt") private bcryptService:IBcrypt,
        @inject("INodemailerService") private mailService:INodemailerService
    ){}

    async execute(email: string): Promise<void> {
        try {
        console.log("otp genrate");
        
        const otp = await this.otpService.generateOtp();
        console.log("otp is",otp);
        const hashedOtp = await this.bcryptService.hash(otp);
        
        console.log(hashedOtp)
        
        await this.otpService.storeOtp(email,hashedOtp);

        const storedOtp = await this.otpService.getOtp(email);
            
        console.log(storedOtp);

        await this.mailService.sendOtpEmail(email,otp)
        } catch (error) {
            console.log("error in usecase")
            console.log(error)
        }

    }

}