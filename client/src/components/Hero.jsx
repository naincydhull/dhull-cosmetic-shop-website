import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiClock, FiPhone, FiMapPin, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { heroSlides } from '../data/images';

const WHATSAPP_LINK = `https://wa.me/918053224896?text=${encodeURIComponent("Hello! I'd like to know more about your products.")}`;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const sparkles = [
  { className: 'top-[18%] left-[12%]', size: 22, delay: 0 },
  { className: 'top-[42%] right-[14%]', size: 14, delay: 1.2 },
  { className: 'bottom-[22%] left-[22%]', size: 16, delay: 2.1 },
  { className: 'top-[26%] right-[30%]', size: 12, delay: 0.7 },
  { className: 'bottom-[30%] right-[38%]', size: 20, delay: 1.8 },
];

export default function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goToSlide = (index) => setSlideIndex((index + heroSlides.length) % heroSlides.length);
  const nextSlide = () => goToSlide(slideIndex + 1);
  const prevSlide = () => goToSlide(slideIndex - 1);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, slideIndex]);

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-black min-h-[400px] sm:min-h-[450px] lg:min-h-[450px] max-h-[500px] sm:max-h-[550px] lg:max-h-[600px] min-h-[55vh] sm:min-h-[60vh] lg:min-h-[65vh] max-h-[65vh] sm:max-h-[70vh] lg:max-h-[75vh]">
      {/* Photo carousel background (auto-fade every 4s) */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[slideIndex].url}
              alt={heroSlides[slideIndex].alt}
              className="w-full h-full object-cover object-center brightness-[1.1]"
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                e.currentTarget.src = heroSlides[0].url;
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Left / right arrows */}
        <button
          type="button"
          onClick={prevSlide}
          className="group absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/30 text-cream-50 hover:bg-gold-500 hover:text-[#6B1030] border border-white/25 backdrop-blur-sm transition-all"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="group absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/30 text-cream-50 hover:bg-gold-500 hover:text-[#6B1030] border border-white/25 backdrop-blur-sm transition-all"
          aria-label="Next slide"
        >
          <FiChevronRight size={24} aria-hidden="true" />
        </button>

        {/* Light dark gradient overlay so all text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/55" />

        {/* Floating sparkles */}
        {sparkles.map((sparkle, i) => (
          <motion.div
            key={i}
            className={`absolute text-gold-300 ${sparkle.className}`}
            animate={{ y: [0, -18, 0], rotate: [0, 30, 0], opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: sparkle.delay }}
          >
            <FiStar size={sparkle.size} aria-hidden="true" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-10 lg:py-12 text-center">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 bg-cream-50/10 backdrop-blur-md border border-gold-300/40 px-4 py-2 rounded-full text-sm font-medium text-gold-200 mb-7 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" aria-hidden="true" />
            Harshola, Kaithal, Haryana
          </motion.span>

          <motion.h1
            variants={item}
            className="font-heading font-bold text-cream-50 text-3xl sm:text-4xl lg:text-5xl leading-[1.05] drop-shadow-xl"
          >
            Dhull Cosmetic
            <span className="block bg-gradient-to-r from-gold-200 via-gold-400 to-gold-300 bg-clip-text text-transparent">
              Shop
            </span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mx-auto my-4 flex items-center justify-center gap-2"
            aria-hidden="true"
          >
            <span className="h-px w-16 bg-gold-400/70" />
            <span className="text-gold-400 text-lg">✦</span>
            <span className="h-px w-16 bg-gold-400/70" />
          </motion.div>

          <motion.p
            variants={item}
            className="font-heading text-lg sm:text-xl lg:text-2xl font-semibold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Beauty That Makes You Shine
          </motion.p>

          <motion.p
            variants={item}
            className="mt-1 text-sm sm:text-base text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] max-w-xl mx-auto text-balance"
          >
            Premium cosmetics at best prices — genuine skincare, makeup, haircare and fragrance for your family.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-4 flex flex-col sm:flex-row gap-2 justify-center"
          >
            <Link to="/products" className="btn-gold">
              <FiShoppingBag className="mr-2" aria-hidden="true" />
              Shop Now
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-secondary !border-gold-300 !text-gold-200 hover:!bg-gold-500/20">
              <FaWhatsapp className="mr-2" aria-hidden="true" />
              WhatsApp Us
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]"
          >
            <span className="flex items-center gap-2">
              <FiClock className="text-gold-300" aria-hidden="true" /> 9 AM - 7 PM Daily
            </span>
            <span className="flex items-center gap-2">
              <FiPhone className="text-gold-300" aria-hidden="true" /> 8053224896
            </span>
            <span className="flex items-center gap-2">
              <FiMapPin className="text-gold-300" aria-hidden="true" /> Harshola, Kaithal
            </span>
          </motion.div>

          {/* Dot indicators */}
          <motion.div
            variants={item}
            className="mt-3 flex items-center justify-center gap-1.5"
          >
            {heroSlides.map((slide, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === slideIndex
                    ? 'w-7 bg-gold-400'
                    : 'w-2.5 bg-cream-50/50 hover:bg-gold-300/80'
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      </section>
  );
}