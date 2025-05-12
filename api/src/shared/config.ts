import dotenv from "dotenv";
import path from 'path';
dotenv.config({path:path.resolve(__dirname,"../../.env")})

export const config = {
    cors:{
        ALLOWED_ORGIN:
           process.env.CORS_ALLOWED_ORIGIN 
    },
    server:{
        PORT:process.env.PORT ,
        NODE_ENV:process.env.NODE_ENV 
    },
    database:{
        URI:process.env.MONGODB_URI!
    },
    jwt:{
        ACCESS_SECRET_KEY: process.env.JWT_ACCESS_KEY ,
		REFRESH_SECRET_KEY: process.env.JWT_REFRESH_KEY ,
		ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN ,
        REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ,
        RESET_SECRET_KEY:process.env.JWT_RESET_KEY ,
        RESET_EXPIRES_IN:process.env.JWT_RESET_EXPIRES_IN 
    },
    nodemailer:{
        EMAIL_USER:process.env.NODEMAILER_EMAIL,
        EMAIL_PASS:process.env.NODEMAILER_PASS
    },
    redis:{
        redisURL:process.env.REDIS_URL
    },
    loggerStatus: process.env.LOGGER_STATUS ,
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "", 10),
    stripe:process.env.STRIPE_SECRET_KEY || ""
}