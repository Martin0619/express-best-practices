import bind from 'bind-decorator'
import * as express from 'express'
import { inject, injectable } from 'tsyringe'
import { Controller, Service } from '~/types'

@injectable()
export default class UserController implements Controller {
  constructor(@inject('user.services') private readonly _userService: Service<string>) {}

  @bind
  list(req: express.Request, res: express.Response) {
    return res.status(200).json(this._userService.findAll())
  }
}
