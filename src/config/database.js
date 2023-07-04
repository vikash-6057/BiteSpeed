const Sequelize = require('sequelize');

const dbName = process.env.dbName
const dbUser = process.env.dbUser
const dbHost = process.env.dbHost
const dbDriver = process.env.dbDriver
const dbPassword = process.env.dbPassword
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    dialectModule: require('mysql2'),
    logging: false
});

exports.sequelize = sequelize;