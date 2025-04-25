import { injectable,inject } from "tsyringe";
import { IRedisTokenRepository } from "../../../entities/repositoryInterface/redis/IRedisTokenRepository";
import { IRedisClient } from "../../../entities/services/IRedisClient";

@injectable()
export class RedisTokenRepository implements IRedisTokenRepository{
    constructor(@inject("IRedisClient") private redisClient:IRedisClient){}
    async blackListToken(token: string, expiresIn: number): Promise<void> {
        await this.redisClient.setex(token,expiresIn,"blacklisted")
    }
    async isTokenBlackListed(token: string): Promise<boolean> {
        const value = await this.redisClient.get(token)
        return value === "blacklisted"
    }
    async storeResetToken(userId: string, token: string): Promise<void> {
        const key = `reset_token:${userId}`;
        await this.redisClient.setex(key,300,token)
    }
    async verifyResetToken(userId: string, token: string): Promise<boolean> {
        const key = `reset_token:${userId}`;
        const storedToken = await this.redisClient.get(key);
        console.log(storedToken);
        return storedToken === token
    }
    async deleteResetToken(userId: string): Promise<void> {
        const key = `reset_token:${userId}`;
        await this.redisClient.del(key)
    }
}