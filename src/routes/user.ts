import express, { Router, Response, Request, NextFunction } from 'express'
import UserController from '../controllers/user.controller.js'
import check from '../middleware/user.middleware.js'
import auth from '../middleware/auth.js'
import validator from '../middleware/validator.js'
import schema from '../validators/user.validator.js'

const routes: Router = express.Router()

routes.post(
  '/register',
  [validator(schema.register), check.checkEmail],
  UserController.register
)
routes.post('/login', [validator(schema.login)], UserController.login)
routes.get('/uploads', [auth], UserController.getUploads)

export default routes
