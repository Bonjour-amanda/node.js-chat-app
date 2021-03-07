const {
    message,
    user
} = require("../models")
// const message = require("../models/message")

const Sequelize = require('sequelize')
const Op  = Sequelize.Op


class MessageController {

// SEND CHAT (SEND MESSAGE)
    async sendMessage(req, res) {
        try {
            const results = message.create({
                message: req.body.message,
                senderId: req.user.id,
                receiverId: req.params.id
            })   
            .then(result => {
                res.json({
                    status: 'success',
                    data: result,
                    message: "message has been send"
                })
            })
            res.io.emit('message', {
                receiver: req.params.id,
                sender: req.user.id,
                results
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
                    [Op.or]: [
                        { senderId: req.user.id },
                        { receiverId: req.user.id }
                      ]
                }
            })
            .then(result => {
                res.json({
                    status: 'success',
                    data: result
                })
            })
    }

// GET ONE MESSAGE BY MESSAGE ID
    async getone_message(req, res) {
        message.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                res.json({
                    status: 'success',
                    data: result
                })
            })
    }
// UPDATE MESSAGE BY MESSAGE ID
    async update(req, res) {
        message.update(
            { message: req.body.message },
            { where: { id: req.params.id } }
          )
        .then(result => {
                res.json({
                    status: "success",
                    data: result,
                    message: "message has been edited"
                })
            })
    }
// DELETE MESSAGE BY MESSAGE ID
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