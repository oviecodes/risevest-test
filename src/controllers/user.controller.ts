import { Request, Response, NextFunction } from 'express'
import UserService from '../services/user.service.js'
import createError from 'http-errors'

class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.register(req.body)

      res.json({
        status: true,
        message: 'User registeration successful',
        data,
      })
    } catch (e) {
      //   console.log("statusCode ", e)
      return next(createError(e.statusCode, e.message))
    }
    // return res.send("user register")
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.login(req.body)

      res.json({
        status: true,
        message: 'User login successful',
        data,
      })
    } catch (e) {
      return next(createError(e.statusCode, e.message))
    }
  }

  static async getUploads(req: Request, res: Response, next: NextFunction) {
    const { id: user_id } = req['user']

    // console.log(req['user'])

    try {
      const data = await UserService.getUploads(user_id)

      res.json({
        status: true,
        message: 'All user uploads',
        data,
      })
    } catch (e) {
      return next(createError(e.statusCode, e.message))
    }
  }
}

export default UserController
