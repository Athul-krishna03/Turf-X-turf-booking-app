export interface IRedisClient {
    set(key: string, value: string, expiryMode?: string, time?: number): Promise<"OK" | null>;
    setex(key: string, seconds: number, value: string): Promise<"OK">;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<number>; 
}