const path = require('path')
const http = require('http')
const socketio = require("socket.io")
const express = require('express') // Import Express
const message = require('./controller/messages')
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./controller/user')


const app = express() // Create app from express
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public'))); // set static folder

const botName = 'real-time Chat';

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ // on => listener
        username,
        room
    }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Welcome the current user
        // emit => speaker (request)
        socket.emit('message', message(botName, 'Welcome to amanda chat'));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit('message', message(botName, `${user.username} has joined the chat`))


        // send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id)

        io.to(user.room).emit('message', message(user.username, msg));
    })

    // runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)

        if(user) {
            io.to(user.room).emit('message', (botName, `${user.username} has left the chat`))

            // send users and room info
            io.to(user.room).emit('roomUser', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })

})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // make application have port 3000

// app.use('/transaksi', transaksiRoutes) // If accessing localhost:3000/transaksi/*, it will use transaksiRoutes