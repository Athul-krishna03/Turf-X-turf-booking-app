import {container} from 'tsyringe'

import {DependencyInjection} from "."


// Controller Import 
import { AuthController } from '../../interface/controllers/auth/AuthControllers'
import { UserController } from '../../interface/controllers/users/userController';
import { TurfControllers } from '../../interface/controllers/turf/TurfControllers';

DependencyInjection.registerAll();


export const authController = container.resolve(AuthController);
export const userController=container.resolve(UserController);
export const turfController = container.resolve(TurfControllers)


