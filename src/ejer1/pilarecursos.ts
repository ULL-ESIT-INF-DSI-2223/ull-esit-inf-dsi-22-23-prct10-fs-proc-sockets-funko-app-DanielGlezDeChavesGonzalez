import { access, constants, watch } from "fs";

if (process.argv.length !== 3) {
  console.log("Please, specify a file");
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on("change", () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      watcher.on("error", (err) => {
        console.log(`Error: ${err}`);
      });

      watcher.on("close", () => {
        console.log(`File ${filename} has been closed`);
      });

      
    }
  });
}

// en el codigo anterior la  traza de ejecución mostrando, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además de lo que se muestra por la consola.
