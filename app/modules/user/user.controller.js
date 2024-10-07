const autoBind = require('auto-bind')
const { userModel } = require('../../models/users')
const createError = require('http-errors')

class userController {
    #model
    constructor() {
        autoBind(this)
        this.#model = userModel
    }

    async getUser(req, res, next) {
        try {
            const { _id } = req.user
            const user = await this.getUserById(_id)
            if (!user) {
                throw createError[400]('not find user')
            }
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }

    async getUserById(id) {
        const user = await this.#model.findById(id)
        return user
    }
}

module.exports = {
    userController: new userController(),
}
