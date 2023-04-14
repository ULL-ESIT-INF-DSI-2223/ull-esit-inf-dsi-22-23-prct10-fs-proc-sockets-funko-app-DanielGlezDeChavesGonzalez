"use strict";
exports.__esModule = true;
exports.asignarGenero = exports.Genero = exports.asignarTipo = exports.Tipos = void 0;
var Tipos;
(function (Tipos) {
    Tipos["Pop"] = "Pop";
    Tipos["Pop_Rides"] = "Pop_Rides";
    Tipos["Vynil_Soda"] = "Vynil_Soda";
    Tipos["Vynil_Gold"] = "Vynil_Gold";
    Tipos["Dorbz"] = "Dorbz";
    Tipos["Chrome"] = "Chrome";
    Tipos["Pocket_Pops"] = "Pocket_Pops";
    Tipos["Mystery_Mini"] = "Mystery_Mini";
    Tipos["Pint_Size_Heroes"] = "Pint_Size_Heroes";
    Tipos["Error"] = "Error";
})(Tipos = exports.Tipos || (exports.Tipos = {}));
function asignarTipo(tipo) {
    switch (tipo) {
        case "Pop":
            return Tipos.Pop;
        case "Pop_Rides":
            return Tipos.Pop_Rides;
        case "Vynil_Soda":
            return Tipos.Vynil_Soda;
        case "Vynil_Gold":
            return Tipos.Vynil_Gold;
        case "Dorbz":
            return Tipos.Dorbz;
        case "Chrome":
            return Tipos.Chrome;
        case "Pocket_Pops":
            return Tipos.Pocket_Pops;
        case "Mystery_Mini":
            return Tipos.Mystery_Mini;
        case "Pint_Size_Heroes":
            return Tipos.Pint_Size_Heroes;
        default:
            return Tipos.Error;
    }
}
exports.asignarTipo = asignarTipo;
var Genero;
(function (Genero) {
    Genero["Animacion"] = "Animacion";
    Genero["Peliculas_y_Tv"] = "Peliculas_y_Tv";
    Genero["Videojuegos"] = "Videojuegos";
    Genero["Comics"] = "Comics";
    Genero["Deportes"] = "Deportes";
    Genero["Musica"] = "Musica";
    Genero["Anime"] = "Anime";
    Genero["Error"] = "Error";
})(Genero = exports.Genero || (exports.Genero = {}));
function asignarGenero(genero) {
    switch (genero) {
        case "Animacion":
            return Genero.Animacion;
        case "Peliculas_y_Tv":
            return Genero.Peliculas_y_Tv;
        case "Videojuegos":
            return Genero.Videojuegos;
        case "Comics":
            return Genero.Comics;
        case "Deportes":
            return Genero.Deportes;
        case "Musica":
            return Genero.Musica;
        case "Anime":
            return Genero.Anime;
        default:
            return Genero.Error;
    }
}
exports.asignarGenero = asignarGenero;
