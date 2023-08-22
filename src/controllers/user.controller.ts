import { Request, Response } from "express"

class UserController {
  static async register(req: Request, res: Response) {
    console.log(req.body)
    res.end()
    // return res.send("user register")
  }
}

export default UserController
