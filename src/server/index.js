const Server = require('./webServer.js')
const Socket = require('./socketServer.js')

const server = Server.initWebServer()
Socket.initSocketServer(server)
