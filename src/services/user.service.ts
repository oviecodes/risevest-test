import bcrypt from 'bcryptjs'
import db from '../connectors/knex.connector.js'
import createError from 'http-errors'
import jwt from '../utils/jwt.js'
import { upload } from '../connectors/s3.js'
import path from 'path'
import fs from 'fs'

class UserService {
  static async register(data) {
    let { name, password } = data

    const SALT_ROUNDS = 10
    const SALT = bcrypt.genSaltSync(SALT_ROUNDS)
    const passwordUnencrypted = password

    data.password = bcrypt.hashSync(password, SALT)

    console.log(data)
    // const user = await db.table('users').where('name', name)

    // console.log('user', user)
    await db.table('users').insert(data)

    data.password = passwordUnencrypted

    return this.login(data)
  }

  static async login(data) {
    const { email, password } = data
    const [user] = await db.table('users').where('email', email)

    const valid = bcrypt.compareSync(password, user.password)

    if (!valid)
      throw createError.UnprocessableEntity(
        'Cannot Login, please check credentials'
      )
    //assign jwt...
    const accessToken = await jwt.signAccessToken(user)

    delete user.password

    return { ...user, accessToken }
  }

  static async getUploads(userId) {
    return await db.table('uploads').where('userId', userId)
  }

  static async findBy(field: string, value: string) {
    return db.table('users').where(field, value)
  }
}

export default UserService
