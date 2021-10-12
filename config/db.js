const Sequelize = require('sequelize');
const {DB, USER, PASSWORD, HOST, dialect} = require('config')

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    }
})

module.exports = sequelize;