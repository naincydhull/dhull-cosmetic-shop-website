const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_MODEL = process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';

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
    if (!GROQ_API_KEY) {
      return res.status(503).json({ error: 'Chatbot is not configured. Please contact us on WhatsApp.' });
    }

    const { messages } = req.body || {};
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
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};