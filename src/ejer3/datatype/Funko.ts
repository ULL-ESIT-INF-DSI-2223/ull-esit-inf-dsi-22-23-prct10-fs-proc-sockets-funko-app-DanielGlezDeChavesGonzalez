import { Genero, Tipos } from "./Tipos";

/**
 * Clase Funko
 */
export class Funko {
  id: number;
  name: string;
  description: string;
  Tipo: Tipos;
  Genero: Genero;
  Franquicia: string;
  Numero_franquicia: number;
  Exclusivo: boolean;
  Caracteristicas_especiales: string;
  Precio: number;

  /**
   * constructor de la clase Funko
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
   */
  constructor(
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
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.Tipo = Tipo;
    this.Genero = Genero;
    this.Franquicia = Franquicia;
    this.Numero_franquicia = Numero_franquicia;
    this.Exclusivo = Exclusivo;
    this.Caracteristicas_especiales = Caracteristicas_especiales;
    this.Precio = Precio;
  }
}
