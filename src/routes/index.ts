import express, { Router, Response, Request, NextFunction } from 'express'
import createError from 'http-errors'
import user from './user.js'
import upload from './uploads.js'

const routes = express.Router()

routes.use('/user', user)
routes.use('/upload', upload)

routes.all('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Risevest Backend Test API v1.0',
  })
})

routes.use(async (req, res, next) => {
  next(createError.NotFound('Route not Found'))
})

routes.use((err, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
  })
})

export default routes
