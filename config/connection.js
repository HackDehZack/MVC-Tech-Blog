const Sequelize = require('sequelize');
require('dotenv').config();
//calling the dotenv dependency to hide sensitive information
let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(
        process.env.JAWSDB_URL,
        );
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        // will use .env file to hide sensitive information
        {
            host: `localhost`,
            dialect: `mysql`,
            port: 3306
        }
    )
};

module.exports = sequelize;
//exporting the sequelize object to be used in other files