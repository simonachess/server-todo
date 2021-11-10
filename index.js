const config = require('./config.js');
const db = require('./lib/db.js');
const server = require('./lib/server.js');


const app = {};

app.init = async () => {
    // pasiruosti pradinius folder'ius
    // pasiruosti pradinius failus
    // prisijungti prie DB
    const connection = await db.init(config.db);

    // uzkurti serveri
    server.init(connection);
};

app.init();

module.exports = app;