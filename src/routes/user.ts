import express, { Router, Response, Request, NextFunction } from 'express'
import UserController from '../controllers/user.controller.js'
import check from '../middleware/user.middleware.js'

const routes: Router = express.Router()

routes.post('/register', check.checkEmail, UserController.register)
routes.post('/login', UserController.login)
routes.post('/uploads', UserController.getUploads)

export default routes
