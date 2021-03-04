const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../middlewares/auth');
const MessageController = require('../controllers/messageController');
// const MessageValidator = require("../middlewares/validator/messageValidator")


// CREATE 
router.post('/create', [passport.authenticate('user', {
    session: false
})], MessageController.create)

// GET ALL
router.get('/', passport.authenticate('user', {
    session: false
}),MessageController.getAll) 

// GET ONE
router.get('/getone_message/:id', passport.authenticate('user', {
    session: false
}), MessageController.getone_message)


// UPDATE
router.patch('/update/:id', [passport.authenticate('user', {
    session: false
})], MessageController.update)

// DELETE
router.delete('/delete/:id_message', [passport.authenticate('user', {
    session: false
})], MessageController.delete)


// export router
module.exports = router; 