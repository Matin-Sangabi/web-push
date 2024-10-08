const constants = require('./constants')

const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    signed: true,
    sameSite: 'None',
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
