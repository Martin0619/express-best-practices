import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import { inject, injectable } from 'tsyringe'
import YAML from 'yamljs'
import { Application, Route } from '~/types'

@injectable()
export default class ExpressApplicationImpl implements Application {
  private readonly _app: express.Application

  constructor(@inject('app.routes') private readonly _appRoutes: Route) {
    this._app = express()
    this.setupGlobalMiddlewares()
    this.setupSwagger()
    this.configureRoutes()
  }

  get app() {
    return this._app
  }

  private setupGlobalMiddlewares() {
    this._app
      .use(cors())
      .use(express.json())
      .use(express.urlencoded({ extended: false }))
      .use(helmet())
      .use(compression())
  }

  private setupSwagger() {
    const SwaggerFilePath = path.resolve(__dirname, '..', 'swagger.yaml')
    const swaggerDoc = YAML.load(SwaggerFilePath)
    this._app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
  }

  private configureRoutes() {
    this._app.use(this._appRoutes.routes)
    // 404 error
    this._app.use('/*', (req, res) =>
      res
        .status(404)
        .json({ statusCode: 404, error: 'Oops! You have reached the end of the world.' })
    )
  }
}
