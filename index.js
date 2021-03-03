// Import Modules
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors') //Enable cors request

// Import Routes
const routes = require('./routes')
const userRoutes = require('./routes/userRoutes.js')
const messageRoutes = require('./routes/messageRoutes.js')

app.use(cors())

// Parsing the body of incoming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Static files
app.use(express.static('public'))


// Connect the routes with
app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.use('/user', userRoutes);
app.use('/message', messageRoutes);

// Listen to port 3000 
app.listen(3000,()=> console.log("server running on http://localhost:3000")); 

module.exports = app