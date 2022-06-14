import { Request, Response } from 'express'
import { injectable } from 'tsyringe'

@injectable()
export default class PlanetsController {
  list(req: Request, res: Response) {
    res.status(200).json('TODO')
  }
}
