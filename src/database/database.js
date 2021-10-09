const Sequelize = require('sequelize');
const User = require('../models/users');
const Profile = require('../models/profles');


const config = {
    "HOST": "localhost",
    "USER": "postgres",
    "PASSWORD": "postgres",
    "DB":"solana-wallet",
    "dialect": "postgres"
}

const db = config['DB']
const host = config['HOST']
const password = config['PASSWORD']
const user = config['USER']
const dialect = config['dialect']

const sequelize = new Sequelize(db, user, password, {
    host: host,
    dialect: dialect,
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    }
})


module.exports = sequelize;

