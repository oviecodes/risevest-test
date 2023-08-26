import express, { Router, Response, Request, NextFunction } from 'express'
import AdminController from '../controllers/admin.controller.js'
import check from '../middleware/user.middleware.js'
import auth from '../middleware/auth.js'

const routes: Router = express.Router()

routes.post('/register', check.checkEmail, AdminController.register)
routes.post('/login', AdminController.login)
routes.post('/flag', [auth], AdminController.flagFile)

export default routes
