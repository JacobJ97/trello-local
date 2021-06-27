const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/dblocal.db'
});

module.exports = {
    db: sequelize,
    dt: DataTypes
}