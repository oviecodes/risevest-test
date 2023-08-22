import bcrypt from "bcryptjs"

class UserService {
  static async register(data) {
    let { password } = data

    const SALT_ROUNDS = 10
    const SALT = bcrypt.genSaltSync(SALT_ROUNDS)
    const passwordUnencrypted = password

    data.password = bcrypt.hashSync(password, SALT)

    console.log(data)

    this.login({ ...data, passwordUnencrypted })
  }

  static async login(data) {
    const valid = bcrypt.compareSync(data.passwordUnencrypted, data.password)

    if (valid) console.log(data)
  }
}

export default UserService
