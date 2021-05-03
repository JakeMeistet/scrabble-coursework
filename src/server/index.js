/*  Imports webServer.js and socketServer.js to init
the webserver and socketserver accordingly  */
const Server = require('./webServer.js');
const Socket = require('./socketServer.js');

const server = Server.initWebServer();
Socket.initSocketServer(server);
