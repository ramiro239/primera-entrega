const fs = require('fs');

class CartManager {
  constructor() {
    this.cartsFile = 'carts.json';
    this.carts = this.loadCarts();
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.cartsFile);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveCarts() {
    fs.writeFileSync(this.cartsFile, JSON.stringify(this.carts, null, 2));
  }

  getAllCarts() {
    return this.carts;
  }

  getCartById(cartId) {
    return this.carts.find(cart => cart.id === cartId);
  }

  addCart(newCart) {
    // Logic to generate unique ID and add the cart
    newCart.id = Date.now().toString(); // Simple way to generate unique ID
    newCart.products = [];
    this.carts.push(newCart);
    this.saveCarts();
  }

  addToCart(cartId, productId, quantity) {
    const cart = this.carts.find(cart => cart.id === cartId);

    if (cart) {
      const existingProduct = cart.products.find(product => product.product === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      this.saveCarts();
    }
  }
}

module.exports = CartManager;
