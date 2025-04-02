

import {Server} from "./frameworks/http/server";
import {config} from "./shared/config";


//instance creation

const server = new Server()

server.getApp().listen(config.server.PORT,()=>{
    console.log(`server is running on port ${config.server.PORT}`)
})