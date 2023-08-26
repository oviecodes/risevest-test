import bcrypt from 'bcryptjs'
import db from '../connectors/knex.connector.js'
import createError from 'http-errors'
import jwt from '../utils/jwt.js'
import { upload, deleteFileFromBucket } from '../connectors/s3.js'
import path from 'path'
import fs from 'fs'

class AdminService {
  static async register(data) {
    let { name, password } = data

    const SALT_ROUNDS = 10
    const SALT = bcrypt.genSaltSync(SALT_ROUNDS)
    const passwordUnencrypted = password

    data.password = bcrypt.hashSync(password, SALT)

    data.isAdmin = true

    await db.table('users').insert(data)

    data.password = passwordUnencrypted

    return this.login(data)
  }

  static async login(data) {
    const { email, password } = data
    const [user] = await db
      .table('users')
      .where('email', email)
      .where('isAdmin', true)

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

  static async flagFile(name) {
    const file = await db.table('uploads').where('slug', name)

    if (!file.length) throw createError.NotFound('resource not found')

    const id = file[0].id

    await db.table('uploads').where('id', id).update('safe', false)

    await db.table('folder_files').where('uploadId', id).del()

    await db.table('uploads').where('id', id).del()

    await deleteFileFromBucket(name)

    return {
      deleted: true,
    }
  }

  static async findBy(field: string, value: string) {
    return db.table('users').where(field, value).where('isAdmin', true)
  }
}

export default AdminService
