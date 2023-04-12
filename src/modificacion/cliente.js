"use strict";
exports.__esModule = true;
var net = require("net");
var command = process.argv[2];
var args_command = process.argv.slice(3);
var client = net.connect({ port: 8080 }, function () {
    console.log("Connected to server!");
    client.write(JSON.stringify({
        type: "command",
        command: command,
        args: args_command
    }));
    var output = "";
    client.on("data", function (dataJson) {
        var data = JSON.parse(dataJson.toString());
        console.log(data.stdout);
    });
    client.on("end", function () {
        console.log("Disconnected from server");
    });
});
