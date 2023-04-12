export enum Tipos {
  Pop = "Pop",
  Pop_Rides = "Pop_Rides",
  Vynil_Soda = "Vynil_Soda",
  Vynil_Gold = "Vynil_Gold",
  Dorbz = "Dorbz",
  Chrome = "Chrome",
  Pocket_Pops = "Pocket_Pops",
  Mystery_Mini = "Mystery_Mini",
  Pint_Size_Heroes = "Pint_Size_Heroes",
  Error = "Error",
}

export function asignarTipo(tipo: string): Tipos {
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

export enum Genero {
  Animacion = "Animacion",
  Peliculas_y_Tv = "Peliculas_y_Tv",
  Videojuegos = "Videojuegos",
  Comics = "Comics",
  Deportes = "Deportes",
  Musica = "Musica",
  Anime = "Anime",
  Error = "Error",
}

export function asignarGenero(genero: string): Genero {
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
