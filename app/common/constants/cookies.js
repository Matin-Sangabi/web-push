const constants = require("./constants")


const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === constants.production,
    signed: true,
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
