/**
 * Experiment 04: ExpressJS + Mongoose + CRUD + REST API
 *
 * What it demonstrates:
 * - MongoDB connection using Mongoose
 * - Mongoose schema and model
 * - GET, POST, PUT and DELETE REST endpoints
 * - A simple browser page that consumes the REST API
 */

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = 3004;
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017/fsd2lab';

// ------------------------------------------------------------
// Middleware
// ------------------------------------------------------------

app.use(express.json());

// ------------------------------------------------------------
// Mongoose schema and model
// ------------------------------------------------------------

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Product = mongoose.model(
  'Product',
  productSchema,
);

// ------------------------------------------------------------
// REST API routes
// ------------------------------------------------------------

// GET all products.
app.get('/api/products', async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

// POST a product.
app.post('/api/products', async (req, res) => {
  const product = await Product.create(req.body);

  res
    .status(201)
    .json(product);
});

// PUT a product.
app.put('/api/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );

  res.json(product);
});

// DELETE a product.
app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    message: 'Product deleted',
  });
});

// ------------------------------------------------------------
// Simple browser page
// ------------------------------------------------------------

app.get('/', (req, res) => {
  res.send(
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>FSD2 Products</title>
  </head>

  <body
    style="
      font-family: Arial, sans-serif;
      margin: 40px;
    "
  >
    <h1>Products</h1>

    <button onclick="loadProducts()">
      Refresh
    </button>

    <pre id="output">
Loading...
    </pre>

    <script>
      async function loadProducts() {
        const response =
          await fetch('/api/products');

        const data =
          await response.json();

        document.getElementById('output')
          .textContent =
          JSON.stringify(data, null, 2);
      }

      loadProducts();
    </script>
  </body>
</html>`,
  );
});

// ------------------------------------------------------------
// Database connection
// ------------------------------------------------------------

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        'Server: http://localhost:' + PORT,
      );
    });
  })
  .catch((error) => {
    console.error(
      'MongoDB connection failed:',
      error.message,
    );
  });
