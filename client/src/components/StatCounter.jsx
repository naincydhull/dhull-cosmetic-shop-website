import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Animates a number from 0 to `value` when it scrolls into view.
 * `value` may be a number ("500") or a literal string like "9-7" (rendered as-is).
 */
export default function StatCounter({ value, suffix = '', prefix = '', duration = 1800, delay = 0 }) {
  const raw = String(value);
  const numericTarget = Number(raw.replace(/[^0-9]/g, ''));
  const isPlainNumber = /^[0-9]+$/.test(raw) && numericTarget > 0;

  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !isPlainNumber) return;

    const startTime = Date.now();
    let frame;

    const animate = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));

      if (progress < 1) frame = requestAnimationFrame(animate);
      else setCount(numericTarget);
    };

    const timeout = setTimeout(animate, delay);
    return () => {
      clearTimeout(timeout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isVisible, isPlainNumber, numericTarget, duration, delay]);

  const displayValue = isPlainNumber ? `${prefix}${count}${suffix}` : raw;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="text-center"
    >
      <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text">
        {displayValue}
      </div>
    </motion.div>
  );
}