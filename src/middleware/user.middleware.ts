import { Response, Request, NextFunction } from 'express'
import db from '../connectors/knex.connector.js'
import UserService from '../services/user.service.js'
import createError from 'http-errors'

export default {
  checkEmail: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    const user = await UserService.findBy('email', email)

    if (user.length) return next(createError.NotFound('Email exist'))

    return next()
  },
}