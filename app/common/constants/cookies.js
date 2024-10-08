const constants = require('./constants')

const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    signed: true,
    sameSite: process.env.NODE_ENV === constants.production ? 'None' : 'Lax',
    secure: process.env.NODE_ENV === constants.production,
    domain: 'web-push-ashy.vercel.app',
    path: '/',
}

const cookieNames = {
    access: 'access_token',
    refresh: 'refresh_token',
}

module.exports = {
    cookieNames,
    cookieOptions,
}
