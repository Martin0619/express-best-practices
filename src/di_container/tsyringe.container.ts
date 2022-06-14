import { container as tsyringeContainer, Lifecycle, RegistrationOptions } from 'tsyringe'
import HttpServerImpl from '~server/http-server'
import { CONTAINER } from '~types'
import logger from '~utils/winston.logger'

const SINGLETON: RegistrationOptions = { lifecycle: Lifecycle.Singleton }

tsyringeContainer
  .register(CONTAINER.HttpServer, { useClass: HttpServerImpl }, SINGLETON)
  .register(CONTAINER.Logger, { useValue: logger })

export default tsyringeContainer
