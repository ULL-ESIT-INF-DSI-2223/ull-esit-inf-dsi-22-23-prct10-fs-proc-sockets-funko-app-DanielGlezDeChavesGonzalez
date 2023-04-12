"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
if (process.argv.length !== 3) {
    console.log("Please, specify a file");
}
else {
    var filename_1 = process.argv[2];
    (0, fs_1.access)(filename_1, fs_1.constants.F_OK, function (err) {
        if (err) {
            console.log("File ".concat(filename_1, " does not exist"));
        }
        else {
            console.log("Starting to watch file ".concat(filename_1));
            var watcher = (0, fs_1.watch)(process.argv[2]);
            watcher.on("change", function () {
                console.log("File ".concat(filename_1, " has been modified somehow"));
            });
            watcher.on("error", function (err) {
                console.log("Error: ".concat(err));
            });
            watcher.on("close", function () {
                console.log("File ".concat(filename_1, " has been closed"));
            });
        }
    });
}
// en el codigo anterior la  traza de ejecución mostrando, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además de lo que se muestra por la consola.
