import { Response, Request, NextFunction } from 'express'
import db from '../connectors/knex.connector.js'
import UserService from '../services/user.service.js'
import AdminService from '../services/admin.service.js'
import createError from 'http-errors'

export default {
  checkEmail: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    // if() ""

    console.log(req.originalUrl.indexOf('admin'))

    // console.log(req.baseUrl, req.originalUrl)

    const user =
      req.originalUrl.indexOf('admin') > 0
        ? await AdminService.findBy('email', email)
        : await UserService.findBy('email', email)

    if (user.length) return next(createError.NotFound('Email exist'))

    return next()
  },
}
