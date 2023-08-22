import express, { Router, Response, Request, NextFunction } from "express"
import UserController from "../controllers/user.controller.js"

const routes: Router = express.Router()

routes.post("/register", UserController.register)

export default routes
