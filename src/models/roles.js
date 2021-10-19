const Sequelize = require('sequelize');
const sequelize  = require('../../config/db');

const Rol = sequelize.define(
    'roles',
    {
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rolename : {
            type: Sequelize.TEXT,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
)


module.exports = Rol;