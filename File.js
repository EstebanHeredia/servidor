const fs = require("fs");
//Agregue indicadores para saber si los metodos estaban haciendo lo que debian hacer
module.exports = class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(Products) {
    try {
      let arr = await this.getAll();
      arr.push(Products);
      await fs.promises.writeFile(this.ruta, JSON.stringify(arr, null, 2));
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.ruta, "utf-8");
      return contenido;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try {
      console.log(id);
      const contenido = await this.getAll();
      console.log(contenido);
      let filtered = JSON.parse(contenido).find((item) => item.id === id);
      if (filtered === undefined) {
        return null;
      } else {
        return filtered;
      }
    } catch (error) {
      throw new Error("Error relacionado, ", error.message);
    }
  }

  async deleteById(id) {
    try {
      const contenido = await this.getAll();
      let filtered = JSON.parse(contenido).filter((item) => item.id !== id);
      await fs.promises.writeFile(this.ruta, JSON.stringify(filtered, null, 2));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
