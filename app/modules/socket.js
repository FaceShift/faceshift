var io = require("socket.io")(6767);

let createSocketServer = (onTrainingCallback) => {
    io.on("connection", function (socket) {
        socket.on('training', () => {
            onTrainingCallback();
        });

        socket.on("disconnect", function () {
            console.log("User disconnected")
        });
    });
}

module.exports = {
    createSocketServer
}
