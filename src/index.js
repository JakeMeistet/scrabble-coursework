const express = require('express') //Imports Express.js for use with the web application 
const vhost = require("vhost");
const serveStatic = require('serve-static') 
const port = 80 //HTTP Port

var scrabble = express()
scrabble.use(serveStatic('app'))

const app = express();

app.use(vhost('localhost', scrabble))
app.use(vhost('10.210.73.204', scrabble))

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // when status is 404, error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    if( 404 === err.status  ){
        res.send('<h1 style="text-align: center;">404: File not found</h1>')
    }

    // when status is 500, error handler
    if(500 === err.status) {
        return res.send({message: 'error occur'});
    }
});

//Listens to port 80, and if an error occurs, logs it to console
app.listen(port, err => {
    if (err) {s
        return;
    } else {
        console.log('Server running on port:', port)
    }
});