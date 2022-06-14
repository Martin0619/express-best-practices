import 'reflect-metadata'
import tsyringeContainer from '~di_container/tsyringe.container'
import { CONTAINER, HttpServer } from '~types'

const server = tsyringeContainer.resolve<HttpServer>(CONTAINER.HttpServer)
server.start().then(() => console.info('***READY***'))
