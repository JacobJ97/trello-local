const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.NODE_ENV === 'test' ? ':memory:' : './db/dblocal.db',
    logging: false
});

module.exports = {
    sequelize,
    DataTypes
};