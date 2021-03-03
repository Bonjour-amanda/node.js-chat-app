const express = require('express');
const app = express()

const userRoutes = require('./userRoutes')
const messageRoutes = require('./messageRoutes')


app.get('/', (req, res) => {
    res.send('Hello Express!')
})

module.exports = { userRoutes, messageRoutes};