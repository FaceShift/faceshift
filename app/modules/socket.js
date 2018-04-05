var io = require("socket.io")(6767);

let createSocketServer = (onMessageCallback) => {
    console.log("createSocketServer gets called");

    io.on("connection", function (socket) {
        io.emit("this", { will: "be received by everyone"});

        socket.on('training', () => {
            console.log("Socket.on('training')");
            onMessageCallback('training');
        });

        socket.on("disconnect", function () {
            console.log("User disconnected")
        });
    });
}

module.exports = {
    createSocketServer
}
