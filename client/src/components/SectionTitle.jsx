import * as fm from 'framer-motion';

export default function SectionTitle({ 
  title, 
  subtitle, 
  centered = true, 
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  level = 2
}) {
  const Tag = level === 1 ? 'h1' : level === 3 ? 'h3' : level === 4 ? 'h4' : level === 5 ? 'h5' : level === 6 ? 'h6' : 'h2';

  return (
    <fm.motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`section-title px-2 ${centered ? 'text-center' : ''} ${titleClassName} ${className}`}
    >
      <Tag className={`${titleClassName} ${centered ? 'mx-auto' : ''}`}>{title}</Tag>
      {subtitle && (
        <fm.motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`section-subtitle px-2 ${centered ? 'mx-auto' : ''} ${subtitleClassName}`}
        >
          {subtitle}
        </fm.motion.p>
      )}
    </fm.motion.div>
  );
}
