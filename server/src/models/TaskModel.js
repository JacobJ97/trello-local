const {sequelize, DataTypes} = require('../DB');

const Task = sequelize.define('Task', {
    task_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    task_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    task_labels: {
        type: DataTypes.STRING,
    },
    task_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Task;