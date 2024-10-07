require('dotenv').config()

const Application = require('../app/server')

const Port = process.env.NODE_ENV === "production" ? 3000 :  process.env.PORT
const DB_URL = process.env.DB_URL
const Cookie_parser = process.env.COOKIE_PARSER_SECRET_KEY

new Application(Port, DB_URL, Cookie_parser)
