const express = require('express');
const router = express.Router();
const ProductManager = require('./productManager');

const productManager = new ProductManager();

router.get('/', (req, res) => {
  const products = productManager.getAllProducts();
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);
  res.json(product);
});

router.post('/', (req, res) => {
  const newProduct = req.body;

  if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  productManager.addProduct(newProduct);
  res.json(newProduct);
});

router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  productManager.updateProduct(productId, updatedProduct);
  res.json(updatedProduct);
});

router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  productManager.deleteProduct(productId);
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
