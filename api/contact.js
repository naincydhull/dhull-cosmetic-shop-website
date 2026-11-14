const fs = require('fs');
const path = require('path');

const messagesPath = path.join(__dirname, '../server/messages.json');
const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'nancydhull72@gmail.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'nancydhull72@gmail.com';
const SENDER_NAME = process.env.SENDER_NAME || 'Dhull Cosmetic Shop';

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

function readMessages() {
  if (!fs.existsSync(messagesPath)) return [];
  const data = fs.readFileSync(messagesPath, 'utf-8');
  return JSON.parse(data);
}

function writeMessages(messages) {
  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};