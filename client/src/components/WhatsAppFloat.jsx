import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '918053224896';
const DEFAULT_MESSAGE = "Hi! I'm interested in your products. Could you please share more details?";

const quickOptions = [
  { label: 'Skincare Inquiry', color: 'bg-green-500', message: "Hi! I'd like to know more about your skincare products." },
  { label: 'Makeup Inquiry', color: 'bg-rose-500', message: "Hi! I'd like to know more about your makeup products." },
  { label: 'General Inquiry', color: 'bg-green-600', message: DEFAULT_MESSAGE },
];

export default function WhatsAppFloat() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setVisible(currentScroll > lastScroll === false || currentScroll < 200);
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = (customMessage = '') => {
    const message = encodeURIComponent(customMessage || DEFAULT_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    setIsExpanded(false);
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      role="region"
      aria-label="WhatsApp contact options"
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute bottom-20 left-0 flex flex-col gap-3"
            role="menu"
          >
            {quickOptions.map((option) => (
              <motion.button
                key={option.label}
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openWhatsApp(option.message)}
                className={`${option.color} text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap`}
                role="menuitem"
              >
                <FaWhatsapp size={18} aria-hidden="true" />
                <span className="font-medium text-sm">{option.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-16 h-16 rounded-full bg-green-500 shadow-xl flex items-center justify-center text-white"
        aria-expanded={isExpanded}
        aria-haspopup="menu"
        aria-label={isExpanded ? 'Close WhatsApp options' : 'Open WhatsApp chat'}
      >
        {/* Pulsing attention ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40" aria-hidden="true" />
        <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="relative z-10">
          <FaWhatsapp size={28} aria-hidden="true" />
        </motion.span>
      </motion.button>
    </div>
  );
}