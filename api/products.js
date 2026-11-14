const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../server/products.json');

function readProducts() {
  const data = fs.readFileSync(productsPath, 'utf-8');
  return JSON.parse(data);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const products = readProducts();
    const { category, search } = req.query;

    let filtered = products;

    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    return res.json(filtered);
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};