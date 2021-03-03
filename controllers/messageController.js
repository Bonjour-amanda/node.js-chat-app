const {Message, User} = require("../models")
const message = require("../models/message")


class MessageController {

    constructor() {
        User.hasMany(Message, {
            foreignKey: "id_user"
        })
        Message.belongsTo(User, {
            foreignKey: 'id_message'
        })
    }

    async create(req, res) {
        message.create({
            messageTittle: req.body.messageTittle,
            message: req.body.message
        })
        .then(result => {
            res.json({
                status: 'success',
                data: result
            })
        })   
    }

    async getone_message (req, res) {
        message.findOne({
            where :{
                _id: req.params.id
            },
            attributes: ["id", "messageTittle", "message"]
        })
        .then(result => {
            res.json({
                status: 'success',
                data: result
            })
        })     
    }

    async getAll (req, res) {
        message.findAll({
            include: [{
                model: users,
                as: "createdBy"
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
        message.update(
            {where: req.params.id},
            {messageTittle: req.body.messageTittle}
        )
        .then(result => {
            res.json({
                status: "succes",
                data: result,
                message :"username has been changed"
            })
        })
    }

    async delete(req, res) {
        message.destroy({
            where: {
                id:req.params.id
            }
        })
        .then (result => {
            res.json({
                status: 'success',
                message: "success delete the message"
            })
        })
    }

    
}
module.exports = new MessageController;
