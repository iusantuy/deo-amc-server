const Router = require('koa-router');
const controllers = require('../controllers/amc.controller');
const routes = new Router({
    prefix: '/amc'
})
routes
.post('/post', controllers.postAMC)
.get('/get', controllers.getAMC5)
module.exports = routes