import config from 'config'
import { createServer, Server } from 'http'
import { inject, injectable } from 'tsyringe'
import { CONTAINER, HttpServer, Logger } from '~types'
import ExpressApplicationImpl from './app'

@injectable()
export default class HttpServerImpl implements HttpServer {
  private readonly _server: Server

  constructor(
    @inject(ExpressApplicationImpl) expressApp: ExpressApplicationImpl,
    @inject(CONTAINER.Logger) private readonly _logger: Logger
  ) {
    this._server = createServer(expressApp.app)
  }

  start(): Promise<void> {
    const port = config.get<number>('api.port')
    const prefix = config.get<string>('api.prefix')
    return new Promise<void>((resolve) => {
      this._server.listen(port, () => {
        const url = `localhost:${port}`
        this._logger.info(`Application running on http://${url}${prefix}`)
        this._logger.info(`API documentation on http://${url}/api-doc`)
        resolve()
      })
    })
  }

  stop(): Promise<void> {
    return new Promise((resolve) => {
      this._server.close()
      resolve()
    })
  }
}
