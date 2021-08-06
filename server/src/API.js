const {sequelize} = require('./DB.js');
const express = require("express");
const Task = require('./models/TaskModel');
const Section  = require('./models/SectionModel');
const e = require('express');
require('./models/ModelAssociation')(Section, Task);
const app = express();

const startDB = async() => {
    await sequelize.sync();
}

startDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
    res.json({message: "Hello from server!"})
});

app.get("/api/section", async (req, res) => {
    await Section.findAll()
    .then((section) => res.send(section))
});

app.get("/api/task", async (req, res) => {
    await Task.findAll({
        order: [
            ['SectionSectionId', 'ASC'],
            ['task_order', 'ASC']
        ]
    })
    .then((task) => res.send(task))
});

app.post("/api/section", async (req, res) => {
    const { section } = req.body;
    await Section.create({ section_name: section })
    .then((section) => res.send(section))
    .catch((err) => {
        return res.status(400).send(err);
    });
});

app.post("/api/task", async (req, res) => {
    const { title, description, labels, orderID, sectionIDForTask } = req.body;
    await Task.create({ task_name: title, task_description: description, task_labels: labels, task_order: orderID, SectionSectionId: sectionIDForTask })
    .then((task) => res.send(task))
    .catch((err) => {
        return res.status(400).send(err);
    });
});

app.put("/api/section/:id", async (req, res) => {
    const { id } = req.params;
    const { section } = req.body
    await Section.update({ section_name: section }, { where: { section_id: id} })
    .then(section => section == 1 ? res.status(204).send() : res.status(400).send() )
});

app.put("/api/task/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, labels, orderID, sectionIDForTask, startingIndex, destinationSectionID} = req.body;
    let argument;
    if (title) {
        argument = {task_name: title}
    } else if (description) {
        argument = {task_description: description}
    } else if (labels) {
        argument = {task_labels: labels}
    } else if (orderID && sectionIDForTask && startingIndex) {
        argument = {task_order: orderID}
        if (startingIndex > orderID) {
            await sequelize.query(`UPDATE Tasks SET task_order = task_order + 1 WHERE SectionSectionId = ${sectionIDForTask} AND task_order < ${startingIndex} AND task_order >= ${orderID}`);
        } else {
            await sequelize.query(`UPDATE Tasks SET task_order = task_order - 1 WHERE SectionSectionId = ${sectionIDForTask} AND task_order > ${startingIndex} AND task_order <= ${orderID}`);
        }
    } else if (orderID && sectionIDForTask && destinationSectionID) {
        argument = {task_order: orderID, SectionSectionId: destinationSectionID}
        await sequelize.query(`UPDATE Tasks SET task_order = task_order - 1 WHERE SectionSectionId = ${sectionIDForTask} AND task_order > ${orderID}`);
        await sequelize.query(`UPDATE Tasks SET task_order = task_order + 1 WHERE SectionSectionId = ${destinationSectionID} AND task_order > ${orderID}`);
    }
    await Task.update(argument, { where: { task_id: id} })
    .then(task => task == 1 ? res.status(204).send() : res.status(400).send());
});

app.delete("/api/section/:id", async (req, res) => {
    const { id } = req.params;
    await Section.destroy({ where: { section_id: id } })
    .then(section => section == 1 ? res.status(200).send() : res.status(404).send())
});

app.delete("/api/task/:id", async (req, res) => {
    const { id } = req.params;
    const {orderID, sectionIDForTask} = req.body;
    //custom query to adjust task order values in DB for relevant section/position
    await sequelize.query(`UPDATE Tasks SET task_order = task_order - 1 WHERE SectionSectionId = ${sectionIDForTask} AND task_order > ${orderID}`);
    await Task.destroy({ where: { task_id: id } })
    .then(task => task == 1 ? res.status(200).send() : res.status(404).send())
});

module.exports = app;