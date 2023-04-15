import * as fs from "fs";
import { Funko } from "./datatype/Funko";
import { Tipos, Genero } from "./datatype/Tipos";
import * as chalk from "chalk";
import * as path from "path";

/**
 * Clase App
 */
export class App {
  private Usuario: string;
  private Funkos: Map<number, Funko> = new Map<number, Funko>();

  /**
   * constructor de la clase App
   * @param user nombre del usuario
   */
  constructor(user: string) {
    this.Usuario = user;
  }

  /**
   * funcion para cargar los datos de un usuario
   * @param user nombre del usuario
   * @returns devuelve true si se ha cargado correctamente
   */
  public cargarDatos(user: string): boolean {
    const carpeta: string = "./data/" + user + "/";
    if (!fs.existsSync(carpeta)) {
      fs.mkdirSync("./data/" + user);
    }
    const archivos = fs.readdirSync(carpeta);

    if (archivos.length == 0) {
      return false;
    } else {
      archivos.forEach((archivo) => {
        const ruta: string = path.join(carpeta, archivo);
        const funko: Funko = JSON.parse(fs.readFileSync(ruta, "utf-8"));
        this.Funkos.set(funko.id, funko);
      });
    }
    return true;
  }

  /**
   * funcion para guardar los datos de un usuario
   * @returns devuelve true si se ha guardado correctamente
   */
  public guardarDatos(): boolean {
    this.Funkos.forEach((funko) => {
      if (!fs.existsSync("./data/" + this.Usuario + "/" + funko.id + ".json")) {
        fs.writeFileSync(
          "./data/" + this.Usuario + "/" + funko.id + ".json",
          JSON.stringify(funko)
        );
      }
    });
    return true;
  }

  /**
   * funcion para obtener un funko
   * @param id id del funko
   * @returns devuelve el funko con el id indicado
   */
  public getFunko(id: number): Funko | undefined {
    return this.Funkos.get(id);
  }

  /**
   * funcion para añadir un funko
   * @param user usuario
   * @param id id del funko
   * @param name nombre del funko
   * @param description descripcion del funko
   * @param Tipo tipo del funko
   * @param Genero genero del funko
   * @param Franquicia franquicia del funko
   * @param Numero_franquicia numero de la franquicia del funko
   * @param Exclusivo exclusivo del funko
   * @param Caracteristicas_especiales caracteristicas especiales del funko
   * @param Precio precio del funko
   * @returns devuelve true si se ha añadido correctamente
   */
  public addFunko(
    user: string,
    id: number,
    name: string,
    description: string,
    Tipo: Tipos,
    Genero: Genero,
    Franquicia: string,
    Numero_franquicia: number,
    Exclusivo: boolean,
    Caracteristicas_especiales: string,
    Precio: number
  ): boolean {
    if (!this.Funkos.has(id)) {
      const funko = new Funko(
        id,
        name,
        description,
        Tipo,
        Genero,
        Franquicia,
        Numero_franquicia,
        Exclusivo,
        Caracteristicas_especiales,
        Precio
      );
      const ruta: string = "./data/" + user + "/" + id + ".json";
      fs.writeFileSync(ruta, JSON.stringify(funko));
      return true;
    } else {
      return false;
    }
  }

  /**
   * funcion para modificar un funko
   * @param id id del funko
   * @param name nombre del funko
   * @param description descripcion del funko
   * @param Tipo tipo del funko
   * @param Genero genero del funko
   * @param Franquicia franquicia del funko
   * @param Numero_franquicia numero de la franquicia del funko
   * @param Exclusivo exclusivo del funko
   * @param Caracteristicas_especiales caracteristicas especiales del funko
   * @param Precio precio del funko
   * @returns devuelve true si se ha modificado correctamente
   */
  public modifyFunko(
    id: number,
    name: string,
    description: string,
    Tipo: Tipos,
    Genero: Genero,
    Franquicia: string,
    Numero_franquicia: number,
    Exclusivo: boolean,
    Caracteristicas_especiales: string,
    Precio: number
  ): boolean {
    if (this.Funkos.has(id)) {
      const funko = new Funko(
        id,
        name,
        description,
        Tipo,
        Genero,
        Franquicia,
        Numero_franquicia,
        Exclusivo,
        Caracteristicas_especiales,
        Precio
      );
      const ruta: string = "./data/" + this.Usuario + "/" + id + ".json";
      fs.writeFileSync(ruta, JSON.stringify(funko));
      return true;
    } else {
      return false;
    }
  }

  /**
   * funcion para eliminar un funko
   * @param id id del funko
   * @returns devuelve true si se ha eliminado correctamente
   */
  public removeFunko(id: number): boolean {
    if (this.Funkos.has(id)) {
      fs.unlinkSync("./data/" + this.Usuario + "/" + id + ".json");
      this.Funkos.delete(id);
      return true;
    }
    return false;
  }

  /**
   * funcion para listar los funkos
   * @returns devuelve true si se ha listado correctamente
   */
  public listFunkos(): Funko[] {
    const funkos: Funko[] = [];
    this.Funkos.forEach((funko) => {
      funkos.push(funko);
    });
    return funkos;
  }

  /**
   * funcion para mostrar un funko por su id
   * @param id id del funko
   * @returns devuelve true si se ha mostrado correctamente
   */
  public showFunkoById(id: number): Funko | undefined {
    if (this.Funkos.has(id)) {
      const funko = this.Funkos.get(id);
      if (funko !== undefined) {
        return this.Funkos.get(id);
      }
    }
    return undefined;
  }
}
