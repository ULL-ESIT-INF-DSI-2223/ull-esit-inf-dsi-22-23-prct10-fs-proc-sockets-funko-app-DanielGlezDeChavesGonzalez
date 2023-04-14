"use strict";
exports.__esModule = true;
exports.Funko = void 0;
/**
 * Clase Funko
 */
var Funko = /** @class */ (function () {
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
    function Funko(id, name, description, Tipo, Genero, Franquicia, Numero_franquicia, Exclusivo, Caracteristicas_especiales, Precio) {
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
    return Funko;
}());
exports.Funko = Funko;
