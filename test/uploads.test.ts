//@ts-nocheck
import { test, beforeEach, describe, afterAll, jest } from '@jest/globals'
// const mongoose = require('mongoose')
// import db from '../src/connectors/knex.connector'
import knexfile from '../knexfile.mjs'
import { knex } from '../src/connectors/knex.connector.js'
import s3 from '../src/connectors/s3.js'

const db = knex(knexfile['test'])

import supertest from 'supertest'
import app from '../src/index.js'

import {
  initialUploads,
  nonExistingId,
  imagesInDb,
  users,
  nonExist,
  folder,
} from './test_helper'

let jwt

const api = supertest(app)

beforeAll(async () => {
  await db.table('users').where({}).del()
  const user = await api.post('/user/register').send(users[0])
  //   console.log('test user', user.body)
  jwt = user.body.data.accessToken
  //   console.log(jwt)
})

beforeEach(async () => {
  //   await Image.deleteMany({})
  //   await Promise.all([
  //     db.raw('truncate table uploads'),
  //     db.raw('truncate table users'),
  //   ])
  //   await db.table('users').where({}).del()
  await db.table('uploads').where({}).del()

  await Promise.all([
    db.table('uploads').insert(initialUploads),
    //   db.table('users').insert(users),
  ])
})

describe('when there is initially some uploads saved', () => {
  //@ts-ignore
  test('Uploads are returned as json', async () => {
    await api
      .get('/user/uploads')
      .auth(jwt, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('there are 2 uploads', async () => {
    const response = await api
      .get('/user/uploads')
      .auth(jwt, { type: 'bearer' })

    expect(response.body.data).toHaveLength(initialUploads.length)
  }, 100000)

  test('Image title array should have the title of the second image', async () => {
    const response = await api
      .get('/user/uploads')
      .auth(jwt, { type: 'bearer' })
    const titles = response.body.data.map(
      (upload: { slug: any }) => upload.slug
    )
    expect(titles).toContain(initialUploads[0].slug)
    expect(titles).toContain(initialUploads[1].slug)
  }, 100000)
})

describe('where there is authentication error', () => {
  test('return error for uploading without authentication', async () => {
    const newUpload = initialUploads[0]

    await api
      .post('/upload')
      .send(newUpload)
      .expect(401, { status: false, message: 'Access token is required' })

    const uploadsAtEnd = await db.table('uploads').where('userId', users[0].id)
    expect(uploadsAtEnd).toHaveLength(initialUploads.length)
  })

  test('cannot create folder without authentication', async () => {
    await api
      .post('/upload/folder')
      .send(folder)
      .expect(401, { status: false, message: 'Access token is required' })
  })
})

describe('mocking Uploads', () => {
  test('Check etag and versionId', async () => {
    const spy = jest.spyOn(s3, 'upload').mockResolvedValue(async () => {
      console.log('calling mock upload')
      return {
        VersionId: 'trwer.sghehTWEYbas',
        ETag: 'vstesau-ueias',
      }
    })

    await s3.upload()

    expect(spy).toHaveBeenCalled()
    expect(spy).toReturn()
  })
})

afterAll(async () => {
  //   return mongoose.connection.close()
})
