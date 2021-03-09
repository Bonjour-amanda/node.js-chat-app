// Import Modules
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors') //Enable cors request
const Sequelize = require('sequelize')
const socket = require('socket.io')

// require('dotenv').config({
//     path: `.env.${process.env.NODE_ENV}`
//   })

// Import Routes
const route = require('./routes')
const userRoutes = require('./routes/userRoutes.js')
const messageRoutes = require('./routes/messageRoutes.js');

const Op  = Sequelize.Op

const http = require('http').Server(app)
const io = socket(http)

app.use(cors())
app.use((req, res, next) => {
    req.Op = Op
    res.io = io
    next()
});

// Parsing the body of incoming requests
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Static files
app.use(express.static('public'))


// Connect the routes with
app.get('/', (req, res) => {
    res.send('Hello chat app!')
})

app.use('/user', userRoutes);
app.use('/message', messageRoutes);

// Listen to port 3000 
app.listen(3000,()=> console.log("server running on http://localhost:3000")); 

module.exports = app