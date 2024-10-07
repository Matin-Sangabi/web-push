const { Schema, Types, model } = require('mongoose')

const webPushSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: 'users', required: true },
        endpoint: { type: String },
        expirationTime: { type: Date },
        keys: {
            p256dh: { type: String },
            auth: { type: String },
        },
    },
    { timestamps: true }
)

module.exports = {
    webPushModel: model('webPush', webPushSchema),
}
