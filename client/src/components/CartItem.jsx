import { motion } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

export default function CartItem({ item, index, onIncrease, onDecrease, onRemove }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex gap-4 p-3 bg-cream-200/50 rounded-xl border border-blush-100"
      role="listitem"
    >
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-blush-50">
        <img
          src={item.image}
          alt={item.alt || item.name}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop';
          }}
        />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <h4 className="font-heading text-sm font-semibold text-charcoal-900 truncate">
          {item.name}
        </h4>
        <p className="text-xs text-charcoal-500 capitalize">{item.category}</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={onDecrease}
            className="w-8 h-8 rounded-lg bg-cream-100 flex items-center justify-center text-charcoal-600 hover:bg-blush-200 hover:text-rose-600 transition-colors"
            aria-label="Decrease quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-10 text-center font-semibold text-charcoal-900 bg-cream-100 rounded-lg py-1 text-sm">
            {item.quantity}
          </span>
          <button
            onClick={onIncrease}
            className="w-8 h-8 rounded-lg bg-rose-500 text-cream-50 flex items-center justify-center hover:bg-rose-600 transition-colors"
            aria-label="Increase quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      <button
        onClick={onRemove}
        className="flex-shrink-0 w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center text-charcoal-400 hover:bg-rose-100 hover:text-rose-600 transition-colors"
        aria-label="Remove from cart"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </motion.article>
  );
}