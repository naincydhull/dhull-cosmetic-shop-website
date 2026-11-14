import { useEffect, useRef } from 'react';
import * as fm from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import CartItem from './CartItem';
import OrderForm from './OrderForm';

const MotionButton = fm.motion('button');
const { AnimatePresence } = fm;

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, totalItems, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const { addToast } = useToast();
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      const dialog = dialogRef.current;
      if (dialog) {
        dialog.focus();
      }
    } else {
      document.body.style.overflow = '';
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
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

  const subtotal = 0;

  const cartItemsList = cartItems.map((item, index) => (
    <CartItem
      key={item.id}
      item={item}
      index={index}
      onIncrease={() => increaseQty(item.id)}
      onDecrease={() => decreaseQty(item.id)}
      onRemove={() => removeFromCart(item.id)}
    />
  ));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <fm.motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <fm.motion.aside
        ref={dialogRef}
        tabIndex={-1}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-cream-50 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-blush-100 bg-cream-100 sticky top-0 z-10">
          <fm.motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-lg sm:text-xl font-semibold text-charcoal-900"
            id="cart-drawer-title"
          >
            Aapka Cart ({totalItems} items)
          </fm.motion.h2>
          <MotionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-charcoal-500 hover:bg-blush-200 hover:text-rose-600 transition-colors"
            aria-label="Close cart"
          >
            <FiX size={22} aria-hidden="true" />
          </MotionButton>
        </div>

        <fm.motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4"
        >
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <fm.motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-blush-100 flex items-center justify-center mb-4"
              >
                <svg className="w-10 h-10 text-blush-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2v-4" />
                </svg>
              </fm.motion.div>
              <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-2">Cart khali hai</h3>
              <p className="text-charcoal-500 text-sm mb-6">Kuch products add karke shopping shuru karein</p>
              <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/products'}
                className="btn-gold"
              >
                Browse Products
              </MotionButton>
            </div>
          ) : (
            <div>
              <div className="space-y-3" role="list" aria-label="Cart items">
                {cartItemsList}
              </div>

              <div className="pt-4 border-t border-blush-100">
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearCart}
                  className="w-full py-3 rounded-lg bg-cream-200 text-charcoal-600 font-medium hover:bg-blush-200 hover:text-rose-600 transition-colors"
                >
                  Clear Cart
                </MotionButton>
              </div>

              <div className="mt-6 pt-6 border-t border-blush-100">
                <OrderForm onClose={onClose} />
              </div>
            </div>
          )}
        </fm.motion.div>
      </fm.motion.aside>
    </AnimatePresence>
  );
}