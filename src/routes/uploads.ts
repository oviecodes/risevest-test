import express, { Router, Response, Request, NextFunction } from 'express'
import UserController from '../controllers/user.controller.js'
import UploadController from '../controllers/upload.controller.js'
import check from '../middleware/user.middleware.js'
import auth from '../middleware/auth.js'

const routes: Router = express.Router()

routes.get('/', [auth])
routes.post('/', [auth], UploadController.upload)
routes.get('/:slug', [auth], UploadController.getFile)
routes.post('/folder', [auth], UploadController.creatFolder)
routes.get('/folder/all', [auth], UploadController.allUserFolders)
routes.get('/folder/single/:id', [auth], UploadController.fetchFolder)

export default routes
