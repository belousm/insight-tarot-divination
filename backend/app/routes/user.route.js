const Users = require('../models/users.model.js');
const { userSimplify } = require('../models/common.js');

module.exports = function (app) {
    app.get("/api/user", async function (request, response) {
        let user_uid = request.query.user_uid;
        if (!user_uid) {
            return response.status(200).send({
                status: false,
                error: 'user_uid is empty'
            });
        }

        let user = await Users.findOne({
            where: {
                uid: user_uid
            }
        });

        if (!user) {
            return response.status(200).send({
                status: false,
                error: 'user not found'
            });
        }

        response.json({status: true, user: userSimplify(user)});
    });

    app.post("/api/user", async function (request, response) {
        let user_uid = request.body.user_uid;
        if (!user_uid) {
            return response.status(200).send({
                status: false,
                error: 'user_uid is empty'
            });
        }

        let user = await Users.findOne({
            where: {
                uid: user_uid
            }
        });

        if (!user) {
            user = await Users.create({
                uid: user_uid,
            });
        }

        if (request.body.name) {
            user.name = request.body.name;
        }

        if (request.body.sex) {
            user.sex = request.body.sex;
        }

        if (request.body.date_birth) {
            user.date_birth = request.body.date_birth
        }

        if (request.body.occupation) {
            user.occupation = request.body.occupation
        }

        if (request.body.relationship) {
            user.relationship = request.body.relationship
        }

        await user.save();
        return response.status(200).send({
            status: true,
            user: userSimplify(user)
        });
    });
}