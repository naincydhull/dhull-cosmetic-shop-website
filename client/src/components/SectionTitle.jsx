import { motion } from 'framer-motion';

export default function SectionTitle({ 
  title, 
  subtitle, 
  centered = true, 
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`section-title ${centered ? 'text-center' : ''} ${titleClassName} ${className}`}
    >
      {title}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`section-subtitle ${centered ? 'mx-auto' : ''} ${subtitleClassName}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}