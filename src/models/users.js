
const Sequelize = require('sequelize');
const sequelize  = require('../../config/db');


const User = sequelize.define(
    'users',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {            
            type: Sequelize.TEXT,
            allowNull: false
        },
        email: {
            type: Sequelize.TEXT,
            unique: true,
            allowNull: false,
            
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false,            
        },
        phone: {
            type: Sequelize.TEXT
        },
        company: {
            type: Sequelize.TEXT
        },
        image: {
            type: Sequelize.BLOB
        }
    },
    {
        timestamps: false,
    }
)



module.exports = User;


