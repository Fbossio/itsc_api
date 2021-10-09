

const Sequelize = require('sequelize');
const sequelize  = require('../database/database');
const Profile = require('./profles');

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
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
              isEmail: {
                  msg: "Ingresa un email válido",
                }
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              min: [7],
              msg: "La contraseña debe tener al menos 7 caracteres"
            }
        }
    },
    {
        timestamps: false,
    }
)

User.hasOne(Profile, { foreignKey: "userid", sourceKey: "id" })
Profile.belongsTo(User, {foreignKey: "userid", sourceKey: "id"})

module.exports = User;


