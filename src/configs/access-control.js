const allow = async (ctx, next) => { 
    ctx.set({ 
        'Access-Control-Allow-Credentials': true, 
        'Access-Control-Allow-Origin': process.env.SERVER_ADDRESS,
        'Access-Control-Allow-Headers': 'Origin, X-Rquested-With, Content-Type, Accept, Authorization', 
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PATCH, PUT, DELETE'
     })
    await next()
}
module.exports = allow