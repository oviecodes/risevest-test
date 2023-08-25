import { Request, Response, NextFunction } from 'express'
import UserService from '../services/user.service.js'
import UploadService from '../services/upload.service.js'
import createError from 'http-errors'

class UploadController {
  static async getUploads(req: Request, res: Response, next: NextFunction) {
    const { id: user_id } = req['user']

    console.log(req.body)

    // console.log(req['user'])

    try {
      const data = await UserService.getUploads(req.files)

      res.json({
        status: true,
        message: 'All user uploads',
        data,
      })
    } catch (e) {
      console.log(e)
      return next(createError(e.statusCode, e.message))
    }
  }

  static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UploadService.upload(req.files, req['user'].id)

      res.json({
        status: true,
        message: 'File uploaded successfully',
        data,
      })
    } catch (e) {
      console.log(e)
      return next(createError(e.statusCode, e.message))
    }
  }
}

export default UploadController
