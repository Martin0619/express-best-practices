import { injectable } from 'tsyringe'
import { Service } from '~/types'

@injectable()
export default class UserServiceImpl implements Service<string> {
  findAll() {
    return ['TODO']
  }
}
