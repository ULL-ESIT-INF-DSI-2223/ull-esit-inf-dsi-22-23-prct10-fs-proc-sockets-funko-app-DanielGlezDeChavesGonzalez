import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Tipos, Genero, asignarTipo, asignarGenero } from "./datatype/Tipos";
import * as chalk from "chalk";
import { Funko } from "./datatype/Funko";
import * as net from "net";

export type RequestType = {
  type: "add" | "update" | "remove" | "read" | "list";
  user: string;
  funkoPop?: Funko;
  id?: number;
};

export type ResponseType = {
  type: "add" | "update" | "remove" | "read" | "list";
  user: string;
  success: boolean;
  funkoPop?: Funko;
};

const client = net.createConnection({ port: 8080 }, () => {
  console.log("Connected to server!");
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

        const request: RequestType = {
          type: "add",
          user: argv.user,
          funkoPop: FunkoPop,
        };

        client.write(JSON.stringify(request));

        client.on("data", (dataJson) => {
          const data = JSON.parse(dataJson.toString());
          console.log(data.stdout);
        });
      }
    )
    .help().argv;

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
        const request: RequestType = {
          type: "list",
          user: argv.user,
        };

        client.write(JSON.stringify(request));

        client.on("data", (dataJson) => {
          const data = JSON.parse(dataJson.toString());
          console.log(data.stdout);
        });

      }
    )
    .help().argv;

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

        const request: RequestType = {
          type: "update",
          user: argv.user,
          funkoPop: FunkoPop,
        };

        client.write(JSON.stringify(request));

        client.on("data", (dataJson) => {
          const data = JSON.parse(dataJson.toString());
          console.log(data.stdout);
        });
      }
    )
    .help().argv;

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
        const request: RequestType = {
          type: "read",
          user: argv.user,
          id: argv.id,
        };

        client.write(JSON.stringify(request));

        client.on("data", (dataJson) => {
          const data = JSON.parse(dataJson.toString());
          console.log(data.stdout);
        });
      }
    )
    .help().argv;

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
