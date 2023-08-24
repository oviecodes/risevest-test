import jwt from '../utils/jwt.js'
import createError from 'http-errors'

type user = {
  [key: string]: string
}

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized('Access token is required'))
  }

  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return next(createError.Unauthorized())
  }

  await jwt
    .verifyAccessToken(token)
    .then((user: user) => {
      req.user = user.payload
      next()
    })
    .catch((e) => {
      next(createError.Unauthorized(e.message))
    })
}

export default auth
