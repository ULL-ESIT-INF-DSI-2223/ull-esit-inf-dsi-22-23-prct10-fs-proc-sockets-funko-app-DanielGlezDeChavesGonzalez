"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var yargs_1 = require("yargs");
var helpers_1 = require("yargs/helpers");
(0, yargs_1["default"])((0, helpers_1.hideBin)(process.argv))
    .command("wclc", "Counts the words of a file", {
    file: {
        description: "File name",
        type: "string",
        demandOption: true
    },
    line: {
        description: "Counts the lines of a file",
        type: "boolean",
        demandOption: false
    },
    chars: {
        description: "Counts the characters of a file",
        type: "boolean",
        demandOption: false
    },
    words: {
        description: "Counts the words of a file",
        type: "boolean",
        demandOption: false
    }
}, function (argv) {
    var argumentos = [];
    if (argv.line) {
        argumentos.push("-l");
    }
    if (argv.chars) {
        argumentos.push("-m");
    }
    if (argv.words) {
        argumentos.push("-w");
    }
    argumentos.push(argv.file);
    var words = (0, child_process_1.spawn)("wc", argumentos);
    var contadores = [];
    words.stdout.on("data", function (data) {
        contadores = data.toString().split(" ");
        contadores = contadores.filter(function (element) {
            return element != "";
        });
    });
    words.on("close", function () {
        console.log("Lineas: " + contadores[0]);
        console.log("Palabras: " + contadores[1]);
        console.log("Caracteres: " + contadores[2]);
        console.log("wc command finished");
    });
    words.on("error", function (err) {
        console.log("Error: ".concat(err));
    });
})
    .help().argv;
