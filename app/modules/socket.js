var io = require("socket.io")(6767);

let createSocketServer = (onTrainingCallback, micStateCallback) => {
    io.on("connection", function (socket) {
        socket.on("train", () => {
            onTrainingCallback();
        });

        socket.on("microphone", (micState, callback) => {
            micStateCallback(micState);
            callback();
        });

        socket.on("disconnect", function () {
            console.log("User disconnected")
        });
    });
}

module.exports = {
    createSocketServer
}
