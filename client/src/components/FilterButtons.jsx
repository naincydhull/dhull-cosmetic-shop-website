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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap gap-3 justify-center mb-10"
      role="group"
      aria-label="Product categories"
    >
      {categories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-rose-500 text-cream-50 shadow-lg shadow-rose-500/30'
              : 'bg-cream-200 text-charcoal-700 border border-blush-200 hover:border-rose-300 hover:text-rose-600 hover:shadow-md'
          }`}
          aria-pressed={activeCategory === category}
          role="radio"
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}