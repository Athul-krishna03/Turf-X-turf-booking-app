import mongoose from "mongoose";
import { config } from "../../../shared/config";
import { injectable } from "tsyringe";

@injectable()
export  class MongoConnect{
    private _dbUrl:string;
    constructor(){
        this._dbUrl=config.database.URI
    }
    async connectDB(){
        try {
            await mongoose.connect(this._dbUrl)
            console.log("DB connected");
        } catch (error) {
            console.log("db connection error");
            throw new Error("Database conncection failed")
        }
        mongoose.connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
        });
        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
    }
}