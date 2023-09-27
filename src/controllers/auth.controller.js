const jwt = require('jsonwebtoken')
const passport = require('koa-passport')
const config = require('../configs')
// const service = require('../services/user.service')
// require('../strategy/passport/local')

// const getUserById = async (userId) => {
//   const user = await service.getUserById(userId)
//   return user
// }

passport.deserializeUser(async ( userId, done ) => {
    const user = await getUserById(userId)
    user ? done(null, user) : done('Unauthorized')
})

passport.serializeUser((user, done) => {
    done(null, user.id)
})

const register = async (ctx) => {
  const data = ctx.request.body;
  const userExist = await service.getUser(data.username)
  if (userExist) {
    ctx.status = 400
    ctx.body = {
      errors: [
        {
          status: ctx.status,
          title: 'Username Exist'
        }
      ]
    }
    return
  }
  data.password = await service.encryptPass(data.password)
  const user = await service.insertNewUser(data)
  ctx.status = 201
  ctx.body = {
    data: {
      attributes: {
        user: user
      },
      title: 'Registered Successfully',
      type: 'user'
    }
  }
};

const login = (ctx, next) => {
  return passport.authenticate('local', {session: false}, (error, user) => {
    if (error || !user) {
      ctx.status = 401;
      ctx.body = {
        errors: [
          {
            status: ctx.status,
            title: 'Authentication Failed.',
          },
        ],
      }
    return
    }
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      config.secret,
      {
        expiresIn: config.expiration
      }
    )
    ctx.body = {
      data: {
        title: 'Login Successfully.',
        type: 'token',
        username: user.username
      },
    }
    ctx.status = 200
  })(ctx, next)
}

module.exports = {
    register, login
//   getUser: async (ctx) => {
//     const params = ctx.params.id;
//     const user = await service.getUserById(params)
//     if (!user) {
//       ctx.status = 400;
//       ctx.body = {
//         errors: [
//           {
//             status: ctx.status,
//             title: 'No User Found.',
//           },
//         ],
//       }
//       return
//     }
//     ctx.body = {
//       data: {
//         attributes: {
//           user: user,
//         },
//         type: 'user',
//       },
//     };
//     ctx.status = 200
//   },

}