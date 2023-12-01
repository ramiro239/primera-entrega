const express = require('express');
const productRoutes = require('./product.routes');
const cartRoutes = require('./cart.routes');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
