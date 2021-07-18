const { Pool } = require('pg');

if(process.env.DATABASE_URL) {

    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
        rejectUnauthorized: false
        }
    });
} else {
    pool = new Pool({
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DB_PORT
    });
}

module.exports = pool;