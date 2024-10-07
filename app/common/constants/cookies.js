const constants = require("./constants")


const cookieOptions = {
    httpOnly: true,
    secure: true,
    signed: true,
    domain: ".vercel.app",
    sameSite: process.env.NODE_ENV === constants.Production ? 'None' : 'Lax',
}

const cookieNames = {
    access: 'access_token',
    refresh: 'refresh_token',
}

module.exports = {
    cookieNames,
    cookieOptions,
}
