let Sequelize = require('sequelize') // import sequelize

let { user } = require("../models")
let fs = require('fs')
let chai = require('chai'); // import chai for testing assert
let chaiHttp = require('chai-http'); // make virtual serber to get/post/patch/delete
let server = require('../index'); // import app from index
// const { formatNamedParameters } = require('sequelize/types/lib/utils');
let should = chai.should(); // import assertion should from chai
let token;
let tokenB;
let tokenC;
let idUser;


chai.use(chaiHttp); // user chai Http

describe('User API', () => {

    describe('/POST SIGNUP', () => {
        it('It should create a user and get authentication key (jwt)', (done) => {
            chai.request(server)
                .post('/user/signup')
                .send({
                    email: "abcde@gmail.com",
                    username: "abcde",
                    password: 'qwertyuiop',
                    passwordConfirmation: 'qwertyuiop'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("message").eql("Register success!")
                    res.body.should.have.property("token");
                    token = res.body.token;
                    done()
                })
        })
    })
})