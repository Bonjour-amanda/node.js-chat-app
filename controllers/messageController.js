const {Message, User} = require("../models")


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
