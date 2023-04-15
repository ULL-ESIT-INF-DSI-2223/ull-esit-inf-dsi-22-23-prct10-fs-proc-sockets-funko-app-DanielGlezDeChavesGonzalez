import "mocha";
import { expect } from "chai";
import { Funko } from "../src/ejer3/datatype/Funko";
import {
  Tipos,
  Genero,
  asignarTipo,
  asignarGenero,
} from "../src/ejer3/datatype/Tipos";

describe("Funko", () => {
  it("should create an instance of Funko", () => {
    const funko = new Funko(
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
    expect(funko).to.be.instanceOf(Funko);
    expect(funko.id).to.be.equal(1);
    expect(funko.name).to.be.equal("nombre");
    expect(funko.description).to.be.equal("desc");
    expect(funko.Tipo).to.be.equal("Pop");
    expect(funko.Genero).to.be.equal("Anime");
    expect(funko.Franquicia).to.be.equal("franq");
    expect(funko.Numero_franquicia).to.be.equal(1);
    expect(funko.Exclusivo).to.be.equal(true);
    expect(funko.Caracteristicas_especiales).to.be.equal("car_e");
    expect(funko.Precio).to.be.equal(1);
  });
});
