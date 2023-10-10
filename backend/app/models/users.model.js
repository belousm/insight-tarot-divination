const { DataTypes } = require('sequelize')
const db = require('../db.js')

const Users = db.define('users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date_birth: {
            type: DataTypes.STRING,
            allowNull: true
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        relationship:{
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = Users;