import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const categoryIcons = {
  Skincare: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  Makeup: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <ellipse cx="12" cy="14" rx="3" ry="4" />
      <path d="M9 14h6" />
    </svg>
  ),
  Haircare: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <path d="M12 6v6" />
      <path d="M9 10h6" />
      <path d="M9 14h6" />
    </svg>
  ),
  Fragrance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <path d="M12 6v2" />
      <path d="M12 16v2" />
      <path d="M8 12h8" />
      <path d="M8 18h8" />
    </svg>
  ),
  'Nail Products': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
      <ellipse cx="12" cy="12" rx="2" ry="3" />
    </svg>
  ),
  More: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  ),
};

const categoryColors = {
  Skincare: 'from-rose-300 to-rose-600',
  Makeup: 'from-gold-300 to-gold-600',
  Haircare: 'from-gold-500 to-rose-600',
  Fragrance: 'from-rose-500 to-gold-600',
  'Nail Products': 'from-gold-400 to-rose-700',
  More: 'from-charcoal-400 to-charcoal-600',
};

export default function CategoryCard({ category, productCount, index = 0, onClick }) {
  const Icon = categoryIcons[category] || categoryIcons.More;
  const gradient = categoryColors[category] || categoryColors.More;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative group card-base p-6 sm:p-8 text-center overflow-hidden hover:border-rose-200"
    >
      <div className="relative z-10">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {Icon}
        </div>
        <h3 className="font-heading text-xl font-semibold text-charcoal-900 mb-2">
          {category}
        </h3>
        <p className="text-sm text-charcoal-500 mb-4">
          {productCount} products available
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 group-hover:gap-2 transition-all duration-300">
          Explore
          <FiArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </motion.button>
  );
}