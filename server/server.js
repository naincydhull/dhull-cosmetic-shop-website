const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Load environment variables from server/.env (Node 20.12+)
try {
  process.loadEnvFile(path.join(__dirname, '.env'));
} catch (err) {
  console.warn('Note: server/.env not loaded -', err.code || err.message);
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

const productsPath = path.join(__dirname, 'products.json');
const messagesPath = path.join(__dirname, 'messages.json');
const ordersPath = path.join(__dirname, 'orders.json');
const ADMIN_KEY = process.env.ADMIN_KEY || '';
if (!ADMIN_KEY) {
  console.warn('Warning: ADMIN_KEY is not set. /api/orders will reject all requests. Set it in server/.env');
}

// Email notification config (Brevo transactional email)
const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'nancydhull72@gmail.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'nancydhull72@gmail.com';
const SENDER_NAME = process.env.SENDER_NAME || 'Dhull Cosmetic Shop';

function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

// Sends the contact message to the shop owner's inbox via Brevo.
async function sendContactEmail(msg) {
  if (!BREVO_API_KEY) {
    console.warn('BREVO_API_KEY missing - contact email not sent');
    return { sent: false, reason: 'missing-api-key' };
  }

  const htmlContent = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#2b2b2b;">
      <h2 style="color:#6B1030;margin:0 0 16px;">New Contact Message</h2>
      <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(msg.name)}</p>
      <p style="margin:0 0 8px;"><strong>Phone:</strong> ${escapeHtml(msg.phone)}</p>
      <p style="margin:16px 0 8px;"><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;background:#fdf9f2;border:1px solid #eee;border-radius:8px;padding:12px;margin:0;">${escapeHtml(msg.message)}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:18px 0;" />
      <p style="color:#888;font-size:12px;margin:0;">Received: ${escapeHtml(msg.createdAt)}</p>
    </div>
  `;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: NOTIFY_EMAIL, name: SENDER_NAME }],
      subject: `New contact message from ${msg.name}`,
      htmlContent,
      textContent: `New contact message\nName: ${msg.name}\nPhone: ${msg.phone}\nMessage: ${msg.message}\nReceived: ${msg.createdAt}`,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Brevo API ${response.status}: ${details}`);
  }

  const data = await response.json();
  return { sent: true, messageId: data.messageId || null };
}

function readProducts() {
  const data = fs.readFileSync(productsPath, 'utf-8');
  return JSON.parse(data);
}

function readMessages() {
  if (!fs.existsSync(messagesPath)) return [];
  const data = fs.readFileSync(messagesPath, 'utf-8');
  return JSON.parse(data);
}

function writeMessages(messages) {
  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
}

function readOrders() {
  if (!fs.existsSync(ordersPath)) return [];
  const data = fs.readFileSync(ordersPath, 'utf-8');
  return JSON.parse(data);
}

function writeOrders(orders) {
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
}

app.get('/api/products', (req, res) => {
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

    res.json(filtered);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const messages = readMessages();
    const newMessage = {
      id: Date.now(),
      name,
      phone,
      message,
      createdAt: new Date().toISOString()
    };

    messages.push(newMessage);
    writeMessages(messages);

    // Email the owner. A failed email must NOT lose the saved message.
    let emailSent = false;
    try {
      const result = await sendContactEmail(newMessage);
      emailSent = result.sent;
    } catch (err) {
      console.error('Error sending contact email:', err.message);
    }

    res.json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      emailSent,
    });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Orders API
app.post('/api/orders', (req, res) => {
  try {
    const { customer, items, totalItems, message, createdAt } = req.body;

    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ error: 'Customer name and phone are required' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must have at least one item' });
    }

    // Validate phone number
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

    res.json({ success: true, message: 'Order placed successfully!', orderId: newOrder.id });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

app.get('/api/orders', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Admin key required' });
    }

    const providedKey = authHeader.split(' ')[1];
    
    if (providedKey !== ADMIN_KEY) {
      return res.status(403).json({ error: 'Forbidden: Invalid admin key' });
    }

    const orders = readOrders();
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});