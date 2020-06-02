const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))
app.use(express.json())

io.on('connection', (socket) => {
    console.log('New Web Socket Connection')

    socket.on('inputMessage', (message) => {
        io.emit('outputMessage', message)
    })
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})