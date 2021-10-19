
const Sequelize = require('sequelize');
const sequelize  = require('../../config/db');
const Rol = require('./roles')

const Usuario = sequelize.define(
    'usuarios',
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
        userlastname: {
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
        imagen: {
            type: Sequelize.TEXT
        },
        telefono: {
            type: Sequelize.TEXT
        },
        empresa: {
            type: Sequelize.TEXT
        },
        instagram_link: {
            type: Sequelize.TEXT
        },
        facebook_link: {
            type: Sequelize.TEXT
        },
        twitter_link: {
            type: Sequelize.TEXT

        },
        wallet_address: {
            type: Sequelize.TEXT
        }
        
    },
    {
        timestamps: false,
    }
)

Usuario.hasOne(Rol)
Rol.belongsTo(Usuario)

module.exports = Usuario;


