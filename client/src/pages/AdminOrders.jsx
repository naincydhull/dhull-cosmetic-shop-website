import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiEye, FiLock, FiUnlock, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import { useToast } from '../components/Toast';

export default function AdminOrders() {
  const { addToast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const [key, setKey] = useState('');
  const [keyError, setKeyError] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setKeyError('');
    if (!key.trim()) {
      setKeyError('Please enter the admin key');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${key.trim()}` },
      });

      if (response.status === 401 || response.status === 403) {
        setKeyError('Invalid admin key');
        return;
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
      setAuthenticated(true);
    } catch (err) {
      console.error('Auth failed:', err);
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    if (!authenticated) return;
    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${key}` },
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error('Fetch orders failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [authenticated]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  };

  const callPhone = (phone) => {
    window.open(`tel:${phone.replace(/\D/g, '')}`, '_self');
  };

  const whatsappReply = (phone, customerName) => {
    const message = encodeURIComponent(`Hi ${customerName}, thank you for your order from Dhull Cosmetic Shop!`);
    window.open(`https://wa.me/91${phone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  if (!authenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blush-100 via-cream-100 to-gold-50 px-4 py-12"
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-blush-100">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mx-auto mb-4"
            >
              <FiLock className="w-8 h-8 text-rose-500" aria-hidden="true" />
            </motion.div>
            <h1 className="font-heading text-2xl font-bold text-charcoal-900">Admin Access</h1>
            <p className="text-charcoal-500 mt-2">Enter the admin key to view orders</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm"
            role="alert"
          >
            {error}
          </motion.div>
          )}

          <form onSubmit={handleAuth} className="space-y-4" noValidate>
            <div>
              <label htmlFor="admin-key" className="label-field">Admin Key</label>
              <input
                type="password"
                id="admin-key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className={`input-field ${keyError ? 'border-rose-500' : ''}`}
                placeholder="Enter admin key"
                required
                disabled={loading}
              />
              {keyError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-rose-500"
                  role="alert"
                >
                  {keyError}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading || !key.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FiUnlock size={18} aria-hidden="true" />
                  Access Orders
                </span>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-blush-100 via-cream-100 to-gold-50"
    >
      {/* Header */}
      <header className="bg-white border-b border-blush-100 sticky top-0 z-40">
        <div className="container-custom px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="p-2 rounded-lg bg-cream-200 text-charcoal-500 hover:bg-blush-200 hover:text-rose-600 transition-colors"
                aria-label="Back to shop"
              >
                <FiArrowLeft size={20} aria-hidden="true" />
              </motion.button>
              <div>
                <h1 className="font-heading text-xl font-bold text-charcoal-900">Admin Orders</h1>
                <p className="text-sm text-charcoal-500">Manage customer orders</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchOrders}
              disabled={loading}
              className="p-2 rounded-lg bg-cream-200 text-charcoal-500 hover:bg-blush-200 hover:text-rose-600 transition-colors disabled:opacity-50"
              aria-label="Refresh orders"
            >
              <FiRefreshCw className={loading ? 'animate-spin w-5 h-5' : 'w-5 h-5'} aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8 px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-charcoal-900">
              All Orders <span className="text-gold-500 font-normal">({orders.length})</span>
            </h2>
            <p className="text-charcoal-500 text-sm mt-1">Newest orders first</p>
          </div>
        </div>

        {loading && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-charcoal-400"
          >
            <svg className="animate-spin w-10 h-10 text-rose-500" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="mt-4">Loading orders...</p>
          </motion.div>
        )}

        {orders.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-blush-100"
          >
            <svg className="w-16 h-16 text-blush-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2v-4" />
            </svg>
            <h3 className="font-heading text-xl font-semibold text-charcoal-900 mt-4">No orders yet</h3>
            <p className="text-charcoal-500 text-sm mt-2">Orders will appear here when customers place them</p>
          </motion.div>
        )}

        {orders.length > 0 && (
          <div className="space-y-4" role="list" aria-label="Orders">
            {orders.map((order, index) => (
              <motion.article
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-blush-100 shadow-sm hover:shadow-lg transition-shadow"
                role="listitem"
              >
                {/* Order Header */}
                <div className="p-5 border-b border-blush-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2v-4" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-heading font-semibold text-charcoal-900">Order #{order.id}</p>
                      <p className="text-sm text-charcoal-500">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 text-xs font-medium bg-gold-100 text-gold-700 rounded-full">
                      {order.totalItems} items
                    </span>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="p-5 border-b border-blush-100 bg-cream-50/50">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h18a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs text-charcoal-500 uppercase tracking-wide">Customer</p>
                        <p className="font-medium text-charcoal-900">{order.customer?.name || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                        <FiPhone className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs text-charcoal-500 uppercase tracking-wide">Phone</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => callPhone(order.customer?.phone || '')}
                          className="font-medium text-charcoal-900 hover:text-green-600 transition-colors"
                        >
                          {formatPhone(order.customer?.phone || '')}
                        </motion.button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <FiMail className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs text-charcoal-500 uppercase tracking-wide">Reply</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => whatsappReply(order.customer?.phone || '', order.customer?.name || '')}
                          className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          WhatsApp Reply
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="p-5 border-b border-blush-100">
                  <p className="font-medium text-charcoal-700 mb-3">Products</p>
                  <div className="space-y-2">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-blush-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop'}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                            loading="lazy"
                          />
                          <div>
                            <p className="font-medium text-sm text-charcoal-900">{item.name}</p>
                            <p className="text-xs text-charcoal-500 capitalize">{item.category}</p>
                          </div>
                        </div>
                        <span className="w-10 h-10 rounded-lg bg-cream-200 flex items-center justify-center font-semibold text-charcoal-900 text-sm">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-charcoal-500">Total Items: <span className="font-semibold text-charcoal-900">{order.totalItems}</span></span>
                    {order.customer?.note && (
                      <span className="text-sm text-charcoal-500 italic">Note: {order.customer.note}</span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>
    </motion.div>
  );
}