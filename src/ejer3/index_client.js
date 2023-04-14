"use strict";
exports.__esModule = true;
var yargs_1 = require("yargs");
var helpers_1 = require("yargs/helpers");
var Tipos_1 = require("./datatype/Tipos");
var chalk = require("chalk");
var net = require("net");
var client = net.createConnection({ port: 8080 }, function () {
    console.log("Connected to server!");
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
        client.on("data", function (dataJson) {
            var data = JSON.parse(dataJson.toString());
            console.log(data.stdout);
        });
    })
        .help().argv;
    // yargs(hideBin(process.argv))
    //   .command(
    //     "list",
    //     "Shows all the funkos of a user",
    //     {
    //       user: {
    //         description: "User name",
    //         type: "string",
    //         demandOption: true,
    //       },
    //     },
    //     (argv) => {
    //       const app = new App(argv.user);
    //       app.cargarDatos(argv.user);
    //       app.listFunkos();
    //     }
    //   )
    //   .help().argv;
    // yargs(hideBin(process.argv))
    //   .command(
    //     "update",
    //     "Updates a funko",
    //     {
    //       user: {
    //         description: "User name",
    //         type: "string",
    //         demandOption: true,
    //       },
    //       id: {
    //         description: "Funko ID",
    //         type: "number",
    //         demandOption: true,
    //       },
    //       nombre: {
    //         description: "Funko name",
    //         type: "string",
    //         demandOption: true,
    //       },
    //       desc: {
    //         description: "Funko description",
    //         type: "string",
    //         demandOption: true,
    //       },
    //       tipo: {
    //         description: "Funko type",
    //         type: "string",
    //         demandOption: true,
    //       },
    //       genero: {
    //         description: "Genere of the funko",
    //         type: "string",
    //         demandOption: true,
    //       },
    //       franq: {
    //         description: "Funko franchise",
    //         type: "string",
    //         demandOption: true,
    //       },
    //       num_f: {
    //         description: "Funko franchise number",
    //         type: "number",
    //         demandOption: true,
    //       },
    //       exclusivo: {
    //         description: "Funko exclusive",
    //         type: "boolean",
    //         demandOption: true,
    //       },
    //       car_e: {
    //         description: "Funko special features",
    //         type: "string",
    //         demandOption: true,
    //       },
    //       precio: {
    //         description: "Funko price",
    //         type: "number",
    //         demandOption: true,
    //       },
    //     },
    //     (argv) => {
    //       const app = new App(argv.user);
    //       app.cargarDatos(argv.user);
    //       let tipo: Tipos;
    //       let genero: Genero;
    //       tipo = asignarTipo(argv.tipo);
    //       genero = asignarGenero(argv.genero);
    //       if (tipo === Tipos.Error || genero === Genero.Error) {
    //         console.log(chalk.red("Tipo o genero invalido"));
    //         return;
    //       }
    //       let modified = app.modifyFunko(
    //         argv.id,
    //         argv.nombre,
    //         argv.desc,
    //         tipo,
    //         genero,
    //         argv.franq,
    //         argv.num_f,
    //         argv.exclusivo,
    //         argv.car_e,
    //         argv.precio
    //       );
    //       app.guardarDatos();
    //       if (modified) {
    //         console.log(
    //           chalk.green(
    //             "Funko modified successfully in " + argv.user + " collection"
    //           )
    //         );
    //       } else {
    //         console.log(
    //           chalk.red("Funko doesn't exist in " + argv.user + " collection")
    //         );
    //       }
    //     }
    //   )
    //   .help().argv;
    // yargs(hideBin(process.argv))
    //   .command(
    //     "read",
    //     "Shows a funko given an ID",
    //     {
    //       user: {
    //         description: "User name",
    //         type: "string",
    //         demandOption: true,
    //       },
    //       id: {
    //         description: "Funko ID",
    //         type: "number",
    //         demandOption: true,
    //       },
    //     },
    //     (argv) => {
    //       const app = new App(argv.user);
    //       app.cargarDatos(argv.user);
    //       let readed = app.showFunkoById(argv.id);
    //       if (!readed) {
    //         console.log(chalk.red("Funko not found"));
    //       }
    //     }
    //   )
    //   .help().argv;
    // yargs(hideBin(process.argv))
    //   .command(
    //     "remove",
    //     "Removes a funko given an ID",
    //     {
    //       user: {
    //         description: "User name",
    //         type: "string",
    //         demandOption: true,
    //       },
    //       id: {
    //         description: "Funko ID",
    //         type: "number",
    //         demandOption: true,
    //       },
    //     },
    //     (argv) => {
    //       const app = new App(argv.user);
    //       app.cargarDatos(argv.user);
    //       let removed = app.removeFunko(argv.id);
    //       app.guardarDatos();
    //       if (removed) {
    //         console.log(
    //           chalk.green(
    //             "Funko removed successfully from " + argv.user + " collection"
    //           )
    //         );
    //       } else {
    //         console.log(
    //           chalk.red("Funko doesn't exist in " + argv.user + " collection")
    //         );
    //       }
    //     }
    //   )
    // .help().argv;
});
