const webpush = require('web-push')
const constants = require('../common/constants/constants')

webpush.setVapidDetails(
    `mailto:${constants.vapidKeys.email}`,
    constants.vapidKeys.public,
    constants.vapidKeys.private
)

