// import WebSocket, { WebSocketServer } from 'ws';
// import { createServer } from 'http';
// import  ServerKey  from './serverKey';
var WebSocket = require("ws")
var createServer  = require('http');
var ServerKey = require('./serverKey');
//Get Server IP
var os = require("os");
var ip = require("ip");

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
      if(serverkey.key() != request.url.split("=")[1]  || serverkey.protocol() != request.headers['sec-websocket-protocol']){
          console.log("there are something when wrong");
          socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
          socket.destroy();
          return;
      }
      console.log("correctely");
      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request , request.socket.remoteAddress);
      });
  });

  server.listen(8000, function(){
    //var networkInterfaces = os.networkInterfaces();
    console.log(networkInterfaces);
    console.log('Listening on http://'+ip.address()+':8000');
  }); 
} catch (error) {
  console.log(error)
}