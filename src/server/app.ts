import compression from 'compression'
import config from 'config'
import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import { inject, injectable } from 'tsyringe'
import YAML from 'yamljs'
import { CONTAINER, Logger } from '~types'
import { default as ApplicationRoutes } from './app.routes'

@injectable()
export default class ExpressApplicationImpl {
  private readonly _app: Application

  constructor(
    @inject(ApplicationRoutes) private readonly _appRoutes: ApplicationRoutes,
    @inject(CONTAINER.Logger) private readonly _logger: Logger
  ) {
    this._app = express()
    this.addGlobalMiddlewares()
    this.addSwagger()
    this.addRoutes()
    this.addGlobalErrorHandling()
  }

  private addGlobalMiddlewares() {
    this._app
      .use(cors())
      .use(express.json())
      .use(helmet())
      .use(
        morgan('short', {
          skip: () => (config.get<boolean>('api.isDevMode') ? false : true),
          stream: { write: (msg) => this._logger.http(msg) },
        })
      )
      .use(compression())
  }

  private addSwagger() {
    const SwaggerDocFilePath = path.resolve(__dirname, '..', '..', 'swagger.yaml')
    const swaggerDoc = YAML.load(SwaggerDocFilePath)
    this._app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
  }

  private addRoutes() {
    this._app.use(this._appRoutes.routes)
  }

  private addGlobalErrorHandling() {}

  get app() {
    return this._app
  }
}
