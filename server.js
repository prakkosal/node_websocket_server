'use strict';
import WebSocket, { WebSocketServer } from 'ws';
import { createServer } from 'http';
try {
  const server = createServer();
  const wss = new WebSocketServer({ noServer: true });
  wss.on('connection', function connection(ws, request, client) {
    //console.log(request);
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
    console.log(request);
      console.log(request.headers['sec-websocket-protocol']);
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

