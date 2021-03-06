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

    // SEND CHAT (SEND MESSAGE)
    async sendMessage(req, res) {
        try {
            const results = message.create({
                message: req.body.message,
                senderId: req.user.id,
                receiverId: req.params.id
            })
            res.io.emit('message', {
                receiver: req.params.id,
                sender: req.user.id,
                results
            })
            res.json(results => {
                res.json({
                    status: 'success',
                    data: results
                })
            })
        } catch (e) {
            return res.status(401).json({
                status: "Error!",
                message: "fail sending message"
            })

        }
    }

    // SHOW CHAT (SHOW ALL MESSAGE)
    async getAllMessage(req, res) {
        message.findAll({
                where: {
                    id: {
                        [req.Op.notIn]: [req.user.id]
                    }
                }
            })
            .then(result => {
                res.json({
                    status: 'success',
                    data: result
                })
            })
    }

    // async create(req, res) {
    //     message.create({
    //             message: req.body.message,
    //         })
    //         .then(result => {
    //             res.json({
    //                 status: 'success',
    //                 data: result
    //             })
    //         })
    // }

    // async getone_message(req, res) {
    //     message.findOne({
    //             where: {
    //                 _id: req.params.id
    //             },
    //             include: [{
    //                 model: db.user,
    //             }],
    //             attributes: ["id", "senderId", "receiverId", "message"]
    //         })
    //         .then(result => {
    //             res.json({
    //                 status: 'success',
    //                 data: result
    //             })
    //         })
    // }

    // async getAll(req, res) {
    //     message.findAll({
    //             where: {
    //                 id: {[req.Op.notIn]: [req.userData.id]}
    //             }
    //         })
    //         .then(result => {
    //             res.json({
    //                 status: 'success',
    //                 data: result
    //             })
    //         })
    // }

    // async update(req, res) {
    //     message.update({
    //             where: req.params.id
    //         }, {
    //             message: req.body.message
    //         })
    //         .then(result => {
    //             res.json({
    //                 status: "success",
    //                 data: result,
    //                 message: "username has been changed"
    //             })
    //         })
    // }

    // async delete(req, res) {
    //     message.destroy({
    //             where: {
    //                 id: req.params.id
    //             }
    //         })
    //         .then(result => {
    //             res.json({
    //                 status: 'success',
    //                 message: "success delete the message"
    //             })
    //         })
    // }


}
module.exports = new MessageController;