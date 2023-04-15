import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Tipos, Genero, asignarTipo, asignarGenero } from "./datatype/Tipos";
import * as chalk from "chalk";
import { Funko } from "./datatype/Funko";
import * as net from "net";

/**
 * Tipo de peticion
 */
export type RequestType = {
  type: "add" | "update" | "remove" | "read" | "list";
  user: string;
  funkoPop?: Funko;
  id?: number;
};

/**
 * Tipo de respuesta
 */
export type ResponseType = {
  type: "add" | "update" | "remove" | "read" | "list";
  user: string;
  success: boolean;
  funkoPop?: Funko;
  funkolist?: Funko[];
};

let client = net.createConnection({ port: 8080 }, () => {
  console.log("Connected to server!");
  if (process.argv[2] === "add") {
    yargs(hideBin(process.argv))
      .command(
        "add",
        "Adds a funko",
        {
          user: {
            description: "User name",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Funko ID",
            type: "number",
            demandOption: true,
          },
          nombre: {
            description: "Funko name",
            type: "string",
            demandOption: true,
          },
          desc: {
            description: "Funko description",
            type: "string",
            demandOption: true,
          },
          tipo: {
            description: "Funko type",
            type: "string",
            demandOption: true,
          },
          genero: {
            description: "Genere of the funko",
            type: "string",
            demandOption: true,
          },
          franq: {
            description: "Funko franchise",
            type: "string",
            demandOption: true,
          },
          num_f: {
            description: "Funko franchise number",
            type: "number",
            demandOption: true,
          },
          exclusivo: {
            description: "Funko exclusive",
            type: "boolean",
            demandOption: true,
          },
          car_e: {
            description: "Funko special features",
            type: "string",
            demandOption: true,
          },
          precio: {
            description: "Funko price",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {
          let tipo: Tipos;
          let genero: Genero;
          tipo = asignarTipo(argv.tipo);
          genero = asignarGenero(argv.genero);
          if (tipo === Tipos.Error || genero === Genero.Error) {
            console.log(chalk.red("Tipo o genero invalido"));
            return;
          }
          let FunkoPop: Funko = {
            id: argv.id,
            name: argv.nombre,
            description: argv.desc,
            Tipo: tipo,
            Genero: genero,
            Franquicia: argv.franq,
            Numero_franquicia: argv.num_f,
            Exclusivo: argv.exclusivo,
            Caracteristicas_especiales: argv.car_e,
            Precio: argv.precio,
          };

          let request: RequestType = {
            type: "add",
            user: argv.user,
            funkoPop: FunkoPop,
          };

          client.write(JSON.stringify(request));
          console.log("mensaje add enviado");

          client.on("data", (dataJson) => {
            let data = JSON.parse(dataJson.toString());
            if (data.success === true) {
              console.log(chalk.green("Funko añadido correctamente"));
            } else {
              console.log(chalk.red("Funko no añadido"));
            }
          });
        }
      )
      .help().argv;
  } else if (process.argv[2] === "list") {
    yargs(hideBin(process.argv))
      .command(
        "list",
        "Shows all the funkos of a user",
        {
          user: {
            description: "User name",
            type: "string",
            demandOption: true,
          },
        },
        (argv) => {
          let request: RequestType = {
            type: "list",
            user: argv.user,
          };

          client.write(JSON.stringify(request));
          console.log("mensaje list enviado");

          client.on("data", (dataJson) => {
            let data = JSON.parse(dataJson.toString());
            let Funkos: Funko[] = data.funkolist;
            console.log(chalk.green("Funkos de " + argv.user));
            console.log(chalk.green("------------------"));
            Funkos.forEach((funko) => {
              let color = chalk.green;
              if (funko.Precio <= 100) {
                color = chalk.green;
              } else if (funko.Precio > 100 && funko.Precio <= 200) {
                color = chalk.yellow;
              } else if (funko.Precio > 200 && funko.Precio <= 500) {
                color = chalk.red;
              } else {
                color = chalk.blue;
              }
              console.log(color("ID: " + funko.id));
              console.log(color("Nombre: " + funko.name));
              console.log(color("Descripcion: " + funko.description));
              console.log(color("Tipo: " + funko.Tipo));
              console.log(color("Genero: " + funko.Genero));
              console.log(color("Franquicia: " + funko.Franquicia));
              console.log(
                color("Numero de franquicia: " + funko.Numero_franquicia)
              );
              console.log(color("Exclusivo: " + funko.Exclusivo));
              console.log(
                color(
                  "Caracteristicas especiales: " +
                    funko.Caracteristicas_especiales
                )
              );
              console.log(color("Precio: " + funko.Precio));
              console.log(color("------------------"));
            });
          });
        }
      )
      .help().argv;
  } else if (process.argv[2] === "update") {
    yargs(hideBin(process.argv))
      .command(
        "update",
        "Updates a funko",
        {
          user: {
            description: "User name",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Funko ID",
            type: "number",
            demandOption: true,
          },
          nombre: {
            description: "Funko name",
            type: "string",
            demandOption: true,
          },
          desc: {
            description: "Funko description",
            type: "string",
            demandOption: true,
          },
          tipo: {
            description: "Funko type",
            type: "string",
            demandOption: true,
          },
          genero: {
            description: "Genere of the funko",
            type: "string",
            demandOption: true,
          },
          franq: {
            description: "Funko franchise",
            type: "string",
            demandOption: true,
          },
          num_f: {
            description: "Funko franchise number",
            type: "number",
            demandOption: true,
          },
          exclusivo: {
            description: "Funko exclusive",
            type: "boolean",
            demandOption: true,
          },
          car_e: {
            description: "Funko special features",
            type: "string",
            demandOption: true,
          },
          precio: {
            description: "Funko price",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {
          let tipo: Tipos;
          let genero: Genero;
          tipo = asignarTipo(argv.tipo);
          genero = asignarGenero(argv.genero);
          if (tipo === Tipos.Error || genero === Genero.Error) {
            console.log(chalk.red("Tipo o genero invalido"));
            return;
          }
          let FunkoPop: Funko = {
            id: argv.id,
            name: argv.nombre,
            description: argv.desc,
            Tipo: tipo,
            Genero: genero,
            Franquicia: argv.franq,
            Numero_franquicia: argv.num_f,
            Exclusivo: argv.exclusivo,
            Caracteristicas_especiales: argv.car_e,
            Precio: argv.precio,
          };

          let request: RequestType = {
            type: "update",
            user: argv.user,
            funkoPop: FunkoPop,
          };

          client.write(JSON.stringify(request));
          console.log("mensaje update enviado");

          client.on("data", (dataJson) => {
            let data = JSON.parse(dataJson.toString());
            if (data.success) {
              console.log(chalk.green("Funko actualizado"));
            } else {
              console.log(chalk.red("Funko no actualizado"));
            }
          });
        }
      )
      .help().argv;
  } else if (process.argv[2] === "read") {
    yargs(hideBin(process.argv))
      .command(
        "read",
        "Shows a funko given an ID",
        {
          user: {
            description: "User name",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Funko ID",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {
          let request: RequestType = {
            type: "read",
            user: argv.user,
            id: argv.id,
          };

          client.write(JSON.stringify(request));
          console.log("mensaje read enviado");

          client.on("data", (dataJson) => {
            let data = JSON.parse(dataJson.toString());
            if (data.success) {
              let funko = data.funkoPop;
              let color: chalk.Chalk = chalk.grey;
              console.log(color("ID: " + funko.id));
              console.log(color("Nombre: " + funko.name));
              console.log(color("Descripcion: " + funko.description));
              console.log(color("Tipo: " + funko.Tipo));
              console.log(color("Genero: " + funko.Genero));
              console.log(color("Franquicia: " + funko.Franquicia));
              console.log(
                color("Numero de franquicia: " + funko.Numero_franquicia)
              );
              console.log(color("Exclusivo: " + funko.Exclusivo));
              console.log(
                color(
                  "Caracteristicas especiales: " +
                    funko.Caracteristicas_especiales
                )
              );
              console.log(color("Precio: " + funko.Precio));
              console.log(color("------------------"));
            } else {
              console.log(chalk.red("Funko no encontrado"));
            }
          });
        }
      )
      .help().argv;
  } else if (process.argv[2] === "remove") {
    yargs(hideBin(process.argv))
      .command(
        "remove",
        "Removes a funko given an ID",
        {
          user: {
            description: "User name",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Funko ID",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {
          let request: RequestType = {
            type: "remove",
            user: argv.user,
            id: argv.id,
          };

          client.write(JSON.stringify(request));
          console.log("mensaje remove enviado");

          client.on("data", (dataJson) => {
            let data = JSON.parse(dataJson.toString());
            if (data.success) {
              console.log(chalk.green("Funko eliminado"));
            } else {
              console.log(chalk.red("Funko no eliminado"));
            }
          });
        }
      )
      .help().argv;
  }
});
