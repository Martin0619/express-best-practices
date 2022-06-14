import config from 'config'
import { IRouter, Router } from 'express'
import { inject, injectable } from 'tsyringe'
import PlanetsRoutes from '~controllers/planets/planets.routes'
import { Route } from '~types'

@injectable()
export default class ApplicationRoutes implements Route {
  private readonly _routes: IRouter
  private readonly _prefix: IRouter

  constructor(@inject(PlanetsRoutes) private readonly _planetsRoutes: PlanetsRoutes) {
    this._prefix = Router()
    this._routes = Router()
    const apiPrefix = config.get<string>('api.prefix')
    this._prefix.use(apiPrefix, this._routes)
    this.configure()
  }

  get routes() {
    return this._prefix
  }

  private configure() {
    this._routes.use(this._planetsRoutes.routes)
  }
}
