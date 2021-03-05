const {
    message,
    user
} = require("../models")
// const message = require("../models/message")


class MessageController {

    // constructor() {
    //     message.belongsToMany(user, {
    //         foreignKey: 'message.id'
    //     })
    // }

    async create(req, res) {
        message.create({
                message: req.body.message,
            })
            .then(result => {
                res.json({
                    status: 'success',
                    data: result
                })
            })
    }

    async getone_message(req, res) {
        message.findOne({
                where: {
                    _id: req.params.id
                },
                include: [{
                    model: db.user,
                }],
                attributes: ["id", "senderId", "receiverId", "message"]
            })
            .then(result => {
                res.json({
                    status: 'success',
                    data: result
                })
            })
    }

    async getAll(req, res) {
        message.findAll({
                include: [{
                    model: user,
                    senderId: user.id,
                    receiverId: user.id
                }]
            })
            .then(result => {
                res.json({
                    status: 'success',
                    data: result
                })
            })
    }

    async update(req, res) {
        message.update({
                where: req.params.id
            }, {
                message: req.body.message
            })
            .then(result => {
                res.json({
                    status: "succes",
                    data: result,
                    message: "username has been changed"
                })
            })
    }

    async delete(req, res) {
        message.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                res.json({
                    status: 'success',
                    message: "success delete the message"
                })
            })
    }


}
module.exports = new MessageController;