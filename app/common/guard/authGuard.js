const cookieParser = require('cookie-parser')
const createHttpError = require('http-errors')
const { verifyJwt } = require('../jwt/jwt')
const { userModel } = require('../../models/users')

async function AuthGuard(req, res, next) {
    try {
        const access_token = req?.signedCookies['access_token']
        const token = cookieParser.signedCookie(
            access_token,
            process.env.COOKIE_PARSER_SECRET_KEY
        )
        if (!token) {
            throw createHttpError.Unauthorized('not find token')
        }
        const data = verifyJwt(token)
        if (typeof data === 'object' && 'id' in data) {
            const user = await userModel.findById(data?.id, { _id: 1 }).lean()

            if (!user) {
                throw createHttpError.Unauthorized(
                    'not find user or valid token'
                )
            }
            req.user = user
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = AuthGuard
