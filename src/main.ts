import 'reflect-metadata'
import container from '~/di_container/tsyringe.container'
import { HttpServer, Logger } from '~/types'

const server = container.resolve<HttpServer>('server')
const logger = container.resolve<Logger>('logger')

server.start().then(() => {
  logger.info('***Ready***')
})
