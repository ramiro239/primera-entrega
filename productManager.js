const fs = require('fs');

class ProductManager {
  constructor() {
    this.productsFile = 'products.json';
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.productsFile);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.productsFile, JSON.stringify(this.products, null, 2));
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }

  addProduct(newProduct) {
    // Logic to generate unique ID and add the product
    newProduct.id = Date.now().toString(); // Simple way to generate unique ID
    newProduct.status = true; // Default status
    this.products.push(newProduct);
    this.saveProducts();
  }

  updateProduct(productId, updatedProduct) {
    const index = this.products.findIndex(product => product.id === productId);

    if (index !== -1) {
      Object.keys(updatedProduct).forEach(key => {
        if (key !== 'id') {
          this.products[index][key] = updatedProduct[key];
        }
      });

      this.saveProducts();
    }
  }

  deleteProduct(productId) {
    this.products = this.products.filter(product => product.id !== productId);
    this.saveProducts();
  }
}

module.exports = ProductManager;
