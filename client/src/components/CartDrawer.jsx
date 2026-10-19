import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import CartItem from './CartItem';
import OrderForm from './OrderForm';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, totalItems, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const subtotal = 0; // No prices in this system

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-cream-50 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-blush-100 bg-cream-100 sticky top-0 z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-xl font-semibold text-charcoal-900"
          >
            Aapka Cart ({totalItems} items)
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-charcoal-500 hover:bg-blush-200 hover:text-rose-600 transition-colors"
            aria-label="Close cart"
          >
            <FiX size={22} aria-hidden="true" />
          </motion.button>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 overflow-y-auto p-5 space-y-4"
        >
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-blush-100 flex items-center justify-center mb-4"
              >
                <svg className="w-10 h-10 text-blush-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2v-4" />
                </svg>
              </motion.div>
              <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-2">Cart khali hai</h3>
              <p className="text-charcoal-500 text-sm mb-6">Kuch products add karke shopping shuru karein</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/products'}
                className="btn-gold"
              >
                Browse Products
              </motion.button>
            </div>
          ) : (
            <>
              <div className="space-y-3" role="list" aria-label="Cart items">
                {cartItems.map((item, index) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    index={index}
                    onIncrease={() => increaseQty(item.id)}
                    onDecrease={() => decreaseQty(item.id)}
                    onRemove={() => removeFromCart(item.id)}
                  />
                ))}
              </div>
              
              <div className="pt-4 border-t border-blush-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearCart}
                  className="w-full py-3 rounded-lg bg-cream-200 text-charcoal-600 font-medium hover:bg-blush-200 hover:text-rose-600 transition-colors"
                >
                  Clear Cart
                </motion.button>
              </div>
            </>
          )}

          {cartItems.length > 0 && (
            <OrderForm onClose={onClose} />
          )}
        </motion.div>
      </motion.aside>
    </AnimatePresence>
  );
}