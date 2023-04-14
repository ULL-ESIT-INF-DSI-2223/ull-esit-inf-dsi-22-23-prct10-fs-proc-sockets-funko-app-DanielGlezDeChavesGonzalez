"use strict";
exports.__esModule = true;
exports.App = void 0;
var fs = require("fs");
var Funko_1 = require("./datatype/Funko");
var chalk = require("chalk");
var path = require("path");
/**
 * Clase App
 */
var App = /** @class */ (function () {
    /**
     * constructor de la clase App
     * @param user nombre del usuario
     */
    function App(user) {
        this.Funkos = new Map();
        this.Usuario = user;
    }
    /**
     * funcion para cargar los datos de un usuario
     * @param user nombre del usuario
     * @returns devuelve true si se ha cargado correctamente
     */
    App.prototype.cargarDatos = function (user) {
        var _this = this;
        var carpeta = "./data/" + user + "/";
        if (!fs.existsSync(carpeta)) {
            fs.mkdirSync("./data/" + user);
        }
        var archivos = fs.readdirSync(carpeta);
        if (archivos.length == 0) {
            return false;
        }
        else {
            archivos.forEach(function (archivo) {
                var ruta = path.join(carpeta, archivo);
                var funko = JSON.parse(fs.readFileSync(ruta, "utf-8"));
                _this.Funkos.set(funko.id, funko);
            });
        }
        return true;
    };
    /**
     * funcion para guardar los datos de un usuario
     * @returns devuelve true si se ha guardado correctamente
     */
    App.prototype.guardarDatos = function () {
        var _this = this;
        this.Funkos.forEach(function (funko) {
            if (!fs.existsSync("./data/" + _this.Usuario + "/" + funko.id + ".json")) {
                fs.writeFileSync("./data/" + _this.Usuario + "/" + funko.id + ".json", JSON.stringify(funko));
            }
        });
        return true;
    };
    /**
     * funcion para obtener un funko
     * @param id id del funko
     * @returns devuelve el funko con el id indicado
     */
    App.prototype.getFunko = function (id) {
        return this.Funkos.get(id);
    };
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
    App.prototype.addFunko = function (user, id, name, description, Tipo, Genero, Franquicia, Numero_franquicia, Exclusivo, Caracteristicas_especiales, Precio) {
        if (!this.Funkos.has(id)) {
            var funko = new Funko_1.Funko(id, name, description, Tipo, Genero, Franquicia, Numero_franquicia, Exclusivo, Caracteristicas_especiales, Precio);
            var ruta = "./data/" + user + "/" + id + ".json";
            fs.writeFileSync(ruta, JSON.stringify(funko));
            return true;
        }
        else {
            return false;
        }
    };
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
    App.prototype.modifyFunko = function (id, name, description, Tipo, Genero, Franquicia, Numero_franquicia, Exclusivo, Caracteristicas_especiales, Precio) {
        if (this.Funkos.has(id)) {
            var funko = new Funko_1.Funko(id, name, description, Tipo, Genero, Franquicia, Numero_franquicia, Exclusivo, Caracteristicas_especiales, Precio);
            var ruta = "./data/" + this.Usuario + "/" + id + ".json";
            fs.writeFileSync(ruta, JSON.stringify(funko));
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * funcion para eliminar un funko
     * @param id id del funko
     * @returns devuelve true si se ha eliminado correctamente
     */
    App.prototype.removeFunko = function (id) {
        if (this.Funkos.has(id)) {
            fs.unlinkSync("./data/" + this.Usuario + "/" + id + ".json");
            this.Funkos["delete"](id);
            return true;
        }
        return false;
    };
    /**
     * funcion para listar los funkos
     * @returns devuelve true si se ha listado correctamente
     */
    App.prototype.listFunkos = function () {
        console.log(chalk.green("Funkos de " + this.Usuario));
        console.log(chalk.green("------------------"));
        this.Funkos.forEach(function (funko) {
            var color = chalk.green;
            if (funko.Precio <= 100) {
                color = chalk.green;
            }
            else if (funko.Precio > 100 && funko.Precio <= 200) {
                color = chalk.yellow;
            }
            else if (funko.Precio > 200 && funko.Precio <= 500) {
                color = chalk.red;
            }
            else {
                color = chalk.blue;
            }
            console.log(color("ID: " + funko.id));
            console.log(color("Nombre: " + funko.name));
            console.log(color("Descripcion: " + funko.description));
            console.log(color("Tipo: " + funko.Tipo));
            console.log(color("Genero: " + funko.Genero));
            console.log(color("Franquicia: " + funko.Franquicia));
            console.log(color("Numero de franquicia: " + funko.Numero_franquicia));
            console.log(color("Exclusivo: " + funko.Exclusivo));
            console.log(color("Caracteristicas especiales: " + funko.Caracteristicas_especiales));
            console.log(color("Precio: " + funko.Precio));
            console.log(color("------------------"));
        });
        return true;
    };
    /**
     * funcion para mostrar un funko por su id
     * @param id id del funko
     * @returns devuelve true si se ha mostrado correctamente
     */
    App.prototype.showFunkoById = function (id) {
        if (this.Funkos.has(id)) {
            var funko = this.Funkos.get(id);
            if (funko !== undefined) {
                console.log(chalk.gray("ID: " + funko.id));
                console.log(chalk.gray("Nombre: " + funko.name));
                console.log(chalk.gray("Descripcion: " + funko.description));
                console.log(chalk.gray("Tipo: " + funko.Tipo));
                console.log(chalk.gray("Genero: " + funko.Genero));
                console.log(chalk.gray("Franquicia: " + funko.Franquicia));
                console.log(chalk.gray("Numero de franquicia: " + funko.Numero_franquicia));
                console.log(chalk.gray("Exclusivo: " + funko.Exclusivo));
                console.log(chalk.gray("Caracteristicas especiales: " + funko.Caracteristicas_especiales));
                console.log(chalk.gray("Precio: " + funko.Precio));
                console.log(chalk.gray("------------------"));
                return true;
            }
        }
        return false;
    };
    return App;
}());
exports.App = App;
