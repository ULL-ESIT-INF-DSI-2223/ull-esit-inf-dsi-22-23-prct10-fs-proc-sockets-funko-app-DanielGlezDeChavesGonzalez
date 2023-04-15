import "mocha";
import { expect } from "chai";
import {
  Tipos,
  Genero,
  asignarGenero,
  asignarTipo,
} from "../src/ejer3/datatype/Tipos";

describe("Tipos", () => {
  it("should asignarTipo", () => {
    const tipo = asignarTipo("Pop");
    expect(tipo).to.be.equal("Pop");
  });
  it("should asignarTipo", () => {
    const tipo = asignarTipo("Pop_Rides");
    expect(tipo).to.be.equal("Pop_Rides");
  });
  it("should asignarTipo", () => {
    const tipo = asignarTipo("Vynil_Soda");
    expect(tipo).to.be.equal("Vynil_Soda");
  });
  it("should asignarTipo", () => {
    const tipo = asignarTipo("Vynil_Gold");
    expect(tipo).to.be.equal("Vynil_Gold");
  });
  it("should asignarTipo", () => {
    const tipo = asignarTipo("Dorbz");
    expect(tipo).to.be.equal("Dorbz");
  });
  it("should asignarTipo", () => {
    const tipo = asignarTipo("Chrome");
    expect(tipo).to.be.equal("Chrome");
  });
  it("should asignarTipo", () => {
    const tipo = asignarTipo("Pocket_Pops");
    expect(tipo).to.be.equal("Pocket_Pops");
  });
  it("should asignarTipo", () => {
    const tipo = asignarTipo("Mystery_Mini");
    expect(tipo).to.be.equal("Mystery_Mini");
  });
  it("should asignarTipo", () => {
    const tipo = asignarTipo("Pint_Size_Heroes");
    expect(tipo).to.be.equal("Pint_Size_Heroes");
  });
  it("should asignarTipo", () => {
    const tipo = asignarTipo("Error");
    expect(tipo).to.be.equal("Error");
  });
  it("should asignarGenero", () => {
    const genero = asignarGenero("Animacion");
    expect(genero).to.be.equal("Animacion");
  });
  it("should asignarGenero", () => {
    const genero = asignarGenero("Peliculas_y_Tv");
    expect(genero).to.be.equal("Peliculas_y_Tv");
  });
  it("should asignarGenero", () => {
    const genero = asignarGenero("Videojuegos");
    expect(genero).to.be.equal("Videojuegos");
  });
  it("should asignarGenero", () => {
    const genero = asignarGenero("Comics");
    expect(genero).to.be.equal("Comics");
  });
  it("should asignarGenero", () => {
    const genero = asignarGenero("Deportes");
    expect(genero).to.be.equal("Deportes");
  });
  it("should asignarGenero", () => {
    const genero = asignarGenero("Musica");
    expect(genero).to.be.equal("Musica");
  });
  it("should asignarGenero", () => {
    const genero = asignarGenero("Anime");
    expect(genero).to.be.equal("Anime");
  });
  it("should asignarGenero", () => {
    const genero = asignarGenero("Error");
    expect(genero).to.be.equal("Error");
  });
});
