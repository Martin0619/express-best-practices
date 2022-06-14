import express from 'express'
import { inject, injectable } from 'tsyringe'
import { Controller } from '~/types'

@injectable()
export default class UserRoutesV1 {
  private readonly _router: express.IRouter
  private readonly _prefixRouter: express.IRouter

  constructor(@inject('user.controllers:1') private readonly _controller: Controller) {
    this._router = express.Router()
    this._prefixRouter = express.Router()
    this._prefixRouter.use('/v1/users', this._router)
    this.configure()
  }

  get routes() {
    return this._prefixRouter
  }

  private configure() {
    this._router.get('/', this._controller.list)
  }
}
