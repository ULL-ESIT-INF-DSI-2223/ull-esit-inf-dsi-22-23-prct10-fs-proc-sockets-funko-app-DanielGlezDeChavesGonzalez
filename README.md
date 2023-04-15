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

En este ejercicio vamos a usar el modulo spawn de child_process para crear procesos hijos y redirigir su salida a otro proceso padre.

### Ejercicio 2.1: sin usar pipes

```typescript
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

### Descripcion 

Para este ejercicio nos basaremos en la practica anterior por lo que no tocaremos nada de la parte de la clase Funko ni los diferetes tipos de datos que existan. Posteriormente crearemos dos nuevos archivos que se encargaran de crear el servidor y el cliente. Para ello usaremos el modulo net de node.js. El servidor se encargara de escuchar en el puerto 8080 y un cliente se conectara al servidor. El servidor recibira un mensaje del cliente con la peticion a ejecutar en el servidor y el servidor devolvera el resultado de la peticion al cliente. Y cerrara la conexion.

Cabe mencionar que el servidor y el cliente se usaran tupos de datos diferentes para poder comunicarse. El servidor recibira un tipo de dato RequestType y el cliente recibira un tipo de dato ResponseType.

```typescript
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
  funkolist?: Funko[];
};
```

### Ejercicio 3.1: Servidor

```typescript
const server = net.createServer((connection) => {
  console.log("Client connected");
  connection.on("data", (dataJson) => {
    const data = JSON.parse(dataJson.toString());
    if (data.type == "add") {
      const app = new App(data.user);
      app.cargarDatos(data.user);
      let added = app.addFunko(
        data.user,
        data.funkoPop.id,
        data.funkoPop.name,
        data.funkoPop.description,
        data.funkoPop.Tipo,
        data.funkoPop.genero,
        data.funkoPop.Franquicia,
        data.funkoPop.Numero_franquicia,
        data.funkoPop.Exclusivo,
        data.funkoPop.Caracteristicas_especiales,
        data.funkoPop.Precio
      );
      app.guardarDatos();
      if (added) {
        let response: ResponseType = {
          type: "add",
          user: data.user,
          success: true,
        };
        connection.write(JSON.stringify(response));
      } else {
        let response: ResponseType = {
          type: "add",
          user: data.user,
          success: false,
        };
        connection.write(JSON.stringify(response));
      }
      connection.end();
    }
    if (data.type == "list") {
      const app = new App(data.user);
      app.cargarDatos(data.user);
      let list = app.listFunkos();
      let response: ResponseType = {
        type: "list",
        user: data.user,
        success: true,
        funkolist: list,
      };
      connection.write(JSON.stringify(response));
      connection.end();
    }
    if (data.type == "update") {
      const app = new App(data.user);
      app.cargarDatos(data.user);
      let updated = app.modifyFunko(
        data.funkoPop.id,
        data.funkoPop.name,
        data.funkoPop.description,
        data.funkoPop.Tipo,
        data.funkoPop.genero,
        data.funkoPop.Franquicia,
        data.funkoPop.Numero_franquicia,
        data.funkoPop.Exclusivo,
        data.funkoPop.Caracteristicas_especiales,
        data.funkoPop.Precio
      );
      app.guardarDatos();
      if (updated) {
        let response: ResponseType = {
          type: "update",
          user: data.user,
          success: true,
        };
        connection.write(JSON.stringify(response));
      } else {
        let response: ResponseType = {
          type: "update",
          user: data.user,
          success: false,
        };
        connection.write(JSON.stringify(response));
      }
      connection.end();
    }
    if (data.type == "remove") {
      const app = new App(data.user);
      app.cargarDatos(data.user);
      let removed = app.removeFunko(data.id);
      app.guardarDatos();
      if (removed) {
        let response: ResponseType = {
          type: "remove",
          user: data.user,
          success: true,
        };
        connection.write(JSON.stringify(response));
      } else {
        let response: ResponseType = {
          type: "remove",
          user: data.user,
          success: false,
        };
        connection.write(JSON.stringify(response));
      }
      connection.end();
    }
    if (data.type == "read") {
      const app = new App(data.user);
      app.cargarDatos(data.user);
      let read = app.showFunkoById(data.id);
      if (read) {
        let response: ResponseType = {
          type: "read",
          user: data.user,
          success: true,
          funkoPop: read,
        };
        connection.write(JSON.stringify(response));
      }
      else {
        let response: ResponseType = {
          type: "read",
          user: data.user,
          success: false,
        };
        connection.write(JSON.stringify(response));
      }
      connection.end();
    }
  });
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});

server.on("error", (err) => {
  throw err;
});

server.on("close", () => {
  console.log("Server closed");
});

server.on("end", () => {
  console.log("Client disconnected");
});
```

El servidor recibe una conexion y una requestType en la que el cliente especificara el tipo de operacion quiera ejecutar y los datos necesarios para ejecutarla. El servidor ejecutara la operacion y devolvera un ResponseType con el resultado de la operacion. El servidor cerrara la conexion cuando se haya ejecutado la operacion.

### Ejercicio 3.2: Cliente

```typescript
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
```

El cliente se conecta al servidor y envía un mensaje de tipo `RequestType` que contiene el tipo de operación que se quiere realizar, el usuario que la realiza y los datos necesarios para realizarla todo esto obtenido a traves de linea de comandos usando el modulo yargs. El servidor recibe el mensaje y lo procesa, si todo sale bien el servidor responde con un mensaje de tipo `ResponseType` que contiene un booleano que indica si la operación fue exitosa y en caso de serlo el objeto `Funko` que se ha creado, actualizado, eliminado o leído. El cliente recibe el mensaje y lo procesa, si todo sale bien el cliente muestra por consola los datos del objeto `Funko` que se ha creado, actualizado, eliminado o leído.

## Conclusiones

En este proyecto hemos aprendido a usar sockets para establecer conexiones entre un cliente y un servidor, de manera que el cliente pueda enviar mensajes al servidor y el servidor pueda responder a esos mensajes. Ademas hemos aprendido a usar el modulo child_process para ejecutar comandos de la terminal desde un programa de nodejs. Y finalmetne tambien destacar que hemos aprendido como funciona la pila de llamadas, el registro de eventos de la API y la cola de manejadores,
