module.exports = (Section, Task) => {
    Section.hasMany(Task, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    Task.belongsTo(Section);
}