const app = require('./app')
const http = require('http')
const log = require("./logger");

/**
 * The intern port, which is fixed to 3000.
 * For the external port see docker-compose.yml
 * @type {number} The port.
 */
const port = 3000
app.set('port', port)

/**
 * The server instance running on the port.
 * @type {Server} The server.
 */
const server = http.createServer(app)
server.listen(port)
log("Server started.")