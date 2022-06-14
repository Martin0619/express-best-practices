import config from 'config'
import http from 'http'
import { inject, injectable } from 'tsyringe'
import { Application, HttpServer, Logger } from '~/types'

@injectable()
export default class HttpServerImpl implements HttpServer {
  private readonly _server: http.Server

  constructor(
    @inject('app') expressApp: Application,
    @inject('logger') private readonly _logger: Logger
  ) {
    this._server = http.createServer(expressApp.app)
  }

  start() {
    return new Promise<void>(async (resolve) => {
      const port = config.get<number>('api.port')
      const currentApiVersion = config.get<string>('api.currentVersion')
      this._server.listen(port, () => {
        this._logger.info(
          `Application running on http://localhost:${port}/api/${currentApiVersion}`
        )
        this._logger.info(`API documentation on http://localhost:${port}/api-doc`)
        resolve()
      })
    })
  }

  stop() {
    this._server.close()
  }
}
