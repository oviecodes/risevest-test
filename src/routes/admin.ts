import express, { Router, Response, Request, NextFunction } from 'express'
import AdminController from '../controllers/admin.controller.js'
import check from '../middleware/user.middleware.js'
import auth from '../middleware/auth.js'
import schemas from '../validators/user.validator.js'
import validator from '../middleware/validator.js'

const routes: Router = express.Router()

routes.post(
  '/register',
  [validator(schemas.register), check.checkEmail],
  AdminController.register
)
routes.post('/login', [validator(schemas.login)], AdminController.login)
routes.post(
  '/flag',
  [validator(schemas.file), auth, check.isAdmin],
  AdminController.flagFile
)

export default routes
