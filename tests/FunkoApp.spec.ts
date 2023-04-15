import "mocha";
import { expect } from "chai";
import { App } from "../src/ejer3/FunkoApp";
import { Funko } from "../src/ejer3/datatype/Funko";
import * as fs from "fs";
import { Tipos, Genero } from "../src/ejer3/datatype/Tipos";

describe("FunkoApp", () => {
  it("should cargar datos", () => {
    fs.rmSync("./data/user", { recursive: true, force: true });
    const funkoApp = new App("user");
    let funciona = funkoApp.cargarDatos("user");
    funkoApp.addFunko(
      "user",
      1,
      "nombre",
      "desc",
      Tipos.Pop,
      Genero.Anime,
      "franq",
      1,
      true,
      "car_e",
      1
    );
    funkoApp.guardarDatos();
    expect(funciona).to.be.equal(false);
    funkoApp.guardarDatos();
  });
  it("should cargar datos", () => {
    const funkoApp = new App("user");
    let funciona = funkoApp.cargarDatos("user");
    expect(funciona).to.be.equal(true);
  });
  it("should guardar datos", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let funciona = funkoApp.guardarDatos();
    expect(funciona).to.be.equal(true);
  });
  it("should add a funko", () => {
    const funkoApp = new App("user");
    let added = funkoApp.addFunko(
      "user",
      1,
      "nombre",
      "desc",
      Tipos.Pop,
      Genero.Anime,
      "franq",
      1,
      true,
      "car_e",
      1
    );
    expect(added).to.be.equal(true);
  });
  it("should not add a funko", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let added = funkoApp.addFunko(
      "user",
      1,
      "nombre",
      "desc",
      Tipos.Pop,
      Genero.Anime,
      "franq",
      1,
      true,
      "car_e",
      1
    );
    expect(added).to.be.equal(false);
  });
  it("should modify a funko", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let modified = funkoApp.modifyFunko(
      1,
      "nombre2",
      "desc2",
      Tipos.Pop,
      Genero.Anime,
      "franq2",
      2,
      false,
      "car_e2",
      2
    );
    expect(modified).to.be.equal(true);
  });
  it("should not modify a funko", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let modified = funkoApp.modifyFunko(
      2,
      "nombre2",
      "desc2",
      Tipos.Pop,
      Genero.Anime,
      "franq2",
      2,
      false,
      "car_e2",
      2
    );
    expect(modified).to.be.equal(false);
  });
  it("should get a funko", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    const funko = funkoApp.getFunko(1);
    expect(funko?.id).to.be.equal(1);
  });
  it("should list funkos", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    const funkos = funkoApp.listFunkos();
    let fun = false;
    if (funkos != null) {
      fun = true;
    }
    expect(fun).to.be.equal(true);
  });
  it("should read a funko by id", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    funkoApp.addFunko(
      "user",
      2,
      "nombre",
      "desc",
      Tipos.Pop,
      Genero.Anime,
      "franq",
      1,
      true,
      "car_e",
      200
    );
    funkoApp.addFunko(
      "user",
      3,
      "nombre",
      "desc",
      Tipos.Pop,
      Genero.Anime,
      "franq",
      1,
      true,
      "car_e",
      300
    );
    funkoApp.addFunko(
      "user",
      4,
      "nombre",
      "desc",
      Tipos.Pop,
      Genero.Anime,
      "franq",
      1,
      true,
      "car_e",
      600
    );
    funkoApp.cargarDatos("user");
    const funko = funkoApp.showFunkoById(1) ? true : false;
    const funko2 = funkoApp.showFunkoById(2) ? true : false;
    const funko3 = funkoApp.showFunkoById(3) ? true : false;
    const funko4 = funkoApp.showFunkoById(4) ? true : false;
    expect(funko).to.be.equal(true);
    expect(funko2).to.be.equal(true);
    expect(funko3).to.be.equal(true);
    expect(funko4).to.be.equal(true);
  });
  it("should not read a funko by id", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    const funko = funkoApp.showFunkoById(7) ? true : false;
    expect(funko).to.be.equal(false);
  });
  it("should delete a funko", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let removed = funkoApp.removeFunko(1);
    expect(removed).to.be.equal(true);
  });
  it("should not delete a funko", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let removed = funkoApp.removeFunko(7) ? true : false;
    expect(removed).to.be.equal(false);
  });
});
