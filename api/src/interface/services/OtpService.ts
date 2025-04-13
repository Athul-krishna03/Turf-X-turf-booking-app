import { inject, injectable } from "tsyringe";
import { IOtpService } from "../../entities/services/IOtpServices";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { IRedisClient } from "../../entities/services/IRedisClient";


@injectable()
export class OtpService implements IOtpService {
    constructor(@inject("IRedisClient") private redisClient: IRedisClient,
                @inject("IPasswordBcrypt") private bcrypt:IBcrypt) {}

    async generateOtp(): Promise<string> {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async storeOtp(email: string, hashedOtp: string): Promise<void> {
        const result = await this.redisClient.setex(`otp:${email}`, 60, hashedOtp); 
    }

    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const storedOtp = await this.redisClient.get(`otp:${email}`);
        console.log("so",storedOtp,"otp",otp)
        if (!storedOtp) return false;
        return await this.bcrypt.compare(otp, storedOtp);
    }

    async deleteOtp(email: string): Promise<void> {
        await this.redisClient.del(`otp:${email}`);
    }

    async getOtp(email: string): Promise<string | null> {
        const key = `otp:${email}`
        const otp = await this.redisClient.get(key);
        return otp
    }
}
