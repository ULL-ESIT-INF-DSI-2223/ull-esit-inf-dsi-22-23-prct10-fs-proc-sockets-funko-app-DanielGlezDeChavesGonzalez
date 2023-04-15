"use strict";
exports.__esModule = true;
var yargs_1 = require("yargs");
var helpers_1 = require("yargs/helpers");
var Tipos_1 = require("./datatype/Tipos");
var chalk = require("chalk");
var net = require("net");
var client = net.createConnection({ port: 8080 }, function () {
    console.log("Connected to server!");
    if (process.argv[2] === "add") {
        (0, yargs_1["default"])((0, helpers_1.hideBin)(process.argv))
            .command("add", "Adds a funko", {
            user: {
                description: "User name",
                type: "string",
                demandOption: true
            },
            id: {
                description: "Funko ID",
                type: "number",
                demandOption: true
            },
            nombre: {
                description: "Funko name",
                type: "string",
                demandOption: true
            },
            desc: {
                description: "Funko description",
                type: "string",
                demandOption: true
            },
            tipo: {
                description: "Funko type",
                type: "string",
                demandOption: true
            },
            genero: {
                description: "Genere of the funko",
                type: "string",
                demandOption: true
            },
            franq: {
                description: "Funko franchise",
                type: "string",
                demandOption: true
            },
            num_f: {
                description: "Funko franchise number",
                type: "number",
                demandOption: true
            },
            exclusivo: {
                description: "Funko exclusive",
                type: "boolean",
                demandOption: true
            },
            car_e: {
                description: "Funko special features",
                type: "string",
                demandOption: true
            },
            precio: {
                description: "Funko price",
                type: "number",
                demandOption: true
            }
        }, function (argv) {
            var tipo;
            var genero;
            tipo = (0, Tipos_1.asignarTipo)(argv.tipo);
            genero = (0, Tipos_1.asignarGenero)(argv.genero);
            if (tipo === Tipos_1.Tipos.Error || genero === Tipos_1.Genero.Error) {
                console.log(chalk.red("Tipo o genero invalido"));
                return;
            }
            var FunkoPop = {
                id: argv.id,
                name: argv.nombre,
                description: argv.desc,
                Tipo: tipo,
                Genero: genero,
                Franquicia: argv.franq,
                Numero_franquicia: argv.num_f,
                Exclusivo: argv.exclusivo,
                Caracteristicas_especiales: argv.car_e,
                Precio: argv.precio
            };
            var request = {
                type: "add",
                user: argv.user,
                funkoPop: FunkoPop
            };
            client.write(JSON.stringify(request));
            console.log("mensaje add enviado");
            client.on("data", function (dataJson) {
                var data = JSON.parse(dataJson.toString());
                if (data.success === true) {
                    console.log(chalk.green("Funko añadido correctamente"));
                }
                else {
                    console.log(chalk.red("Funko no añadido"));
                }
            });
        })
            .help().argv;
    }
    else if (process.argv[2] === "list") {
        (0, yargs_1["default"])((0, helpers_1.hideBin)(process.argv))
            .command("list", "Shows all the funkos of a user", {
            user: {
                description: "User name",
                type: "string",
                demandOption: true
            }
        }, function (argv) {
            var request = {
                type: "list",
                user: argv.user
            };
            client.write(JSON.stringify(request));
            console.log("mensaje list enviado");
            client.on("data", function (dataJson) {
                var data = JSON.parse(dataJson.toString());
                var Funkos = data.funkolist;
                console.log(chalk.green("Funkos de " + argv.user));
                console.log(chalk.green("------------------"));
                Funkos.forEach(function (funko) {
                    var color = chalk.green;
                    if (funko.Precio <= 100) {
                        color = chalk.green;
                    }
                    else if (funko.Precio > 100 && funko.Precio <= 200) {
                        color = chalk.yellow;
                    }
                    else if (funko.Precio > 200 && funko.Precio <= 500) {
                        color = chalk.red;
                    }
                    else {
                        color = chalk.blue;
                    }
                    console.log(color("ID: " + funko.id));
                    console.log(color("Nombre: " + funko.name));
                    console.log(color("Descripcion: " + funko.description));
                    console.log(color("Tipo: " + funko.Tipo));
                    console.log(color("Genero: " + funko.Genero));
                    console.log(color("Franquicia: " + funko.Franquicia));
                    console.log(color("Numero de franquicia: " + funko.Numero_franquicia));
                    console.log(color("Exclusivo: " + funko.Exclusivo));
                    console.log(color("Caracteristicas especiales: " +
                        funko.Caracteristicas_especiales));
                    console.log(color("Precio: " + funko.Precio));
                    console.log(color("------------------"));
                });
            });
        })
            .help().argv;
    }
    else if (process.argv[2] === "update") {
        (0, yargs_1["default"])((0, helpers_1.hideBin)(process.argv))
            .command("update", "Updates a funko", {
            user: {
                description: "User name",
                type: "string",
                demandOption: true
            },
            id: {
                description: "Funko ID",
                type: "number",
                demandOption: true
            },
            nombre: {
                description: "Funko name",
                type: "string",
                demandOption: true
            },
            desc: {
                description: "Funko description",
                type: "string",
                demandOption: true
            },
            tipo: {
                description: "Funko type",
                type: "string",
                demandOption: true
            },
            genero: {
                description: "Genere of the funko",
                type: "string",
                demandOption: true
            },
            franq: {
                description: "Funko franchise",
                type: "string",
                demandOption: true
            },
            num_f: {
                description: "Funko franchise number",
                type: "number",
                demandOption: true
            },
            exclusivo: {
                description: "Funko exclusive",
                type: "boolean",
                demandOption: true
            },
            car_e: {
                description: "Funko special features",
                type: "string",
                demandOption: true
            },
            precio: {
                description: "Funko price",
                type: "number",
                demandOption: true
            }
        }, function (argv) {
            var tipo;
            var genero;
            tipo = (0, Tipos_1.asignarTipo)(argv.tipo);
            genero = (0, Tipos_1.asignarGenero)(argv.genero);
            if (tipo === Tipos_1.Tipos.Error || genero === Tipos_1.Genero.Error) {
                console.log(chalk.red("Tipo o genero invalido"));
                return;
            }
            var FunkoPop = {
                id: argv.id,
                name: argv.nombre,
                description: argv.desc,
                Tipo: tipo,
                Genero: genero,
                Franquicia: argv.franq,
                Numero_franquicia: argv.num_f,
                Exclusivo: argv.exclusivo,
                Caracteristicas_especiales: argv.car_e,
                Precio: argv.precio
            };
            var request = {
                type: "update",
                user: argv.user,
                funkoPop: FunkoPop
            };
            client.write(JSON.stringify(request));
            console.log("mensaje update enviado");
            client.on("data", function (dataJson) {
                var data = JSON.parse(dataJson.toString());
                if (data.success) {
                    console.log(chalk.green("Funko actualizado"));
                }
                else {
                    console.log(chalk.red("Funko no actualizado"));
                }
            });
        })
            .help().argv;
    }
    else if (process.argv[2] === "read") {
        (0, yargs_1["default"])((0, helpers_1.hideBin)(process.argv))
            .command("read", "Shows a funko given an ID", {
            user: {
                description: "User name",
                type: "string",
                demandOption: true
            },
            id: {
                description: "Funko ID",
                type: "number",
                demandOption: true
            }
        }, function (argv) {
            var request = {
                type: "read",
                user: argv.user,
                id: argv.id
            };
            client.write(JSON.stringify(request));
            console.log("mensaje read enviado");
            client.on("data", function (dataJson) {
                var data = JSON.parse(dataJson.toString());
                if (data.success) {
                    var funko = data.funkoPop;
                    var color = chalk.grey;
                    console.log(color("ID: " + funko.id));
                    console.log(color("Nombre: " + funko.name));
                    console.log(color("Descripcion: " + funko.description));
                    console.log(color("Tipo: " + funko.Tipo));
                    console.log(color("Genero: " + funko.Genero));
                    console.log(color("Franquicia: " + funko.Franquicia));
                    console.log(color("Numero de franquicia: " + funko.Numero_franquicia));
                    console.log(color("Exclusivo: " + funko.Exclusivo));
                    console.log(color("Caracteristicas especiales: " +
                        funko.Caracteristicas_especiales));
                    console.log(color("Precio: " + funko.Precio));
                    console.log(color("------------------"));
                }
                else {
                    console.log(chalk.red("Funko no encontrado"));
                }
            });
        })
            .help().argv;
    }
    else if (process.argv[2] === "remove") {
        (0, yargs_1["default"])((0, helpers_1.hideBin)(process.argv))
            .command("remove", "Removes a funko given an ID", {
            user: {
                description: "User name",
                type: "string",
                demandOption: true
            },
            id: {
                description: "Funko ID",
                type: "number",
                demandOption: true
            }
        }, function (argv) {
            var request = {
                type: "remove",
                user: argv.user,
                id: argv.id
            };
            client.write(JSON.stringify(request));
            console.log("mensaje remove enviado");
            client.on("data", function (dataJson) {
                var data = JSON.parse(dataJson.toString());
                if (data.success) {
                    console.log(chalk.green("Funko eliminado"));
                }
                else {
                    console.log(chalk.red("Funko no eliminado"));
                }
            });
        })
            .help().argv;
    }
});
