const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))
app.use(express.json())

io.on('connection', (socket) => {
    console.log('New Web Socket Connection')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('inputMessage', (message, callback) => {
        const filter = new Filter()
        if(filter.isProfane(message)) {
            return callback('Profanity banned')
        }

        io.emit('message', message)
        callback()
    })

    socket.on('location', (location, callback) => {
        socket.broadcast.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}`)
        callback('Location shared!')
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})