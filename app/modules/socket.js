const ws = require('ws');

let createSocketServer = (onMessageCallback) => {
    const socketServer = new ws.Server({
        port: 6767
    }, () => {
        console.log('Socket server listening on port 6767');
    });

    socketServer.on('connection', socket => {
        console.log('Client connected');
        // set up listeners
        socket.on('close', (code, reason) => console.log('Client disconnected because: ${reason}'));
        socket.on('message', message => {
            onMessageCallback(message)
        });
    });
}

module.exports = {
    createSocketServer
}