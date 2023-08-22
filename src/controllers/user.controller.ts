import { Request, Response } from "express"
import UserService from "../services/user.service.js"
import createError from "http-errors"

class UserController {
  static async register(req: Request, res: Response, next) {
    try {
      const data = await UserService.register(req.body)

      res.json({
        status: true,
        message: "User registeration successful",
        data,
      })
    } catch (e) {
      //   console.log("statusCode ", e)
      return next(createError(e.statusCode, e.message))
    }
    // return res.send("user register")
  }
}

export default UserController
