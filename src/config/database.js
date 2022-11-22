const dotenv = require ('dotenv');

dotenv.config();

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERMAME,
    password: process.env.DB_PASSWORD,
    timezone: '-03:00',
    database: process.env.DB_DATABASE,
    define: {
        timestamps: true,
    },
};