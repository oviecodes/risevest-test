import express, { Router, Response, Request, NextFunction } from 'express'
import UserController from '../controllers/user.controller.js'
import UploadController from '../controllers/upload.controller.js'
import check from '../middleware/user.middleware.js'
import auth from '../middleware/auth.js'
import validator from '../middleware/validator.js'
import schema from '../validators/upload.validator.js'

const routes: Router = express.Router()

routes.get('/', [auth])
routes.post('/', [auth], UploadController.upload)
routes.get(
  '/:slug',
  [validator(schema.getFile, 'params'), auth],
  UploadController.getFile
)
routes.post('/folder', [auth], UploadController.creatFolder)
routes.get('/folder/all', [auth], UploadController.allUserFolders)
routes.get(
  '/folder/single/:id',
  [validator(schema.fetchFolder, 'params'), auth],
  UploadController.fetchFolder
)

export default routes
