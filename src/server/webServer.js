const express = require('express')
const port = 80 // HTTP Port

function initWebServer () {
    const app = express()

    app.use(express.static('../app'))

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
    return server
}

module.exports = {
    initWebServer: initWebServer
}