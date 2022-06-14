import { container, Lifecycle, RegistrationOptions } from 'tsyringe'
import UserControllerV1 from '../controllers/users/version_1/users.controller'
import ExpressApplicationImpl from '../express-app'
import AppRoutes from '../routes/app-routes'
import UserRoutesV1 from '../routes/users/version_1/users.routes'
import HttpServerImpl from '../server'
import UserServiceImpl from '../services/users/users.service'
import logger from '../utils/winston.logger'

const Singleton = { lifecycle: Lifecycle.Singleton } as RegistrationOptions

container
  // services
  .register('user.services', { useClass: UserServiceImpl }, Singleton)

  // controllers
  .register('user.controllers:1', { useClass: UserControllerV1 }, Singleton)

  // routes
  .register('app.routes', { useClass: AppRoutes }, Singleton)
  .register('user.routes:1', { useClass: UserRoutesV1 }, Singleton)

  // utils
  .register('logger', { useValue: logger })

  // others
  .register('app', { useClass: ExpressApplicationImpl }, Singleton)
  .register('server', { useClass: HttpServerImpl }, Singleton)

export default container
