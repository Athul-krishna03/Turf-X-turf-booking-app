//DI imports
import "reflect-metadata";
import "./frameworks/di/resolver"
import {Server} from "./frameworks/http/server";
import {config} from "./shared/config";
import {  MongoConnect } from "./frameworks/database/mongoDB/mongoConnect";
import { container } from "tsyringe";


const server = container.resolve<Server>('Server');
const mongoConnect = container.resolve<MongoConnect>('MongoConnect');

mongoConnect.connectDB().then(() => {
    server.startCornJob();
    server.getApp().listen(config.server.PORT, () => {
    console.log(`Server is running on port ${config.server.PORT}`);
    });
}).catch((error) => {
    console.error('Failed to start server:', error);
});