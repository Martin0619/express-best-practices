import express from 'express'
import { inject, injectable } from 'tsyringe'
import { Route } from '~/types'

@injectable()
export default class AppRoutes implements Route {
  private readonly _prefixRouter: express.IRouter
  private readonly _router: express.IRouter

  constructor(@inject('user.routes:1') private readonly _userRoutesV1: Route) {
    this._prefixRouter = express.Router()
    this._router = express.Router()
    this._prefixRouter.use('/api', this._router)
    this.configure()
  }

  get routes() {
    return this._prefixRouter
  }

  private configure() {
    this._router.use(this._userRoutesV1.routes)
  }
}
