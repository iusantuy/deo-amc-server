const { 
    createAMC, 
    readAMCId, 
    updateAMC, 
    deleteAMC, 
    countAMC, 
    readAMC5
 } = require('../services/amc.service')

module.exports = { 
    postAMC: async ( ctx ) => { 
            try {        
                let body = ctx.request.body
                const create = await createAMC( body )
                ctx.response.status = 201
                ctx.body = create
            } catch ( e ) {
                ctx.body = e.message
                ctx.throw( 400 )
            }
     },

    getAMC5: async ( ctx ) => { 
            try {     
                ctx.body = await readAMC5()
                ctx.response.status = 200
            } catch ( e ) {
                ctx.body = e.message
                ctx.throw( 400 ) 
            }
     },
    
    getAMCId: async ( ctx ) => { 
            try {
                const id = ctx.params.id
                ctx.body = await readAMCId( id )
                ctx.response.status = 200
            } catch ( e ) {
                ctx.body = e.message
                ctx.throw( 400 )
            }
     }, 
    
    putAMC: async ( ctx ) => { 
            try {       
                const id = ctx.params.id
                let body = ctx.request.body
                const update = await updateAMC( body, id )
                ctx.response.status = 200
                ctx.body = update
            } catch ( e ) {
                ctx.throw( 401 )
            }
     }, 
    
    deleteAMC: async ( ctx ) => { 
            try {       
                const id = ctx.params.id
                ctx.body = await deleteAMC( id )
                ctx.response.status = 200
            } catch ( e ) {
                ctx.throw( 401 )
            }
     },

    countAMC: async (ctx) => {
            try {
                ctx.body = await countAMC()
                ctx.response.status = 200
            } catch ( e ) {
                ctx.throw( 401 )
            }
     }
 }