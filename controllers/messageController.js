const models = require("../models/message")
const Message = models.message
const User = models.user

class MessageController {

    constructor() {
        User.hasMany(Message, {
            foreignKey: "id_user"
        })
        Message.belongsTo(User, {
            foreignKey: 'id_message'
        })
    }
    

    

}
