const express = require("express");
const ContenedorArchivo = require("./File");
const app = express();
const port = 8080;

const producto = new ContenedorArchivo("./productos.txt");

const connectedServer = app.listen(port, () => {
  console.log("Servidor arriba en el puerto", port);
});

const controller = {
  async getAll(req, res) {
    const allProducts = await producto.getAll();
    console.log(allProducts);
    await res.json(JSON.parse(allProducts));
  },

  async getRandom(req, res) {
    let num = Math.floor(Math.random() * (4 - 1) + 1);
    console.log(num);
    const random = await producto.getById(num);
    console.log(random);
    await res.json(random);
  },
};

app.get("/productos", controller.getAll);
app.get("/productoRandom", controller.getRandom);
