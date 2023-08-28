import { Response, Request, NextFunction } from 'express'
import jwt from '../utils/jwt.js'
import createError from 'http-errors'

type user = {
  [key: string]: string
}

// const auths = {
//   user: jwt.verifyAccessToken,
//   admin: jwt.adminVerifyAccessToken,
// }

export default async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization

  if (!auth) {
    return next(createError.Unauthorized('Access token is required'))
  }

  console.log('auth')

  const token = auth.split(' ')[1]

  if (!token) {
    return next(createError.Unauthorized())
  }

  const authType = req.originalUrl.indexOf('admin') > 0 ? 'admin' : 'user'

  await jwt
    .verifyAccessToken(token, authType)
    .then((user: user) => {
      req[String('user')] = user.payload
      next()
    })
    .catch((e) => {
      return next(createError.Unauthorized(e.message))
    })
}
