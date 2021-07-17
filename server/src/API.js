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
    await Task.findAll()
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
    const { title, description, labels, sectionIDForTask } = req.body;
    await Task.create({ task_name: title, task_description: description, task_labels: labels, SectionSectionId: sectionIDForTask })
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
    const { title, description, labels } = req.body;
    let argument;
    let argValue;
    if (title) {
        argument = 'task_name';
        argValue = title;
    } else if (description) {
        argument = 'task_description';
        argValue = description;
    } else if (labels) {
        argument = 'task_labels';
        argValue = labels
    }
    await Task.update({ [argument]: argValue }, { where: { task_id: id} })
    .then(task => task == 1 ? res.status(204).send() : res.status(400).send());
});

app.delete("/api/section/:id", async (req, res) => {
    const { id } = req.params;
    await Section.destroy({ where: { section_id: id } })
    .then(section => section == 1 ? res.status(200).send() : res.status(404).send())
});

app.delete("/api/task/:id", async (req, res) => {
    const { id } = req.params;
    await Task.destroy({ where: { task_id: id } })
    .then(task => task == 1 ? res.status(200).send() : res.status(404).send())
});

module.exports = app;