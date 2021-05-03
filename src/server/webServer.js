// Imports the express.js api and sets the port to 8080 as specified in the coursework spec
const express = require('express');
const port = 8080;

/*  Function initWebServer is ran from index.js when the program is initially loaded
this starts the webserver using express and  statically serves the directory for the
web application  */
function initWebServer() {
  const app = express();
  // Statically serves the dir for the web application
  app.use(express.static('../app'));

  /*  In case of a page being requested that doesn't exist, a 404 error is returned
  and the 'Not Found' error is created  */
  app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  /*  In the event of a 404 error (Not Found)
  a 404 page is returned as an error message to the client.  */
  app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Renders the error page for a 404 error
    res.status(err.status || 500);
    if (err.status === 404) {
      res.send('<h1 style="text-align: center;">404: File not found</h1>');
    }

    // Error handler for 500 status
    if (err.status === 500) {
      return res.send({ message: 'error occur' });
    }
  });

  /*  The webserver is started to listen on port 'port' (8080 as defined above)
  and a console log is ran to verify the port and that the server is starting/ has started  */
  const server = app.listen(port, err => {
    if (!err) {
      console.log('Server Starting'.startup);
      console.log('Server running on port:'.running, port);
    }
  });
  // server is returned for use with socket.io
  return server;
}

// The function initWebServer is exported to be imported and called from index.js
module.exports = {
  initWebServer: initWebServer,
};
