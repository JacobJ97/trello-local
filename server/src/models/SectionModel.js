module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Section', {
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
}