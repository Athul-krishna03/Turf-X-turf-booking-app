import {container} from 'tsyringe'

import {DependencyInjection} from "."


// Controller Import 
import { AuthController } from '../../interface/controllers/auth/AuthControllers'

DependencyInjection.registerAll();


export const authController = container.resolve(AuthController);


