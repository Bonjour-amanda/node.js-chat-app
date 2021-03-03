const {
    check,
    validationResult,
    matchedData,
    sanitize
} = require('express-validator'); //form validation & sanitize form params
const {
    user
} = require('../../models');

const Op = require('sequelize').Op;
const path = require('path');


module.exports ={
    signup: [
        check('username', 'username must be filled with characters').isString().notEmpty().custom(value => {
            return user.findOne({
                where: {
                    username: value
                  }
            }).then(e => {
                if (e) {
                    throw new Error('this username has been used, please use another username !');
                }
            })
        }),
        check('email', 'email field must be email address ').normalizeEmail().isEmail().custom(value => {
            return user.findOne({
                where: {
                    email: value
                  }
            }).then(e => {
                if (e) {
                    throw new Error('this email has been used, please use another email !');
                }
            })
        }), // email must be email
        check('password', 'password field must have 8 to 32 characters').isString().isLength({
            min: 8,
            max: 32
        }), // password must be 8 to 32 chars
        check('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field').exists()
        .custom((value, {
            req
        }) => value === req.body.password),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.mapped()
                });
            }
            next();
        }
    ],

    signin: [
        check('email', 'Email Field Must be Email Address').normalizeEmail().isEmail().custom(value => {
          return user.findOne({
            where: {
              email: value
            }
          }).then(result => {
            if (!result) {
              throw new Error("Email Doesn't Exist")
            }
          })
        }),
        check('password', 'Password Field Must Have 8 to 32 Characters').isString().isLength({
          min: 8,
          max: 32
        }),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(422).json({
              errors: errors.mapped()
            });
          }
          next();
        }
      ],

    getOne: [
        check('id').custom(value => {
            return user.findOne({
                _id: value
            }).then(result => {
                if (!result) {
                    throw new Error('no data user !')
                }
            })
        }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.mapped()
                });
            }
            next();
        },
    ],

    update: [
        //Set form validation rule
        check('id').custom(value => {
            return user.findOne({
                _id: value
            }).then(e => {
                if (!e) {
                    throw new Error('No data user !');
                }
            })
        }),
        check('username').custom(value => {
            return user.findOne({
                username: value
            }).then(e => {
                if (e) {
                    throw new Error('this username has been used, please use another username !');
                }
            })
        }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.mapped()
                });
            }
            next();
        },
    ],
}