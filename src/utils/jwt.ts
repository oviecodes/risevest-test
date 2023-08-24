import UserService from '../services/user.service.js'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const accessTokenExpires = process.env.ACCESS_TOKEN_LIFE
const issuer = process.env.TOKEN_ISSUER

type payload = { [key: string]: string }

export default {
  signAccessToken(payload: payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { payload },
        accessTokenSecret,
        {
          expiresIn: accessTokenExpires,
          issuer,
          audience: payload.email,
        },
        (err, token) => {
          if (err) {
            console.log(err)
            reject(createError.InternalServerError())
          }
          resolve(token)
        }
      )
    })
  },
  verifyAccessToken(token: string): Promise<payload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, async (err, payload) => {
        if (err) {
          const message =
            err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
          return reject(createError.Unauthorized(message))
        }
        const tokenIssuer = payload.iss
        const audience = payload.aud
        if (issuer !== tokenIssuer)
          return reject(createError.Unauthorized('Unauthorized'))
        let user = await UserService.findBy('email', audience)
        if (!user.length)
          return reject(createError.Unauthorized('Unauthorized'))
        resolve(payload)
      })
    })
  },
}
