const fs = require('fs');
const path = require('path');

const ordersPath = path.join(__dirname, '../server/orders.json');
const ADMIN_KEY = process.env.ADMIN_KEY || '';

function readOrders() {
  if (!fs.existsSync(ordersPath)) return [];
  const data = fs.readFileSync(ordersPath, 'utf-8');
  return JSON.parse(data);
}

function writeOrders(orders) {
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const { customer, items, totalItems, message, createdAt } = req.body;

      if (!customer || !customer.name || !customer.phone) {
        return res.status(400).json({ error: 'Customer name and phone are required' });
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Order must have at least one item' });
      }

      const cleanedPhone = customer.phone.replace(/\D/g, '');
      if (cleanedPhone.length !== 10) {
        return res.status(400).json({ error: 'Invalid phone number' });
      }

      const orders = readOrders();
      const newOrder = {
        id: Date.now(),
        customer: {
          name: customer.name.trim(),
          phone: cleanedPhone,
          address: customer.address?.trim() || '',
          note: customer.note?.trim() || '',
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          image: item.image || '',
        })),
        totalItems: totalItems,
        message: message,
        createdAt: createdAt || new Date().toISOString(),
      };

      orders.unshift(newOrder);
      writeOrders(orders);

      return res.json({ success: true, message: 'Order placed successfully!', orderId: newOrder.id });
    }

    if (req.method === 'GET') {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Admin key required' });
      }

      const providedKey = authHeader.split(' ')[1];
      
      if (providedKey !== ADMIN_KEY) {
        return res.status(403).json({ error: 'Forbidden: Invalid admin key' });
      }

      const orders = readOrders();
      return res.json(orders);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};