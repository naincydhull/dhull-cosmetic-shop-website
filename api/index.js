const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../server/products.json');
const messagesPath = path.join(__dirname, '../server/messages.json');
const ordersPath = path.join(__dirname, '../server/orders.json');
const ADMIN_KEY = process.env.ADMIN_KEY || '';
const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'nancydhull72@gmail.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'nancydhull72@gmail.com';
const SENDER_NAME = process.env.SENDER_NAME || 'Dhull Cosmetic Shop';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_MODEL = process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';

function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ({
    '&': '&', '<': '<', '>': '>', '"': '"', "'": ''',
  }[c]));
}

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

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { query, method, body, url } = req;

  try {
    if (url === '/api/products' && method === 'GET') {
      const products = readProducts();
      const { category, search } = query;

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
    }

    if (url.startsWith('/api/products/') && method === 'GET') {
      const id = parseInt(url.split('/').pop());
      const products = readProducts();
      const product = products.find(p => p.id === id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      return res.json(product);
    }

    if (url === '/api/contact' && method === 'POST') {
      const { name, phone, message } = body;

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

      let emailSent = false;
      try {
        const result = await sendContactEmail(newMessage);
        emailSent = result.sent;
      } catch (err) {
        console.error('Error sending contact email:', err.message);
      }

      return res.json({
        success: true,
        message: 'Message sent successfully! We will get back to you soon.',
        emailSent,
      });
    }

    if (url === '/api/orders' && method === 'POST') {
      const { customer, items, totalItems, message, createdAt } = body;

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

    if (url === '/api/orders' && method === 'GET') {
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

    if (url === '/api/chat' && method === 'POST') {
      if (!GROQ_API_KEY) {
        return res.status(503).json({ error: 'Chatbot is not configured. Please contact us on WhatsApp.' });
      }

      const { messages } = body || {};
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'messages array is required' });
      }

      const sanitized = messages
        .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .slice(-12)
        .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }));

      if (sanitized.length === 0) {
        return res.status(400).json({ error: 'No valid messages' });
      }

      const CHAT_SYSTEM_PROMPT = `You are the friendly AI assistant of "Dhull Cosmetic Shop", a real beauty store.

Shop info:
- Address: Harsola, Kaithal, Haryana, India
- Open every day: 9:00 AM to 7:00 PM
- Phone / WhatsApp: 8053224896 (https://wa.me/918053224896)
- Website sections: Products, About, Gallery, Contact
- Categories: Skincare, Makeup, Haircare, Fragrance, Nail Products
- 500+ genuine products at affordable prices; serving customers since 2010

Your job:
- Help customers with product questions, categories, prices range (affordable), shop timing, location, and how to order (add to cart on the website or message on WhatsApp).
- Keep replies short (2-4 sentences), warm and simple. Use the same language the customer writes in (English or Hinglish).
- If you don't know a specific product/price, politely suggest messaging the shop on WhatsApp 8053224896.
- Never invent discounts, brands or delivery promises. No medical claims about cosmetics.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [{ role: 'system', content: CHAT_SYSTEM_PROMPT }, ...sanitized],
          max_tokens: 700,
          temperature: 0.6,
        }),
      });

      if (!response.ok) {
        const details = await response.text();
        console.error(`Groq API ${response.status}:`, details.slice(0, 300));
        return res.status(502).json({ error: 'Assistant is busy right now. Please try again.' });
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not understand that.';
      return res.json({ reply });
    }

    if (url === '/health' && method === 'GET') {
      return res.json({ status: 'ok', service: 'dhull-cosmetic-shop-api' });
    }

    return res.status(404).json({ error: 'Not found' });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};