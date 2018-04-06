var io = require("socket.io")(6767);

let createSocketServer = (onTrainingCallback, micStateCallback, lastMessage) => {
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

        socket.on("lastMessage", (message) => {
            socket.emit("message", lastMessage);
        })
    });
};

let sendMessage = (message) => {
    io.emit("message", message);
};

let sendHotword = (hotword) => {
    io.emit("hotword", hotword);
}

module.exports = {
    createSocketServer,
    sendMessage,
    sendHotword
};
