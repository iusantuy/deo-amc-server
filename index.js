const app = require('./server');
const database = require('./src/db');
const port = process.env.SERVER_PORT;
app.listen(port, () => {database})
console.log('server running');