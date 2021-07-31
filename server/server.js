// import WebSocket, { WebSocketServer } from 'ws';
// import { createServer } from 'http';
// import  ServerKey  from './serverKey';
var WebSocket = require("ws")
var createServer  = require('http');
var ServerKey = require('./serverKey');
try {
  const server = createServer.createServer();
  const wss = new WebSocket.Server({ noServer: true });
  wss.on('connection', function connection(ws, request, client) {
    ws.on('message', function message(msg) {
      console.log(`Received message ${msg} from user ${client}`);
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(msg, { binary: false });
        }
      });
    });
});

server.on('upgrade', function upgrade(request, socket, head) {
     var serverkey = new ServerKey();
     console.log(serverkey.key());
      console.log( request.url.split("=")[1]);
      console.log(request.headers['sec-websocket-protocol']);
      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request , request.socket.remoteAddress);
      });
  });

  server.listen(8000, function(){
    console.log('Listening on http://localhost:8000');
  }); 

} catch (error) {
  console.log(error)
}

