import { Response, Request, NextFunction } from 'express'
import jwt from '../utils/jwt.js'
import createError from 'http-errors'

type user = {
  [key: string]: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization

  if (!auth) {
    return next(createError.Unauthorized('Access token is required'))
  }

  const token = auth.split(' ')[1]

  if (!token) {
    return next(createError.Unauthorized())
  }

  await jwt
    .verifyAccessToken(token)
    .then((user: user) => {
      req[String('user')] = user.payload
      next()
    })
    .catch((e) => {
      return next(createError.Unauthorized(e.message))
    })
}
