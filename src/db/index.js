const mongodb = require('mongodb').MongoClient;
const config = require('../configs');
const options = require('./options');

const client = new MongoClient(config.uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

const db = new mongodb(config.uri, options);

(async(dbName) => {
    try { 
       await db.connect()
        .then(c => { 
            return c.db(dbName).command({ping: 1]);
        });
        console.log('Connected to database')
     } 
    catch (e) {
        console.log('Not connected to database, please make sure your database is running');
        await db.close();
     }
})()

module.exports = db
