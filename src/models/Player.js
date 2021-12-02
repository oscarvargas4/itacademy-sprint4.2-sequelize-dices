const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Player = sequelize.define('Player', {
    name: {
        type: DataTypes.STRING,
        unique: true
    }
});

module.exports = Player;