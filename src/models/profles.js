const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');

const Profile = sequelize.define(
    'profiles',
    {
        image: {
            type: Sequelize.BLOB
        },
        phone: {
            type: Sequelize.TEXT
        },
        company: {
            type: Sequelize.TEXT
        },
        userid: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Profile;