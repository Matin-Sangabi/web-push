const autoBind = require('auto-bind')
const { userModel } = require('../../models/users')
const createError = require('http-errors')
const { webPushModel } = require('../../models/webPush')

class userController {
    #model
    #webpush
    constructor() {
        autoBind(this)
        this.#model = userModel
        this.#webpush = webPushModel
    }

    async getUser(req, res, next) {
        try {
            const { _id } = req.user
            let user = await this.getUserById(_id)
            const push = await this.findWebpush(_id)
            if (push) {
                user = { ...user, is_subscribe: true }
            } else {
                user = { ...user, is_subscribe: false }
            }
            console.log(user)
            if (!user) {
                throw createError[400]('not find user')
            }
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const data = await this.#model
                .find({}, {}, { sort: { _id: -1 } })
                .lean()
            return res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async getUserById(id) {
        const user = await this.#model.findById(id).lean()
        return user
    }

    async findWebpush(id) {
        const push = await this.#webpush.findOne({ user: id }).lean()
        return push
    }
}

module.exports = {
    userController: new userController(),
}
