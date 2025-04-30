import {container} from 'tsyringe'

import {DependencyInjection} from "."
import { BlockStatusMiddleware } from '../../interface/middlewares/blockstatusMiddleware';

// Controller Import 
import { AuthController } from '../../interface/controllers/auth/AuthControllers'
import { UserController } from '../../interface/controllers/users/userController';
import { TurfControllers } from '../../interface/controllers/turf/TurfControllers';

DependencyInjection.registerAll();

export const blockStatusMiddleware = container.resolve(BlockStatusMiddleware);
export const authController = container.resolve(AuthController);
export const userController=container.resolve(UserController);
export const turfController = container.resolve(TurfControllers)


