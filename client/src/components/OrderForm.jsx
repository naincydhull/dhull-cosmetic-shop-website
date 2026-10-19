import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';

export default function OrderForm({ onClose }) {
  const { cartItems, clearCart } = useCart();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Enter a valid 10-digit phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('submitting');

    try {
      // Build WhatsApp message
      const message = buildWhatsAppMessage();
      const whatsappUrl = `https://wa.me/918053224896?text=${encodeURIComponent(message)}`;
      
      // Send to backend
      await sendOrderToBackend(message);
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Show success
      setSubmitStatus('success');
      addToast('Order sent to shop!', 'success');
      clearCart();
      
      // Close drawer after delay
      setTimeout(() => {
        if (window.__CART_DRAWER_CLOSE__) window.__CART_DRAWER_CLOSE__();
      }, 2000);
    } catch (err) {
      console.error('Order submission failed:', err);
      setSubmitStatus('error');
      addToast('Failed to send order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildWhatsAppMessage = () => {
    let message = '🛍️ *New Order - Dhull Cosmetic Shop*\n\n';
    message += `👤 Name: ${formData.name}\n`;
    message += `📞 Phone: ${formData.phone}\n`;
    if (formData.address.trim()) {
      message += `📍 Address: ${formData.address}\n`;
    }
    message += '\n*Products:*\n';
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.category}) - Qty: ${item.quantity}\n`;
    });
    
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    message += `\nTotal Items: ${totalItems}`;
    
    if (formData.note.trim()) {
      message += `\nNote: ${formData.note}`;
    }
    
    return message;
  };

  const sendOrderToBackend = async (message) => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          note: formData.note,
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          quantity: item.quantity,
        })),
        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        message,
        createdAt: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save order');
    }
    
    return response.json();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      <div className="bg-white rounded-xl p-5 border border-blush-100 shadow-sm">
        <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Send Order on WhatsApp
        </h3>
        
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700"
            role="alert"
          >
            <FiCheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium">Aapka order shop tak bhej diya gaya hai!</p>
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700"
            role="alert"
          >
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium">Failed to send order. Please try again.</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="label-field">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? 'border-rose-500' : ''}`}
              placeholder="Aapka naam"
              required
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                id="name-error"
                className="mt-1 text-sm text-rose-500"
                role="alert"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="label-field">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`input-field ${errors.phone ? 'border-rose-500' : ''}`}
              placeholder="10-digit phone number"
              maxLength={10}
              required
              disabled={isSubmitting}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                id="phone-error"
                className="mt-1 text-sm text-rose-500"
                role="alert"
              >
                {errors.phone}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="label-field">Address / Village (Optional)</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
              placeholder="Aapka pata ya gaon"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="note" className="label-field">Note (Optional)</label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              className="input-field"
              placeholder="Koi special instruction ya note..."
              disabled={isSubmitting}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FiSend size={18} aria-hidden="true" />
                Send Order on WhatsApp
              </span>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}