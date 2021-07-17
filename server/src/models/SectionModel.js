const {sequelize, DataTypes} = require('../DB');

const Section = sequelize.define('Section', {
    section_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    section_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Section;