const constants = require("./constants")


const cookieOptions = {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: process.env.NODE_ENV === constants.Production ? 'None' : 'None',
}

const cookieNames = {
    access: 'access_token',
    refresh: 'refresh_token',
}

module.exports = {
    cookieNames,
    cookieOptions,
}
