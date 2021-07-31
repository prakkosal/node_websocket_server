var WebSocket = require('ws');
try {
  //const ws = new WebSocket('ws://localhost:8000',"KV-Echo", {auth:"kosalimsi00admin"});
  const ws = new WebSocket.WebSocket('ws://localhost:8000',"KV-Echo", {auth:"kosalimsi00admin"});
  ws.on('open', function open() {
    ws.send('something');
  });
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  ws.on('close', function close() {
    console.log('disconnected');
  });
} catch (error) {
  console.log(error);
}
