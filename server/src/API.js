const sequelize = require('./DB.js');
const express = require("express");
const Task = require('./models/TaskModel')(sequelize.db, sequelize.dt);
const Section  = require('./models/SectionModel')(sequelize.db, sequelize.dt);

const mainAPI = async (app) => {
    await sequelize.db.sync();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.get("/api", (req, res) => {
        res.json({message: "Hello from server!"})
    });

    app.get("/api/section", async (req, res) => {
        await Section.findAll()
        .then((section) => res.send(section))
        .catch((err) => {
            console.error(JSON.stringify(err));
            return res.send(err);
        });
    });

    app.get("/api/task", async (req, res) => {
        await Task.findAll()
        .then((task) => res.send(task))
        .catch((err) => {
            console.error(JSON.stringify(err));
            return res.send(err);
        })
    });

    app.post("/api/section/", async (req, res) => {
        const { section } = req.body;
        await Section.create({ section_name: section })
        .then((section) => res.send(section))
        .catch((err) => {
            console.error(JSON.stringify(err));
            return res.status(400).send(err);
        });
    });

    app.post("/api/task", async (req, res) => {
        const { title, description, labels, sectionIDForTask } = req.body;
        await Task.create({ task_name: title, task_description: description, task_labels: labels, section_id: sectionIDForTask })
        .then((task) => res.send(task))
        .catch((err) => {
            console.error(JSON.stringify(err));
            return res.status(400).send(err);
        });
    });

    app.put("/api/section/:id", (req, res) => {

    });

    app.put("/api/task/:id", (req, res) => {

    });

    app.delete("/api/section/:id", (req, res) => {

    });

    app.delete("/api/task/:id", (req, res) => {

    });
}

exports.mainAPI = mainAPI;