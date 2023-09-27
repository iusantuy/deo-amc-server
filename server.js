const KOA = require('koa');
const bodyParser = require('koa-bodyparser');
// const compression = require('compression');
const cors = require('@koa/cors');
const allow = require('./src/configs/access-control');
const helmet = require('koa-helmet');
const routes = require('./src/routes/auth.route');
// const config = require('./src/configs');
// const database = require('./src/db');
const app = new KOA();

app
.use(helmet())
.use(bodyParser())
.use(cors())
.use(allow)
.use(routes.routes())
.use(routes.allowedMethods())
.use((err, ctx, next) => {
    err.status = err.status || 'fail';
    err.statusCode = err.statusCode || 500;

    ctx.status(err.statusCode).json({
        status: err.status,
        message: transformMessage(err.message),
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});
// app.use(compression());
// app.use(async (ctx, next) => { 
//     ctx.set({ 
//         'Access-Control-Allow-Credentials': true, 
//         'Access-Control-Allow-Origin': "*",
//         'Access-Control-Allow-Headers': 'Origin, X-Rquested-With, Content-Type, Accept, Authorization', 
//         'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PATCH, PUT, DELETE'
//      })
//     await next()
//  }); 



// ((ctx) => { 
//     try {
//         app.listen( config.server.port, () => { 
//             database
//          })
//         console.log('Server Running');
//         ctx.response.status = 200
//     } catch (e) {
//         // ctx.throw(400)
//         // ctx.status = e.status || 400
//         // ctx.body = e.message
//     }
//  })();
module.exports = app