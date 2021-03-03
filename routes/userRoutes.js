const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../middlewares/auth');
const UserController = require('../controllers/userController');
const userValidator = require('../middlewares/validators/userValidator');

// SIGNUP
router.post('/signup', [userValidator.register, function(req, res, next) {
    passport.authenticate('signup', {
      session: false
    }, function(err, user, info) {

      if (!user) {
        res.status(401).json({
          status: 'Error',
          message: info.message
        });
        return;
      }
      UserController.signUp(user, req, res,next);
    })(req, res, next);
  }]);

//   SIGN IN
router.post('/signin', [userValidator.login, function(req, res, next) {
    passport.authenticate('signin', {
      session: false
    }, function(err, user, info) {

      if (!user) {
        res.status(401).json({
          status: 'Error',
          message: info.message
        });
        return;
      }
      UserController.signIn(user, req, res,next);
    })(req, res, next);
  }]);

// GET ONE USER
router.get('/getone/:id', [function(req, res, next) {
    passport.authenticate('user', {
      session: false
    }, async function(err, user, info) {
     
      if (!user) {
        res.status(401).json({
          status: 'Error',
          message: info.message
        });
        return;
      }
      UserController.getOne(user, req, res,next);
    })(req, res, next);
  }]);

// USER UPDATE
router.patch('/update/:id', [passport.authenticate('user', {
    session: false
})], UserController.update)

// USER DELETE
router.delete('/delete/:id', [passport.authenticate('user', {
    session: false
})], UserController.delete)
