import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import AdminService from '../services/admin.service.js'

class AdminController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AdminService.register(req.body)

      res.json({
        status: true,
        message: 'Admin Registered successfully',
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
      const data = await AdminService.login(req.body)

      res.json({
        status: true,
        message: 'Admin login successful',
        data,
      })
    } catch (e) {
      return next(createError(e.statusCode, e.message))
    }
  }

  static async flagFile(req: Request, res: Response, next: NextFunction) {
    const { file } = req.body

    // console.log('fileName', file)

    // console.log(req['user'])

    try {
      const data = await AdminService.flagFile(file)

      res.json({
        status: true,
        message: 'File flaged and deleted successfully',
        data,
      })
    } catch (e) {
      console.log(e)
      return next(createError(e.statusCode, e.message))
    }
  }
}

export default AdminController
