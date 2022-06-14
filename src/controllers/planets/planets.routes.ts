import { IRouter, Router } from 'express'
import { inject, injectable } from 'tsyringe'
import { Route } from '~types'
import PlanetsController from './planets.controller'

@injectable()
export default class PlanetsRoutes implements Route {
  private readonly _routes: IRouter
  private readonly _prefixRouter: IRouter

  constructor(@inject(PlanetsController) private readonly controller: PlanetsController) {
    this._routes = Router()
    this._prefixRouter = Router()
    this._prefixRouter.use('/planets', this._routes)
    this.configure()
  }

  get routes() {
    return this._prefixRouter
  }

  private configure() {
    this._routes.get('/', this.controller.list)
  }
}
