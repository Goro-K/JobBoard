const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: PORT,
    database: 'jobBoard',
});

if (pool) {
    console.log('Connected to database');
}

module.exports = pool;

