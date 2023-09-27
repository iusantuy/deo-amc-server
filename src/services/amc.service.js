const moment = require('moment')
const { v4: uuidv4} = require('uuid')
const config = require('../config')
const mdb = require('../db/index').db( config.db ).collection('AMC');
const objectId = require('mongodb').ObjectId

module.exports = { 
    createAMC: ( Data_AMC ) => { 
        const _create = mdb.insertOne({ 
            id: uuidv4(),
            ...Data_AMC,
            createdAt: moment(new Date()).format('L'),
            time: moment(new Date()).format('h:mm:ss a'),
        })
        return _create
     }, 

    readAMC5: (_id) => { 
        const _read = mdb.find().sort({_id: -1}).limit(5).toArray()
        return _read
     }, 

    readAMCId: ( _id ) => {      
        const _readId =  mdb.findOne({ _id: objectId( _id ) })
        return _readId
     }, 

    updateAMC: ( _id, Data_AMC ) => { 
        const _update =  mdb.replaceOne({ _id: objectId( _id )}, Data_AMC).ops[0]
        return _update
     }, 
     
    deleteAMC: ( _id ) => { 
        const _delete = mdb.deleteOne({ _id: objectId( _id ) })
        return _delete
     }, 

    countAMC: async () => {
        const _count = await mdb.countDocuments()
        return _count
    }
 }
