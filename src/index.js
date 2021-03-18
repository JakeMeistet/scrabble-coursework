const express = require('express') // Imports Express.js for use with the web application
const fs = require('fs')
const vhost = require('vhost')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const Crypto = require('crypto')
const socket = require('socket.io')
const colour = require('colour')
const { format } = require('path')
const port = 80 // HTTP Port

colour.setTheme({
  startup: 'rainbow',
  running: 'blue',
  error: 'red'
})

const app = express()



app.use(express.static('app'))


app.post('/', (req, res) => {
  const uid = Crypto.randomBytes(32).toString('hex')
  let username = ''
  const ip = req.socket.remoteAddress
  const credentials = { uid, username, ip }
  res.send(credentials)
})

app.post('/user', (req, res) => {
  const uid = Crypto.randomBytes(32).toString('hex')
  let username = req.body.username
  console.log(username)
  const ip = req.socket.remoteAddress
  const credentials = { uid, username, ip }
  res.send(credentials)
})


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

app.use(bodyParser.urlencoded({ extended: true }))

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
  socket.on('startGame', () => {
    io.emit('startGame')
  })
})





// function write (currentUser, file) {
//   if (fs.existsSync(file)) {
//     fs.appendFileSync(file, currentUser)
//   } else {
//     fs.writeFileSync(file, currentUser)
//   }
// }
