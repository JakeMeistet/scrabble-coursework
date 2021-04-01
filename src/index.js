const express = require('express') // Imports Express.js for use with the web application
const fs = require('fs')
const Crypto = require('crypto')
const socket = require('socket.io')
const colour = require('colour')
const port = 80 // HTTP Port

colour.setTheme({
  startup: 'rainbow',
  running: 'blue',
  error: 'red'
})

const app = express()

app.use(express.static('app'))

app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// when status is 404, error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  if (err.status === 404) {
    res.send('<h1 style="text-align: center;">404: File not found</h1>')
  }

  // when status is 500, error handler
  if (err.status === 500) {
    return res.send({ message: 'error occur' })
  }
})

// app.use(bodyParser.urlencoded({ extended: true }))

// Listens to port 80, and if an error occurs, logs it to console
const server = app.listen(port, err => {
  if (!err) {
    console.log('Server Starting'.startup)
    console.log('Server running on port:'.running, port)
  }
})

const io = socket(server)

io.on('connection', (socket) => {
  console.log('A user just connected.')

  socket.on('disconnect', () => {
    console.log('A user has disconnected.')
  })
  const uid = Crypto.randomBytes(32).toString('hex')
  const ip = socket.request.connection.remoteAddress
  console.log(ip)
  // socket.on('startGame', (username) => {

  socket.on('newPlayer', (username) => {
    console.log(username)
    const credentials = { username: username, uid: uid, ip: ip }
    console.log(credentials)
    io.to(socket.id).emit('newPlayer', credentials)
    // io.emit('newPlayer', credentials)
  })

  socket.on('pastPlayer', (credentials) => {
    const newCredentials = { username: credentials.username, uid: credentials.uid, ip: ip }
    console.log(credentials)
    io.to(socket.id).emit('pastPlayer', newCredentials)
    // io.emit('pastPlayer')
  })

  socket.on('createLobby', () => {
    const gameId = Crypto.randomBytes(4).toString('hex').toUpperCase()
    const socketId = socket.id
    console.log(gameId)
    console.log(socketId)
    socket.join(gameId)
    console.log(io.sockets.adapter.rooms)
    io.to(gameId).emit('lobbyJoined', { gameId: gameId, socketId: socketId })
    // io.emit('createLobby', {gameId: gameId, socketId: socketId})
  })

  socket.on('joinLobby', (data) => {
    const lookUp = io.sockets.adapter.rooms.get(data.gameId)
    console.log(data.gameId)
    console.log(lookUp)
    console.log(lookUp.size)
    if (lookUp === undefined) {
      io.to(socket.id).emit('noLobby', data.gameId)
    } else {
      if (lookUp.size == 2) {
        io.to(socket.id).emit('fullLobby', data.gameId)
      } else {
        const socketId = socket.id
        console.log(data.gameId)
        socket.join(data.gameId)
        console.log(io.sockets.adapter.rooms)
        console.log(lookUp.size)
        const arr = Array.from(lookUp)
        console.log(arr[0])
        console.log(arr[1])
        io.in(data.gameId).emit('playerJoined', data)
        io.to(arr[0]).emit('host', data)
      }
    }
  })

  socket.on('p2', (data) => {
    const lookUp = io.sockets.adapter.rooms.get(data.gameId)
    const arr = Array.from(lookUp)
    io.to(arr[1]).emit('p2', data.host)
  })
})
