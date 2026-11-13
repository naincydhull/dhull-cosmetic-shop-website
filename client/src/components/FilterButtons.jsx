import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const categories = [
  'All',
  'Skincare',
  'Makeup',
  'Haircare',
  'Fragrance',
  'Nail Products',
];

export default function FilterButtons({ activeCategory, onCategoryChange }) {
  const [activeIndex, setActiveIndex] = useState(categories.indexOf(activeCategory));

  const handleKeyDown = useCallback((e, index) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % categories.length;
      setActiveIndex(next);
      onCategoryChange(categories[next]);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + categories.length) % categories.length;
      setActiveIndex(prev);
      onCategoryChange(categories[prev]);
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCategoryChange(categories[index]);
    }
  }, [onCategoryChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap gap-3 justify-center mb-10"
      role="radiogroup"
      aria-label="Product categories"
    >
      {categories.map((category, index) => {
        const isActive = activeCategory === category;
        return (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'bg-rose-500 text-cream-50 shadow-lg shadow-rose-500/30'
                : 'bg-cream-200 text-charcoal-700 border border-blush-200 hover:border-rose-300 hover:text-rose-600 hover:shadow-md'
            }`}
            aria-checked={isActive}
            role="radio"
          >
            {category}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
