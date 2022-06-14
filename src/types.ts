import express from 'express'

export interface Service<T> {
  findAll(): T[]
}

export interface Route {
  routes: express.IRouter
}

export interface Application {
  app: express.Application
}

export interface HttpServer {
  start(): Promise<void>
  stop(): void
}

export interface Logger {
  error(msg: string): void
  warn(msg: string): void
  info(msg: string): void
  http(msg: string): void
  debug(msg: string): void
}

export interface Controller {
  list(req: express.Request, res: express.Response): express.Response
}
