const constants = Object.freeze({
    production: 'production',
    development: 'development',
    vapidKeys: {
        private: process.env.VAPID_PRIVATE_KEY,
        public: process.env.VAPID_PUBLIC_KEY,
        email: process.env.PUBLIC_EMAIL,
    },
})

module.exports = constants
