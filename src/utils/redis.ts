import redis from '../connectors/redis.js'
// const createError = require('http-errors')
import createError from 'http-errors'

export default {
  add(key, field, values) {
    return new Promise(async (resolve, reject) => {
      try {
        // const ret = await redis.hGet(key, field)
        //store response, 2 type ... ***response from aws and *** response from our server, clear redis every 10 mins

        const ret = await redis.hSet(key, field, values)

        // resolve(JSON.parse(ret))
        console.log(ret)
        resolve(ret)
      } catch (e) {
        console.log(e.message)
        return reject(createError.InternalServerError())
      }
    })
  },
  get(key, field) {
    return new Promise(async (resolve, reject) => {
      try {
        const ret = await redis.hGet(key, field)

        resolve(JSON.parse(ret))
      } catch (e) {
        console.log(e.message)
        return reject(createError.InternalServerError())
      }
    })
  },
  remove(key, field) {
    return new Promise(async (resolve, reject) => {
      //   redis.get('refresh_tokens', (err, reply) => {
      //     if (err) {
      //       console.log('error', err.message)
      //       return reject(createError.InternalServerError())
      //     }
      //     const data = JSON.parse(reply)
      //     const index = data.indexOf(key)
      //     data.splice(index, 1)
      //     const refresh_tokens = JSON.stringify(data)
      //     redis.set('refresh_tokens', refresh_tokens, (err, reply) => {
      //       if (err) {
      //         return reject(createError.InternalServerError())
      //       }
      //       resolve(reply)
      //     })
      //   })
    })
  },
}
