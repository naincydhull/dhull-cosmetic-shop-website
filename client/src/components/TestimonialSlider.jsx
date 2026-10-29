import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Kaithal',
    rating: 5,
    text: 'Absolutely love this shop! The variety is amazing and the prices are so reasonable. Found my holy grail moisturizer here. The owner is very helpful and knowledgeable about products.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Anita Devi',
    location: 'Harsola',
    rating: 5,
    text: 'Been shopping here for years. Best place in the area for all beauty needs - from daily skincare to special occasion makeup. Always fresh stock and genuine products. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Ritu Singh',
    location: 'Kaithal',
    rating: 4,
    text: 'Great local shop with surprisingly good collection. The haircare section is my favorite - they have brands I can\'t find anywhere else nearby. Friendly service and fair prices.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const current = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center"
        >
          <div className="inline-flex gap-1 mb-6" aria-label={`${current.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar
                key={i}
                size={20}
                className={i < current.rating ? 'text-gold-500 fill-current' : 'text-charcoal-700'}
                aria-hidden="true"
              />
            ))}
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <FaQuoteLeft className="absolute -top-8 left-1/2 -translate-x-1/2 text-rose-300/30 text-5xl" aria-hidden="true" />
            <p className="text-lg sm:text-xl text-charcoal-600 leading-relaxed max-w-3xl mx-auto relative z-10">
              &ldquo;{current.text}&rdquo;
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex items-center justify-center gap-4"
          >
            <img
              src={current.avatar}
              alt=""
              className="w-12 h-12 rounded-full object-cover border-2 border-rose-200"
              aria-hidden="true"
            />
            <div className="text-left">
              <p className="font-heading font-semibold text-charcoal-900">{current.name}</p>
              <p className="text-sm text-charcoal-500">{current.location}</p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-rose-500 w-8' : 'bg-blush-300 hover:bg-rose-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          className="w-12 h-12 rounded-full bg-cream-200 border border-blush-200 flex items-center justify-center text-charcoal-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 shadow-md transition-all duration-300"
          aria-label="Previous testimonial"
        >
          <FiChevronLeft size={20} aria-hidden="true" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          className="w-12 h-12 rounded-full bg-cream-200 border border-blush-200 flex items-center justify-center text-charcoal-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 shadow-md transition-all duration-300"
          aria-label="Next testimonial"
        >
          <FiChevronRight size={20} aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  );
}