const argon2 = require('argon2')
const config = require('../configs')
const mdb = require('../db/index').db( config.db ).collection('admin')

const getUser = async (username) => {
  try {
    const read = await mdb.findOne({ username: username })
      return read
  } 
  catch (e) {
    console.log(e)
  }
}
  
const getUserById = async (userId) => {
  try {
    const readById = await mdb.findOne({ _id: userId })
      return readById
  } 
  catch (e) {
    console.log(e)
  }
}

const insertNewUser = async (user) => {
  try {
      const userInsert = await mdb.insertOne({
          username: user.username,
          password: user.password,
          createdAt: new Date()
      })
      return userInsert
  } catch (e) {
      console.log(e)
  }
}

const encryptPass = async (password) => {
  const salt = await argon2.generateSalt
  const encrypt = await argon2.hash(password, salt)
  return encrypt
}

module.exports = {
    getUser,
    getUserById,
    insertNewUser,
    encryptPass
}