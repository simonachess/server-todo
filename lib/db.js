const mysql = require('mysql2/promise');

const db = {};

db.init = async ({ host, user, database }) => {
    // await db.dropDatabase({ host, user, database });
    const connection = await db.createDatabase({ host, user, database });

    // await db.createTableTasks(connection);

    // uzpildom X1 lentele

    return connection;
}

db.dropDatabase = async ({ host, user, database }) => {
    host = host ? host : 'localhost';
    user = user ? user : 'root';

    try {
        const conn = await mysql.createConnection({ host, user });
        await conn.execute(`DROP DATABASE IF EXISTS \`${database}\``);
        console.log('Buvusi duombaze istrinta');
    } catch (error) {
        console.log(`Iskilo bedu bandant pasalinti duombaze "${database}"`);
        return error;
    }
}

db.createDatabase = async ({ host, user, database }) => {
    host = host ? host : 'localhost';
    user = user ? user : 'root';

    try {
        let conn = await mysql.createConnection({ host, user });
        await conn.execute(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
        await conn.end();

        conn = await mysql.createConnection({ host, user, database });
        console.log('Nauja duombaze sukurta');
        return conn;
    } catch (error) {
        console.log(`Iskilo bedu bandant sukurti duombaze "${database}"`);
        return error;
    }
}

db.createTableTasks = async (connection) => {
    try {
        const query = 'CREATE TABLE IF NOT EXISTS `tasks` (\
                            `id` int(10) NOT NULL AUTO_INCREMENT,\
                            `text` varchar(1000) COLLATE utf8_swedish_ci NOT NULL,\
                            `status` int(1) DEFAULT 0 NOT NULL,\
                            `date` timestamp NOT NULL DEFAULT current_timestamp(),\
                            PRIMARY KEY(`id`)\
                        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;';
        await connection.execute(query);
    } catch (error) {
        console.log('Nepavyko sukurti uzduociu lenteles');
        console.log(error);
        return error;
    }
}

module.exports = db;
