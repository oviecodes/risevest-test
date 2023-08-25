import bcrypt from 'bcryptjs'
import db from '../connectors/knex.connector.js'
import createError from 'http-errors'
import jwt from '../utils/jwt.js'
import { upload } from '../connectors/s3.js'
import path from 'path'
import fs from 'fs'
import slugify from 'slugify'
import randomstring from 'randomstring'

class UploadService {
  static async getUploads(files) {
    // return await db.table('uploads').where('user_id', user_id)
    console.log('files', files)
    // console.log('path ext', path.extname(files.picture.name))

    const uploadData = {
      Body: fs.readFileSync(files.picture.tempFilePath),
      Key: files.picture.name,
    }

    // console.log(uploadData)

    await upload(uploadData)
    return {
      uploads: true,
    }
  }

  static async upload(files, userId: Number) {
    const { name, size } = files.picture
    const Key = await this.slugifyName(name)

    const uploadData = {
      Body: fs.readFileSync(files.picture.tempFilePath),
      Key,
    }

    const uploaded = await upload(uploadData)

    const { ETag, VersionId } = uploaded

    await db.table('uploads').insert({
      userId,
      name,
      slug: Key,
      size,
      ETag,
      VersionId,
    })
    //slug
    //userId
    //safe
    //ETag
    //VersionId
    //size

    return {
      uploads: true,
    }
  }

  static async slugifyName(name) {
    const upload = await db.table('uploads').where('name', name)

    if (!upload.length)
      return slugify.default(name, {
        lower: true,
      })

    name = `${name}${randomstring.generate({
      length: 12,
      charset: 'alphanumeric',
    })}`

    return slugify.default(name, {
      lower: true,
    })
  }
}

export default UploadService
