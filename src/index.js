const express = require('express') // Imports Express.js for use with the web application
const vhost = require('vhost')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const Crypto = require('crypto')
const colour = require('colour')
const port = 80 // HTTP Port

colour.setTheme({
  startup: 'rainbow',
  running: 'blue',
  error: 'red'
})

const scrabble = express()
scrabble.use(serveStatic('app'))

const app = express()

app.use(vhost('localhost', scrabble))
app.use(vhost('10.210.70.53', scrabble))

app.post('/game', async(req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  const id = Crypto.randomBytes(32).toString('hex')
  let params = new URLSearchParams(fullUrl)
  let username = ''
  for (const param of params){
    username = param[1]
  }
  console.log(username)
  console.log(id)
  res.send(id)
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
app.listen(port, err => {
  if (!err) {
    console.log('Server Starting'.startup)
    console.log('Server running on port:'.running, port)
  }
})
