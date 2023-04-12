import { spawn } from "child_process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "wclc",
    "Counts the words of a file",
    {
      file: {
        description: "File name",
        type: "string",
        demandOption: true,
      },
      line: {
        description: "Counts the lines of a file",
        type: "boolean",
        demandOption: false,
      },
      chars: {
        description: "Counts the characters of a file",
        type: "boolean",
        demandOption: false,
      },
      words: {
        description: "Counts the words of a file",
        type: "boolean",
        demandOption: false,
      },
    },
    (argv) => {
      let argumentos = [];
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

      const words = spawn("wc", argumentos);

      let contadores: string[] = [];
      words.stdout.on("data", (data) => {
        contadores = data.toString().split(" ");

        contadores = contadores.filter((element) => {
            return element != "";
            });

      });

      words.on("close", () => {
        console.log("Lineas: " + contadores[0]);
        console.log("Palabras: " + contadores[1]);
        console.log("Caracteres: " + contadores[2]);
        console.log("wc command finished");
      });

      words.on("error", (err) => {
        console.log(`Error: ${err}`);
      });
    }
  )
  .help().argv;
