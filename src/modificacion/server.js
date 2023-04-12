"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var net = require("net");
var server = net
    .createServer(function (connection) {
    console.log("Client connected");
    connection.on("data", function (dataJson) {
        var data = JSON.parse(dataJson.toString());
        console.log(data);
        var command = (0, child_process_1.spawn)(data.command, data.args);
        var output = "";
        command.stdout.on("data", function (data) {
            output += data;
        });
        command.on("close", function () {
            connection.write(JSON.stringify({
                type: "command",
                command: data.command,
                args: data.args,
                stdout: output
            }));
            console.log("enviado");
        });
    });
    connection.on("close", function () {
        console.log("Client disconnected");
    });
})
    .listen(8080, function () {
    console.log("Server listening on port 8080");
});
