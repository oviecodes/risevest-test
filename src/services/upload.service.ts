import bcrypt from 'bcryptjs'
import db from '../connectors/knex.connector.js'
import createError from 'http-errors'
import jwt from '../utils/jwt.js'
import { upload, downloadFilesFromBucket } from '../connectors/s3.js'
import path from 'path'
import fs from 'fs'
import slugify from 'slugify'
import randomstring from 'randomstring'
import redis from '../utils/redis.js'
import { arrayBuffer } from 'stream/consumers'
import { isTypedArray } from 'util/types'

class UploadService {
  static async upload(files, userId: Number, folder = null) {
    const { name, size } = files.picture
    const Key = await this.slugifyName(name)

    const uploadData = {
      Body: fs.readFileSync(files.picture.tempFilePath),
      Key,
    }

    const uploaded = await upload(uploadData)

    const { ETag, VersionId } = uploaded

    const data = await db.table('uploads').insert(
      {
        userId,
        name,
        slug: Key,
        size,
        ETag,
        VersionId,
      },
      ['id']
    )

    // const data = await db.table("")

    if (folder)
      await db.table('folder_files').insert({
        folderId: folder,
        uploadId: data[0].id,
      })

    return {
      uploads: true,
    }
  }

  static async getFile(key, downloadPath) {
    const check = await db.table('uploads').where('slug', key)

    if (!check.length) throw createError.NotFound('Resource Not Found')

    let file: any = await redis.get('uploads', key)

    // let file

    console.log('file', file)

    // return

    if (!file) {
      file = await downloadFilesFromBucket(key)
      file = await file['Body'].transformToByteArray()
      console.log('from aws', file)
      //   console.log(JSON.stringify(file))

      await redis.add('uploads', key, JSON.stringify(Buffer.from(file)))
    }

    const tempPath = path.resolve(`${downloadPath}/${key}`)

    fs.writeFileSync(tempPath, Buffer.from(file['data']) ?? file)

    console.log('dowloading file')
    return file
  }

  static async createFolder(name: string, userId) {
    const data = db.table('folders').insert({
      name,
      size: 0,
      userId,
    })

    return data
  }

  static async fetchFolders(userId) {
    let data = await redis.get('folder', String(userId))

    console.log('here', data)

    if (data == null) {
      data = await db.table('folders').where('userId', userId)
      await redis.add('folder', String(userId), JSON.stringify(data))
    }
    return data
  }

  static async fetchFolderWithFiles(user_id, id) {
    const folder = await db.table('folders').where('id', id)

    const folder_data = await db
      .table('folder_files')
      .where('folderId', id)
      .join('uploads', 'uploadId', '=', 'uploads.id')
      .select('name', 'slug', 'size', 'uploads.id')

    folder[0].folder_data = folder_data

    return folder
  }

  static async slugifyName(name) {
    const upload = await db.table('uploads').where('name', name)

    if (!upload.length)
      return slugify.default(name, {
        lower: true,
      })

    const extension = path.extname(name)

    if (!extension)
      throw createError.UnprocessableEntity('Unsupported file type')

    const index = name.lastIndexOf(extension)

    name = `${name.slice(0, index)}-${randomstring.generate({
      length: 12,
      charset: 'alphanumeric',
    })}`

    const slug = slugify.default(name, {
      lower: true,
    })

    return `${slug}${extension}`
  }
}

export default UploadService
