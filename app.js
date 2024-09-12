const express = require('express');
const app = express();
const port = 3001;

// Middleware to parse JSON data
app.use(express.json());

let productArr = [
  { name: 'Ford Aspire', id: 'A101' },
  { name: 'Ford Ecosport', id: 'A102' },
  { name: 'Ford Fiesta', id: 'A103' }
];

// Read - GET method to retrieve the product array
app.get('/getAllProducts', (req, res) => {
  res.json(productArr);
});

// Create - POST method to add a new product
app.post('/insertProduct', (req, res) => {
  const newProduct = req.body;

  if (!newProduct.name || !newProduct.id) {
    return res.status(400).json({ error: 'Product name and ID are required' });
  }

  productArr.push(newProduct);
  res.json(productArr);
});

// Update - PUT method to update a product by ID
app.put('/updateProduct/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  let productFound = false;

  productArr = productArr.map(product => {
    if (product.id === productId) {
      productFound = true;
      return { ...product, name: updatedProduct.name || product.name };
    }
    return product;
  });

  if (!productFound) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(productArr);
});

// Delete - DELETE method to remove a product by ID
app.delete('/deleteProduct/:id', (req, res) => {
  const productId = req.params.id;

  const initialLength = productArr.length;
  productArr = productArr.filter(product => product.id !== productId);

  if (productArr.length === initialLength) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(productArr);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
