const models = require("../models/user")
const passport = require('passport');
const jwt = require('jsonwebtoken');



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
        try{
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
        }catch(e){
            return res.status(401).json({
                    status: "Error!",
                    message: "register failed"
                  })
        }
    }

    async signIn(dataUser, req, res) {
        try{
            
        }catch(e){

        }
    }


}