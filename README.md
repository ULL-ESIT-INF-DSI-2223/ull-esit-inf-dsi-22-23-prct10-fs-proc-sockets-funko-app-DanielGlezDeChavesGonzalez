# Práctica 10: Procesos y Sockets

## Descripción

En esta práctica vamos a crear una aplicación cliente-servidor que permita a los usuarios conectarse a un servidor y realizar una serie de operaciones sobre una base de datos de Funkos Pop. La aplicación cliente-servidor se basará en el uso de sockets y procesos.

A su vez veremos el uso de child processes y pipes para la comunicación entre procesos. Y el funcionamiento de la pila de llamadas, el registro de eventos de la API y la cola de manejadores.

## Ejericio 1: Colas y registros de eventos

La funcion access() comprueba si el fichero existe y si tiene permisos de lectura, en caso de que tenga muestra por pantalla un mensaje indicando que se esta observando el fichero y en caso de que no tenga permisos de lectura muestra un mensaje de error.

El objeto constants sirve para acceder a los valores de las constantes de modo de acceso de los ficheros, en este caso se usa la constante F_OK que comprueba si el fichero existe.

En el codigo anterior la traza de ejecucion para la pila de llamadas, el registro de eventos de la API y la cola de manejadores es la siguiente:

Primero al ejecutar el programa lo primero que entra en la pila de llamadas es 
la funcion access() que comprueba si el fichero existe y si tiene permisos de lectura, en caso de que tenga muestra por pantalla un mensaje indicando que se esta observando el fichero y en caso de que no tenga permisos de lectura muestra un mensaje de error. Posteriormente si la funcion watch.on("change") que esta atenta al archivo salta, esta se mete en la pila de llamadas luego esta se manda al registro de eventos de la API y una vez procesada se procede a mandar la funcion callback a la cola de manejadores posteriormente el event loop comprueba si hay algun manejador en la cola de manejadores y si es asi lo ejecuta y muestra por pantalla el mensaje de que el archivo ha cambiado. Y continua con la ejecucion de watch(). Luego si volvemos a ejecutar otro cambio en el archivo se vuelve a repetir el proceso anterior. Y finalmente cuando el watcher se detiene se ejecuta la funcion watch.close() que se manda al registro de eventos de la API y una vez procesada se procede a mandar la funcion callback a la cola de manejadores posteriormente el event loop comprueba si hay algun manejador en la cola de manejadores y si es asi lo ejecuta y muestra por pantalla el mensaje de que el watcher se ha detenido.

## Ejercicio 2: Procesos y pipes

### Ejercicio 2.1: sin usar pipes

```typescript
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
```

En este ejercicio vamos a crear un programa que cree los procesos unicamente necesarios para poder contar las lineas, palabras y caracteres de un fichero. Para ello vamos a usar el modulo spawn de child_process. El programa recibirá como argumentos el nombre del fichero y las opciones que se quieran usar para contar las lineas, palabras y caracteres. Para leer los argumentos que se le pasan al programa vamos a usar el modulo Yargs.

### Ejercicio 2.2: usando pipes


En este ejercicio vamos a crear un programa que cree un proceso hijo y que se comuniquen mediante pipes. El proceso padre creará un pipe y lo pasará al proceso hijo. El proceso hijo leerá de la entrada estándar y escribirá en el pipe. El proceso padre leerá del pipe y escribirá en la salida estándar. Haciendo uso de el modulo Yargs para leer desde linea de comandos los argumentos que se le pasan al programa.

```typescript
import { spawn } from "child_process";
import { isPropertyAccessChain } from "typescript";
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
      words.stdout.pipe(process.stdout);

      words.on("close", () => {
        console.log("wc command finished");
      });

      words.on("error", (err) => {
        console.log(`Error: ${err}`);
      });
    }
  )
  .help().argv;
```

En el codigo anterior primero se ejecuta el programa y se le pasa como argumento el comando wclc, el nombre del fichero y las opciones que queremos que nos muestre. Luego se ejecuta la funcion spawn() que crea un proceso hijo y se le pasa como argumento el comando wc y los argumentos que queremos que nos muestre. Posteriormente se ejecuta la funcion pipe() que se encarga de conectar la salida del proceso hijo con la entrada del proceso padre. Y finalmente se ejecutan las funciones on() que se encargan de ejecutar la funcion callback cuando el proceso hijo se cierra y cuando se produce un error.


## Ejercicio 3: Sockets

