import UserController from '../../src/controllers/users/version_1/users.controller'
import container from '../../src/di_container/tsyringe.container'
import ExpressApplicationImpl from '../../src/express-app'
import AppRoutes from '../../src/routes/app-routes'
import UserRoutesV1 from '../../src/routes/users/version_1/users.routes'
import UserServiceImpl from '../../src/services/users/users.service'

describe('tsyringe di container', () => {
  describe('resolve services', () => {
    test('should resolve "user.services"', () => {
      const userService = container.resolve('user.services')
      expect(userService).toBeInstanceOf(UserServiceImpl)
    })
  })

  describe('resolve controllers', () => {
    test('should resolve "user.controllers:1"', () => {
      const controller = container.resolve('user.controllers:1')
      expect(controller).toBeInstanceOf(UserController)
    })
  })

  describe('resolve routes', () => {
    test('should resolve "user.routes:1"', () => {
      const userRoutes = container.resolve('user.routes:1')
      expect(userRoutes).toBeInstanceOf(UserRoutesV1)
    })

    test('should resolve "app.routes"', () => {
      const appRoutes = container.resolve('app.routes')
      expect(appRoutes).toBeInstanceOf(AppRoutes)
    })
  })

  describe('resolve others', () => {
    test('should resolve "app"', () => {
      const expressApp = container.resolve('app')
      expect(expressApp).toBeInstanceOf(ExpressApplicationImpl)
    })
  })
})
