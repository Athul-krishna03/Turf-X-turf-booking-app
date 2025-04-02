import dotenv from "dotenv";
import path from 'path';
dotenv.config({path:path.resolve(__dirname,"../../.env")});

export const config = {
    cors:{
        ALLOWED_ORGIN:
           process.env.CORS_ALLOWED_ORIGIN || "http://localhost:5173"
    },
    server:{
        PORT:process.env.PORT || 5000
    },
    loggerStatus: process.env.LOGGER_STATUS || "dev",
}