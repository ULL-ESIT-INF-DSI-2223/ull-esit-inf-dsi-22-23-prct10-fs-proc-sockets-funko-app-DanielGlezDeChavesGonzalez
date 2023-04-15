import { App } from "./FunkoApp";
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

