import bcrypt from 'bcryptjs'
import db from '../connectors/knex.connector.js'
import createError from 'http-errors'
import jwt from '../utils/jwt.js'
import { upload, downloadFilesFromBucket } from '../connectors/s3.js'
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
    const file = await downloadFilesFromBucket(key)

    const tempPath = path.resolve(`${downloadPath}/${key}`)

    fs.writeFileSync(tempPath, await file.Body.transformToByteArray())

    console.log('dowloading file')
    return file
  }

  static async createFolder(name: string, userId) {
    return db.table('folders').insert({
      name,
      size: 0,
      userId,
    })
  }

  static async fetchFolders(userId) {
    return db.table('folders').where('userId', userId)
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
