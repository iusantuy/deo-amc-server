require('dotenv').config()

// const A______ = `${process.env.ADDRESS}`
// const P___ = `${process.env.DB_PORT}`
// const U_______ = `${process.env.DB_USERNAME}`
// const P_______ = `${process.env.DB_PASSWORD}`

const config = {
  uri: `mongodb://${process.env.SERVER_ADDRESS}:${process.env.DB_PORT}`,
  db: `${process.env.DB_NAME}`, 
  expiration: `${process.env.JWT_EXPIRATION}`, 
  secret: `${process.env.JWT_SECRET}`, 
  server: {
    port: `${process.env.SERVER_PORT}`
  },
}

module.exports = config
