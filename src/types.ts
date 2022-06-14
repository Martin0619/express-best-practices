import { IRouter } from 'express'

export interface HttpServer {
  start(): Promise<void>
  stop(): Promise<void>
}

export enum CONTAINER {
  HttpServer = 'HttpServer',
  Logger = 'Logger',
}

export interface Route {
  routes: IRouter
}

export interface Logger {
  error(msg: string): void
  warn(msg: string): void
  info(msg: string): void
  http(msg: string): void
  debug(msg: string): void
}
