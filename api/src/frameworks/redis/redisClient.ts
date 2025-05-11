import Redis from "ioredis";
import { injectable } from "tsyringe";
import { config } from "../../shared/config";
import { IRedisClient } from "../../entities/services/IRedisClient";
import { randomUUID } from "crypto";

@injectable()
export class RedisClient  implements IRedisClient{
    private client: Redis;

    constructor() {
        this.client = new Redis(`${config.redis.redisURL}`);

        this.client.on("connect", () => console.log("✅ Connected to Redis!"));
        this.client.on("error", (err) => console.error("❌ Redis connection error:", err));
    }

    async set(key: string, value: string): Promise<"OK" | null> {
        return this.client.set(key, value);
    }

    async setex(key: string, seconds: number, value: string): Promise<"OK"> {
        return this.client.setex(key, seconds, value);
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async del(key: string): Promise<number> {
        return this.client.del(key);
    }

    async disconnect(): Promise<void> {
        await this.client.quit();
        console.log("🔌 Disconnected from Redis");
    }
    async acquireLock(lockKey:string,timeoutMs:number=10000):Promise<string>{
        const lockId = randomUUID();
        const result = await this.client.set(lockKey,lockId,'PX',timeoutMs,"NX");
        console.log("result in redis",result);
        
        if(result !== "OK"){
            throw new Error("Slot already locked");
        }
        return lockId
    }

    async releaseLock(lockKey: string, lockId: string): Promise<boolean> {
    const script = `
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
        else
            return 0
        end
    `;
    const result = await this.client.eval(script, 1, lockKey, lockId);
    return result === 1;
}

    async isLocked(lockKey:string):Promise<boolean>{
        
        return await this.client.exists(lockKey)===1
    }
}

export default new RedisClient();