/**
 * Experiment 04: Express + Mongoose CRUD REST API with browser client.
 *
 * Default local database: mongodb://127.0.0.1:27017/fsd2lab
 * Set MONGO_URI to use MongoDB Atlas.
 * Run from the repository root:
 *   node 04-express-database-rest-api/server.js
 */
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = Number(process.env.PORT) || 3004;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fsd2lab';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
});
const Product = mongoose.model('Product', productSchema);

// Keep route handlers small and return readable errors to the client.
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/api/products', async (_req, res, next) => {
  try {
    res.json(await Product.find().sort({ name: 1 }));
  } catch (error) { next(error); }
});

app.post('/api/products', async (req, res, next) => {
  try {
    const product = await Product.create({ name: req.body.name, price: req.body.price });
    res.status(201).json(product);
  } catch (error) { next(error); }
});

app.put('/api/products/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product id.' });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, price: req.body.price },
      { new: true, runValidators: true },
    );
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    return res.json(product);
  } catch (error) { return next(error); }
});

app.delete('/api/products/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product id.' });
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    return res.json({ message: 'Product deleted', id: product._id });
  } catch (error) { return next(error); }
});

// Minimal single-page browser UI: create, list, edit and delete products via fetch().
app.get('/', (_req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>FSD2 Products CRUD</title>
  <style>
    body{font:16px Arial,sans-serif;max-width:850px;margin:32px auto;padding:0 16px}
    input,button{padding:8px;margin:4px} li{margin:12px 0}
    #message{min-height:1.4em} code{background:#eee;padding:2px 4px}
  </style>
</head>
<body>
  <h1>Experiment 4: Product CRUD</h1>
  <form id="productForm">
    <label>Product name <input id="name" required maxlength="80"></label>
    <label>Price <input id="price" type="number" min="0" step="0.01" required></label>
    <button type="submit">Add product</button>
  </form>
  <p id="message" role="status"></p>
  <button id="refresh" type="button">Refresh list</button>
  <ul id="products"></ul>
  <h2>API endpoints</h2>
  <pre>GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id</pre>
<script>
const list = document.getElementById('products');
const message = document.getElementById('message');
const form = document.getElementById('productForm');

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

function addAction(item, label, action) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.addEventListener('click', action);
  item.append(' ', button);
}

async function loadProducts() {
  try {
    const products = await api('/api/products');
    list.replaceChildren();
    for (const product of products) {
      const item = document.createElement('li');
      item.append(document.createTextNode(product.name + ' — ₹' + product.price));
      addAction(item, 'Edit', async () => {
        const name = prompt('New product name:', product.name);
        if (name === null) return;
        const priceText = prompt('New product price:', String(product.price));
        if (priceText === null) return;
        try {
          await api('/api/products/' + product._id, {
            method: 'PUT',
            body: JSON.stringify({ name: name.trim(), price: Number(priceText) }),
          });
          message.textContent = 'Product updated.';
          await loadProducts();
        } catch (error) { message.textContent = error.message; }
      });
      addAction(item, 'Delete', async () => {
        try {
          await api('/api/products/' + product._id, { method: 'DELETE' });
          message.textContent = 'Product deleted.';
          await loadProducts();
        } catch (error) { message.textContent = error.message; }
      });
      list.appendChild(item);
    }
    if (!products.length) list.textContent = 'No products yet. Add one above.';
  } catch (error) { message.textContent = error.message; }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const price = Number(document.getElementById('price').value);
  try {
    await api('/api/products', { method: 'POST', body: JSON.stringify({ name, price }) });
    form.reset();
    message.textContent = 'Product added.';
    await loadProducts();
  } catch (error) { message.textContent = error.message; }
});
document.getElementById('refresh').addEventListener('click', loadProducts);
loadProducts();
</script>
</body>
</html>`);
});

app.use((error, _req, res, _next) => {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json({ message: 'Server error. Check the terminal for details.' });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected.');
    app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.error('Check that MongoDB is running or MONGO_URI is correct.');
    process.exitCode = 1;
  }
}
start();
