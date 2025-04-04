

import {Server} from "./frameworks/http/server";
import {config} from "./shared/config";
import {  MongoConnect } from "./frameworks/database/mongoDB/mongoConnect";


//instance creation

const server = new Server()
const mongoConnect = new MongoConnect()

mongoConnect.connectDB()
server.getApp().listen(config.server.PORT,()=>{
    console.log(`server is running on port ${config.server.PORT}`)
})