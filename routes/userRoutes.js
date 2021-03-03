const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../middlewares/auth');
const UserController = require('../controllers/userController');
const userValidator = require('../middlewares/validators/userValidator');


// router.get('/', (req, res) => {
//     res.send('Hello Express!')
// })

// SIGNUP
router.post('/signup', [userValidator.signup, function(req, res, next) {
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
router.post('/signin', [userValidator.signin, function(req, res, next) {
    passport.authenticate('signin', {
      session: false
    }, function(err, user, info) {
      // console.log(user, "user 1")
      // console.log()

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
router.get('/getone_user', [function(req, res, next) {
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
router.patch('/update', [function(req, res, next) {
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
    UserController.update(user, req, res,next);
  })(req, res, next);
}]);

// USER DELETE
router.delete('/delete/:id', [passport.authenticate('user', {
    session: false
})], UserController.delete)

// export router
module.exports = router; 