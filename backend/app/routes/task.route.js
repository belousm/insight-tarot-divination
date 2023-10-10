const Sequelize = require('sequelize');
const { Op } = Sequelize;
const Cards = require("../models/cards.model");
const Tasks = require("../models/tasks.model");

const {uuid} = require("uuidv4");

const { taskSimplify, dict } = require('../models/common.js');

const { magic_runner } = require('../models/magic.js');

module.exports = function (app) {

    app.get("/run", async function(request, response){
        let task_uid = request.query.task_uid;
        console.log(task_uid);
        if (!task_uid) {
            return response.status(200).send({
                status: false,
                error: 'task_uid is empty'
            });
        }

        let task = await Tasks.findOne({
            where: {
                uid: task_uid
            }
        });

        if (!task) {
            return response.status(200).send({
                status: false,
                error: 'task not found'
            });
        }

        task.status = dict.TASK_STATUS_RUNNING;
        await magic_runner(task);

        response.json({status:true, task:taskSimplify(task)});
    });


    app.get("/api/get-day", async function (request, response) {
        let user_uid = request.query.user_uid;

        if (!user_uid) {
            return response.status(200).send({
                status: false,
                error: 'user_uid is empty'
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const task = await Tasks.findOne({
            where: {
                user_uid: user_uid,
                type: dict.TASK_TYPE_DAY,
                createdAt: {
                    [Op.between]: [today, endOfDay],
                },
            },
        });

        if (!task) {
            return response.json({status: true, task: {}});
        }

        response.json({status: true, task: taskSimplify(task)});
    });

    app.get("/api/get-cards", async function (request, response) {
        let user_uid = request.query.user_uid;
        let type = request.query.type || dict.TASK_TYPE_DAY;
        let subtype = request.query.subtype || dict.TASK_SUBTYPE_DAY_DEFAULT;

        if (!user_uid) {
            return response.status(200).send({
                status: false,
                error: 'user_uid is empty'
            });
        }

        let cards_data = [];
        let cards_items = await Cards.findAll();

        let range = Array.from({ length: cards_items.length }, (value, index) => index);
        range.sort(() => Math.random() - 0.5);

        range.forEach(i => {
            let item = cards_items[i];
            item.id = i;
            cards_data.push(item);
        })

        let task = await Tasks.create({
            user_uid: user_uid,
            uid: uuid(),
            cards: JSON.stringify(cards_data),
            selected_cards: JSON.stringify([]),
            type: type,
            subtype: subtype,
            status: dict.TASK_STATUS_DEFAULT
        });

        task.save();

        response.json({status: true, task: taskSimplify(task)});
    });

    app.get("/api/get-collections", async function (request, response) {
        let collections_data = [];

        let user_uid = request.query.user_uid;
        if (!user_uid) {
            return response.status(200).send({
                status: false,
                error: 'user_uid is empty'
            });
        }

        let query = {};
        query.where = {
            user_uid: user_uid
        };
        query.order = [["createdAt", "ASC"]];
        if (request.query.order && request.query.order === "DESC") {
            query.order = [["createdAt", "DESC"]];
        }
        if (request.query.type) {
            query.where.type = request.query.type;
        }
        if (request.query.like) {
            query.where.like = request.query.like;
        }

        let tasks = await Tasks.findAll(query);

        tasks.forEach(task => {
            collections_data.push(taskSimplify(task));
        });

        response.json({status: true, collections: collections_data});
    });

    app.get("/api/result", async function (request, response) {

        let task_uid = request.query.task_uid;
        if (!task_uid) {
            return response.status(200).send({
                status: false,
                error: 'task_uid is empty'
            });
        }

        let task = await Tasks.findOne({
            where: {
                uid: task_uid
            }
        });

        if (!task) {
            return response.status(200).send({
                status: false,
                error: 'task not found'
            });
        }

        response.json({status: true, task: taskSimplify(task)});
    });

    app.post("/api/select", async function (request, response) {

        let task_uid = request.body.task_uid;
        let card_ids = request.body.card_ids;
        if (!task_uid) {
            return response.status(200).send({
                status: false,
                error: 'task_uid is empty'
            });
        }
        if (!card_ids) {
            return response.status(200).send({
                status: false,
                error: 'card_ids is empty'
            });
        }
        try {
            card_ids = JSON.parse(card_ids);
        } catch (e) {
            return response.status(200).send({
                status: false,
                error: 'card_ids is not json array'
            });
        }

        let task = await Tasks.findOne({
            where: {
                uid: task_uid
            }
        });

        if (!task) {
            return response.status(200).send({
                status: false,
                error: 'task not found'
            });
        }

        if (task.status !== dict.TASK_STATUS_DEFAULT) {
            return response.status(200).send({
                status: false,
                error: 'task already run'
            });
        }

        task.selected_cards = JSON.stringify(card_ids);
        task.status = dict.TASK_STATUS_RUNNING;
        await task.save();

        magic_runner(task);

        response.json({status: true, task: taskSimplify(task)});
    });

    app.post("/api/like", async function (request, response) {

        let task_uid = request.body.task_uid;
        if (!task_uid) {
            return response.status(200).send({
                status: false,
                error: 'task_uid is empty'
            });
        }
        let task = await Tasks.findOne({
            where: {
                uid: task_uid
            }
        });

        if (!task) {
            return response.status(200).send({
                status: false,
                error: 'task not found'
            });
        }

        task.like = parseInt(request.body.value || 0);
        await task.save();

        response.json({status: true, task: taskSimplify(task)});
    });
}