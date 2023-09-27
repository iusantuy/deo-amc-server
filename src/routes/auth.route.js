const Router = require('koa-router');
const controllers = require('../controllers/auth.controller');
const routes = new Router({
    prefix: '/auth'
})
routes
.post('/register', controllers.register)
.get('/login', controllers.login)
module.exports = routes