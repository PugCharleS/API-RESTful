const express = require("express");
const { Router } = express;
const { products } = require("./public/data.js");

const router = Router();

products.forEach((product, i) => {
  product.id = i + 1;
});

class ProductsApi {
  constructor(products) {
    this.id = products.length;

    this.products = products;

    router.get("/", this.getProducts);
    router.get("/:id", this.getProductById);
    router.post("/", this.postProduct);
    router.put("/:id", this.updateProduct);
    router.delete("/:id", this.deleteProduct);
  }

  getProducts = (req, res) => {
    this.products.length > 0
      ? res.send(this.products)
      : res.send({ error: "No hay productos" });
  };

  getProductById = (req, res) => {
    const { id } = req.params;
    id >= 1 && id <= this.products.length
      ? res.send(this.products[id - 1])
      : res.send({ error: "producto no encontrado" });
  };

  postProduct = (req, res) => {
    const title = req.body.title;
    const price = req.body.price;
    const thumbnail = req.body.thumbnail;

    const newProduct = { title, price, thumbnail, id: this.id + 1 };

    this.products.push(newProduct);
    res.send({ "producto agregado: ": newProduct });
  };

  updateProduct = (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (id >= 1 && id <= this.products.length) {
      const newProduct = { ...product, id: Number.parseInt(id) };
      this.products.splice(id - 1, 1, newProduct);
      res.send({ "producto actualizado: ": newProduct });
    } else {
      res.send({ error: "producto no encontrado" });
    }
  };

  deleteProduct = (req, res) => {
    const { id } = req.params;

    if (id >= 1 && id <= this.products.length) {
      products.splice(id - 1, 1);
      res.send({ message: "producto eliminado" });
    } else {
      res.send({ error: "producto no encontrado" });
    }
  };
}

new ProductsApi(products);

module.exports = router;
