import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setSubmitMessage(data.message || 'Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setSubmitMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label htmlFor="name" className="label-field">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-rose-500 focus:ring-rose-500' : ''}`}
            placeholder="Your name"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            disabled={status === 'submitting'}
          />
          {errors.name && (
            <motion.p id="name-error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-rose-500 flex items-center gap-1" role="alert">
              <FiAlertCircle size={14} aria-hidden="true" />
              {errors.name}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="label-field">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`input-field ${errors.phone ? 'border-rose-500 focus:ring-rose-500' : ''}`}
            placeholder="9876543210"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            disabled={status === 'submitting'}
          />
          {errors.phone && (
            <motion.p id="phone-error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-rose-500 flex items-center gap-1" role="alert">
              <FiAlertCircle size={14} aria-hidden="true" />
              {errors.phone}
            </motion.p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <label htmlFor="message" className="label-field">
          Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`input-field resize-y ${errors.message ? 'border-rose-500 focus:ring-rose-500' : ''}`}
          placeholder="Tell us how we can help you..."
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={status === 'submitting'}
        />
        {errors.message && (
          <motion.p id="message-error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-rose-500 flex items-center gap-1" role="alert">
            <FiAlertCircle size={14} aria-hidden="true" />
            {errors.message}
          </motion.p>
        )}
      </motion.div>

      {status !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-lg flex items-center gap-3 ${
            status === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
          role="alert"
        >
          {status === 'success' ? (
            <FiCheckCircle size={20} className="text-green-500 flex-shrink-0" aria-hidden="true" />
          ) : (
            <FiAlertCircle size={20} className="text-rose-500 flex-shrink-0" aria-hidden="true" />
          )}
          <p>{submitMessage}</p>
          {status === 'submitting' && <FiLoader size={20} className="animate-spin text-rose-500 ml-auto" aria-hidden="true" />}
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <FiLoader size={18} className="animate-spin mr-2" aria-hidden="true" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </motion.button>
    </form>
  );
}