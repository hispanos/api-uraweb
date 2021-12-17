const dotenv = require('dotenv').config();

module.exports = {
    APP_DOMAIN: process.env.APP_DOMAIN || 'http://localhost:3000',
    PORT: process.env.PORT || 5000,
    DB_SERVER: process.env.DB_SERVER || 'localhost',
    DB_DB_NAME: process.env.DB_DB_NAME || 'demo_node',
    DB_USER_NAME: process.env.DB_USER_NAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    JWT_MINUTES: process.env.JWT_MINUTES || 10,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'phrase',
    PROD_ACCESS_TOKEN: process.env.PROD_ACCESS_TOKEN || 'token',
    SERVER_DOMAIN: process.env.SERVER_DOMAIN || 'http://localhost/5000'
}