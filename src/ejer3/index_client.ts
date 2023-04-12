import { App } from "./FunkoApp";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Tipos, Genero, asignarTipo, asignarGenero } from "./datatype/Tipos";
import chalk from "chalk";

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
      const app = new App(argv.user);
      app.cargarDatos(argv.user);
      let tipo: Tipos;
      let genero: Genero;
      tipo = asignarTipo(argv.tipo);
      genero = asignarGenero(argv.genero);
      if (tipo === Tipos.Error || genero === Genero.Error) {
        console.log(chalk.red("Tipo o genero invalido"));
        return;
      }
      let added = app.addFunko(
        argv.user,
        argv.id,
        argv.nombre,
        argv.desc,
        tipo,
        genero,
        argv.franq,
        argv.num_f,
        argv.exclusivo,
        argv.car_e,
        argv.precio
      );
      app.guardarDatos();
      if (added) {
        console.log(
          chalk.green(
            "Funko added successfully to " + argv.user + " collection"
          )
        );
      } else {
        console.log(
          chalk.red("Funko already exists in " + argv.user + " collection")
        );
      }
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
      const app = new App(argv.user);
      app.cargarDatos(argv.user);
      app.listFunkos();
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
      const app = new App(argv.user);
      app.cargarDatos(argv.user);
      let tipo: Tipos;
      let genero: Genero;
      tipo = asignarTipo(argv.tipo);
      genero = asignarGenero(argv.genero);
      if (tipo === Tipos.Error || genero === Genero.Error) {
        console.log(chalk.red("Tipo o genero invalido"));
        return;
      }
      let modified = app.modifyFunko(
        argv.id,
        argv.nombre,
        argv.desc,
        tipo,
        genero,
        argv.franq,
        argv.num_f,
        argv.exclusivo,
        argv.car_e,
        argv.precio
      );
      app.guardarDatos();
      if (modified) {
        console.log(
          chalk.green(
            "Funko modified successfully in " + argv.user + " collection"
          )
        );
      } else {
        console.log(
          chalk.red("Funko doesn't exist in " + argv.user + " collection")
        );
      }
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
      const app = new App(argv.user);
      app.cargarDatos(argv.user);
      let readed = app.showFunkoById(argv.id);
      if (!readed) {
        console.log(chalk.red("Funko not found"));
      }
    }
  )
  .help().argv;

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
      const app = new App(argv.user);
      app.cargarDatos(argv.user);
      let removed = app.removeFunko(argv.id);
      app.guardarDatos();
      if (removed) {
        console.log(
          chalk.green(
            "Funko removed successfully from " + argv.user + " collection"
          )
        );
      } else {
        console.log(
          chalk.red("Funko doesn't exist in " + argv.user + " collection")
        );
      }
    }
  )
  .help().argv;
