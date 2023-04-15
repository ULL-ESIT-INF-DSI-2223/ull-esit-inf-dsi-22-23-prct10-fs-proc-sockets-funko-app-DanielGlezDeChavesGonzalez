"use strict";
exports.__esModule = true;
var FunkoApp_1 = require("./FunkoApp");
var net = require("net");
var server = net.createServer(function (connection) {
    console.log("Client connected");
    connection.on("data", function (dataJson) {
        var data = JSON.parse(dataJson.toString());
        if (data.type == "add") {
            var app = new FunkoApp_1.App(data.user);
            app.cargarDatos(data.user);
            var added = app.addFunko(data.user, data.funkoPop.id, data.funkoPop.name, data.funkoPop.description, data.funkoPop.Tipo, data.funkoPop.genero, data.funkoPop.Franquicia, data.funkoPop.Numero_franquicia, data.funkoPop.Exclusivo, data.funkoPop.Caracteristicas_especiales, data.funkoPop.Precio);
            app.guardarDatos();
            if (added) {
                var response = {
                    type: "add",
                    user: data.user,
                    success: true
                };
                connection.write(JSON.stringify(response));
            }
            else {
                var response = {
                    type: "add",
                    user: data.user,
                    success: false
                };
                connection.write(JSON.stringify(response));
            }
            connection.end();
        }
        if (data.type == "list") {
            var app = new FunkoApp_1.App(data.user);
            app.cargarDatos(data.user);
            var list = app.listFunkos();
            var response = {
                type: "list",
                user: data.user,
                success: true,
                funkolist: list
            };
            connection.write(JSON.stringify(response));
            connection.end();
        }
        if (data.type == "update") {
            var app = new FunkoApp_1.App(data.user);
            app.cargarDatos(data.user);
            var updated = app.modifyFunko(data.funkoPop.id, data.funkoPop.name, data.funkoPop.description, data.funkoPop.Tipo, data.funkoPop.genero, data.funkoPop.Franquicia, data.funkoPop.Numero_franquicia, data.funkoPop.Exclusivo, data.funkoPop.Caracteristicas_especiales, data.funkoPop.Precio);
            app.guardarDatos();
            if (updated) {
                var response = {
                    type: "update",
                    user: data.user,
                    success: true
                };
                connection.write(JSON.stringify(response));
            }
            else {
                var response = {
                    type: "update",
                    user: data.user,
                    success: false
                };
                connection.write(JSON.stringify(response));
            }
            connection.end();
        }
        if (data.type == "remove") {
            var app = new FunkoApp_1.App(data.user);
            app.cargarDatos(data.user);
            var removed = app.removeFunko(data.id);
            app.guardarDatos();
            if (removed) {
                var response = {
                    type: "remove",
                    user: data.user,
                    success: true
                };
                connection.write(JSON.stringify(response));
            }
            else {
                var response = {
                    type: "remove",
                    user: data.user,
                    success: false
                };
                connection.write(JSON.stringify(response));
            }
            connection.end();
        }
        if (data.type == "read") {
            var app = new FunkoApp_1.App(data.user);
            app.cargarDatos(data.user);
            var read = app.showFunkoById(data.id);
            if (read) {
                var response = {
                    type: "read",
                    user: data.user,
                    success: true,
                    funkoPop: read
                };
                connection.write(JSON.stringify(response));
            }
            else {
                var response = {
                    type: "read",
                    user: data.user,
                    success: false
                };
                connection.write(JSON.stringify(response));
            }
            connection.end();
        }
    });
});
server.listen(8080, function () {
    console.log("Server running on port 8080");
});
server.on("end", function () {
    console.log("Client disconnected");
});
