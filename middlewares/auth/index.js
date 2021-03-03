const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const {user, message} = require('../../models');

// If user sign up
passport.use(
    'signup',
    new localStrategy({
            'usernameField': 'email', // field for username from req.body.email
            'passwordField': 'password', // field for password from req.body.password
            passReqToCallback: true // read other requests
        },
        async (req, email, password, done) => {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            // Create user data
            user.create({
                username: req.body.username,
                email: email, // email get from usernameField (req.body.email)
                password: hash, // password get from passwordField (req.body.passport)
            })
                .then((result) => {
                    // If success, it will return authorization with req.user
                    return done(null, result, {
                        message: "User created!",
                    });
                })
                .catch((err) => {
                    // If error, it will return not authorization
                    return done(null, false, {
                        message: "User can't be created",
                    });
                });
        },
    )
);

// If user login
passport.use(
    'signin',
    new localStrategy({
            'usernameField': 'email', // username from req.body.email
            'passwordField': 'password', // password from req.body.password
        },
        async (email, password, done) => {
            // find user depends on email
            const userSignin = await user.findOne({
                where: {
                    email: email
                }
            })

            // if user not found
            if (!userSignin) {
                return done(null, false, {
                    message: 'User is not found!'
                })
            }

            // if user found and validate the password of user
            const validate = await bcrypt.compare(password, userSignin.password);

            // if wrong password
            if (!validate) {
                return done(null, false, {
                    message: 'Wrong password!'
                })
            }

            // login success
            return done(null, userSignin, {
                message: 'signin success!'
            })
        }
    )
);

// Strategy for user role
passport.use(
    'user',
    new JWTstrategy({
            secretOrKey: 'secret_password', // key for jwt
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // extract token from authorization
        },
        async (token, done) => {
            // find user depend on token.user.email
           
            const userSignin = await user.findOne({
                where:{
                    email: token.user.email
                } 
            })
            
            // console.log(token, "token")
            // if user.role includes user it will next
            if (userSignin) {
                return done(null, token.user)
            }

            // if user.role not includes user it will not authorization
            return done(null, false)
        }
    )
)