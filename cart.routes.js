const express = require('express');
const router = express.Router();
const CartManager = require('./cartManager');

const cartManager = new CartManager();

router.post('/', (req, res) => {
  const newCart = req.body;

  if (!newCart.products) {
    return res.status(400).json({ message: 'El campo "products" es obligatorio' });
  }

  cartManager.addCart(newCart);
  res.json(newCart);
});

router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = cartManager.getCartById(cartId);
  res.json(cart);
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  const product = productManager.getProductById(productId);
  const cart = cartManager.getCartById(cartId);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  cartManager.addToCart(cartId, productId, quantity);
  res.json({ message: 'Producto agregado al carrito exitosamente' });
});

module.exports = router;
