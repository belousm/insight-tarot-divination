const { DataTypes } = require('sequelize')
const db = require('../db.js')

const Tasks = db.define('tasks',
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
        user_uid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        like: {
            type: DataTypes.TINYINT,
            allowNull: true
        },
        type: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        subtype: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        cards: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        selected_cards: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        processed_cards: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        prompt_request: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        prompt_response: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = Tasks