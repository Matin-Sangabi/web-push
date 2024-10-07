const autoBind = require('auto-bind')
const { userModel } = require('../../models/users')
const createError = require('http-errors')
const {
    hashPassword,
    verifyPassword,
} = require('../../common/password/bcryptPass')
const { createJwt } = require('../../common/jwt/jwt')

class authService {
    #model
    constructor() {
        autoBind(this)
        this.#model = userModel
    }

    async register(registerDto) {
        const user = await this.findUserByEmail(registerDto.email)
        if (user) {
            throw createError[400]('this user exists !')
        }

        const hashedPassword = await hashPassword(registerDto.password)
        registerDto.password = hashedPassword

        const create = await this.#model.create({ ...registerDto })
        return create
    }

    async findUserByEmail(email) {
        const user = await this.#model.findOne({ email })
        return user
    }

    async login(loginDto) {
        const user = await this.findUserByEmail(loginDto.email)
        if (!user) {
            throw createError[400]('this user not exist')
        }
        const verify = await verifyPassword(loginDto.password, user?.password)
        if (verify) {
            //  access token
            const access = createJwt({ id: user?._id }, '1d')
            return access
        } else {
            throw createError[400]('Password not current !')
        }
    }
}

module.exports = {
    authService: new authService(),
}
