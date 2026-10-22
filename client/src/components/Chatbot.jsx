import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMinus, FiMaximize2, FiMinimize2, FiMessageCircle } from 'react-icons/fi';

const WELCOME = {
  role: 'assistant',
  content:
    "Namaste! Main Dhull Cosmetic Shop ka AI assistant hoon. Aap products, categories, timing ya location ke baare mein pooch sakte hain. How can I help you today?",
};

const QUICK_PROMPTS = [
  'What products do you have?',
  'Shop timing kya hai?',
  'How can I order?',
  'Skincare products dikhao',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, maximized]);

  const send = useCallback(
    async (text) => {
      const content = (text ?? input).trim();
      if (!content || loading) return;

      setError('');
      setInput('');
      const nextMessages = [...messages, { role: 'user', content }];
      setMessages(nextMessages);
      setLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextMessages.slice(1) }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'Something went wrong');
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } catch (err) {
        setError(err.message || 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [input, loading, messages]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const panelSize = maximized
    ? 'w-[min(900px,calc(100vw-1.5rem))] h-[min(860px,calc(100vh-1.5rem))] sm:h-[calc(100vh-2rem)]'
    : 'w-[min(420px,calc(100vw-1.5rem))] h-[min(640px,calc(100vh-4rem))]';

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end" role="region" aria-label="Shop chat assistant">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className={`${panelSize} mb-4 flex flex-col overflow-hidden rounded-2xl bg-cream-100 shadow-2xl ring-1 ring-charcoal-900/10`}
          >
            {/* Header with website logo */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-rose-700 to-plum-800 px-4 py-3 text-white">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-cream-100 ring-2 ring-gold-400">
                <img
                  src="/logo.svg"
                  alt="Dhull Cosmetic Shop logo"
                  className="h-full w-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-heading text-base font-semibold">Dhull Cosmetic Shop</h2>
                <p className="flex items-center gap-1.5 text-xs text-rose-100">
                  <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />
                  AI Assistant • Online
                </p>
              </div>
              <button
                onClick={() => setMaximized((v) => !v)}
                className="rounded-lg p-2 text-rose-100 hover:bg-white/15 hover:text-white transition-colors"
                aria-label={maximized ? 'Restore chat window' : 'Maximize chat window'}
              >
                {maximized ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-rose-100 hover:bg-white/15 hover:text-white transition-colors"
                aria-label="Minimize chat window"
              >
                <FiMinus size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-blush-50 px-4 py-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'rounded-br-md bg-rose-500 text-cream-50'
                        : 'rounded-bl-md bg-white text-charcoal-800 ring-1 ring-blush-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-blush-100" aria-label="Assistant is typing">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                        className="h-2 w-2 rounded-full bg-rose-400"
                      />
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <p className="mx-auto max-w-[90%] rounded-xl bg-rose-100 px-3 py-2 text-center text-xs text-rose-700">
                  {error}
                </p>
              )}
            </div>

            {/* Quick prompts */}
            <div className="flex flex-wrap gap-2 bg-blush-50 px-4 pb-3">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-rose-700 ring-1 ring-rose-200 hover:bg-rose-500 hover:text-white hover:ring-rose-500 transition-colors disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex items-end gap-2 border-t border-blush-100 bg-white px-3 py-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Type a message…"
                aria-label="Type a message"
                className="max-h-28 flex-1 resize-none rounded-xl border border-blush-200 bg-cream-50 px-3 py-2.5 text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-40 transition-colors"
                aria-label="Send message"
              >
                <FiSend size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button with website logo */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((v) => !v)}
        className="group relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-rose-600 to-plum-800 shadow-xl ring-4 ring-gold-400/60"
        aria-expanded={open}
        aria-label={open ? 'Minimize chat assistant' : 'Open chat assistant'}
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-30" aria-hidden="true" />
        )}
        {open ? (
          <FiMessageCircle size={30} className="text-cream-50" aria-hidden="true" />
        ) : (
          <img
            src="/logo.svg"
            alt=""
            className="h-14 w-14 rounded-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        )}
      </motion.button>
    </div>
  );
}
