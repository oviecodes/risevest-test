import express, { Router, Response, Request, NextFunction } from "express"
import * as createError from "http-errors"
import UserController from "../controllers/user.controller.js"

const routes: Router = express.Router()

routes.post("/register", UserController.register)

routes.all("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "DROPBET API v1.0",
  })
})

routes.use(async (req, res, next) => {
  next(createError.NotFound("Route not Found"))
})

routes.use((err, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
  })
})

export default routes
