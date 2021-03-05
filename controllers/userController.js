const { user, message } = require("../models")
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class UserController {

    constructor() {

        user.hasMany(message, {
            foreignKey: "message.id"
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
                email: dataUser.email
            }
            // create jwt token from body variable
            const token = jwt.sign({
                user: body
            }, 'secret_password')

            // success to create token
            res.status(200).json({
                message: 'Sign in success!',
                token: token,
                user_id: dataUser.id
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
                id: dataUser.id
            },
            attributes: ["id", "email", "username"]
        })
        .then(result => {
            // console.log(result)
            res.json({
                status: 'success',
                data: result
            })
        })     
    }

    async update(dataUser, req, res) {
        user.update(
            {username: req.body.username},
            {where: {id: dataUser.id}}
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
        user.destroy({
            where: {
                id:req.params.id
            }
        })
        .then (result => {
            res.json({
                status: 'success',
                message: "success delete the user"
            })
        })
    }

}
module.exports = new UserController;