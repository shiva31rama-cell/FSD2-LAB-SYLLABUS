const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3004;

app.use(express.json());

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});
const Product = mongoose.model('Product', productSchema);

// REST: GET all products.
app.get('/api/products', async (req, res) => {
  res.json(await Product.find());
});

// REST: POST a product.
app.post('/api/products', async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// REST: PUT a product.
app.put('/api/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// REST: DELETE a product.
app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

// A tiny SPA page: it talks to the REST API without a full page reload.
app.get('/', (req, res) => {
  res.send(`<!doctype html><html><body style="font-family:Arial;margin:40px">
    <h1>Products</h1><button onclick="load()">Refresh</button><pre id="out">Loading...</pre>
    <script>
      async function load(){
        const data = await fetch('/api/products').then(r => r.json());
        document.getElementById('out').textContent = JSON.stringify(data, null, 2);
      }
      load();
    </script>
  </body></html>`);
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fsd2lab')
  .then(() => app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`)))
  .catch(err => console.error('MongoDB connection failed:', err.message));
