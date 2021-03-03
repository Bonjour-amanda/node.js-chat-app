const { User, Message } = require("../models")
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



class UserController {

    constructor() {

        User.hasMany(Message, {
            foreignKey: "id_message"
        })
        Message.belongsTo(User, {
            foreignKey: "id_message"
        })
    }

    async signUp(dataUser, req, res) {
        try {
            const body = {
                id: dataUser.id,
                email: dataUser.email,
                username: dataUser.username,
                password: dataUser.password
            }

            const token = jwt.sign({
                user: body
            }, 'secret_password');

            return res.status(200).json({
                status: "success",
                message: "Register success!",
                token: token,
            })
        } catch (e) {
            return res.status(401).json({
                status: "Error!",
                message: "register failed"
            })
        }
    }

    async signIn(dataUser, req, res) {
        try {
            const body = {
                id: dataUser.id,
                email: dataUser.email,
            }
            // create jwt token from body variable
            const token = jwt.sign({
                user: body
            }, 'secret_password')

            // success to create token
            res.status(200).json({
                message: 'Sign in success!',
                token: token,
                user_id: user._id
            })

        } catch (e) {
            return res.status(401).json({
                status: "Error!",
                message: "signin failed"
            })
        }
    }

    async getOne (dataUser, req, res) {
        user.findOne({
            where :{
                _id: req.params.id
            },
            attributes: ["id", "email", "username"]
        })
        .then(result => {
            res.json({
                status: 'success',
                data: result
            })
        })     
    }

    async update(req, res) {
   
    }

}
module.exports = new UserController;