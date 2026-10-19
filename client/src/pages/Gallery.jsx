import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiZoomIn } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import Lightbox from '../components/Lightbox';
import { galleryImages } from '../data/images';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = useCallback((direction) => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      if (direction === 'next') return prev < galleryImages.length - 1 ? prev + 1 : prev;
      return prev > 0 ? prev - 1 : prev;
    });
  }, []);

  return (
    <PageTransition>
      <section className="pt-12 pb-8 bg-gradient-to-br from-blush-100 via-cream-100 to-gold-50">
        <div className="container-custom text-center">
          <SectionTitle
            title="Our Gallery"
            subtitle="A glimpse of the beauty products waiting for you in store."
          />
        </div>
      </section>

      <section className="section-padding bg-cream-200">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]"
          >
            {galleryImages.map((image, index) => (
              <motion.button
                key={image.url}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                onClick={() => openLightbox(index)}
                className="group relative mb-4 block w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 break-inside-avoid"
                aria-label={`Open image: ${image.alt}`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-12 h-12 rounded-full bg-cream-200/90 backdrop-blur flex items-center justify-center text-rose-600 shadow-lg">
                    <FiZoomIn size={22} aria-hidden="true" />
                  </span>
                </div>
                <p className="absolute bottom-3 left-3 right-3 text-left text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {image.alt}
                </p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigate}
        />
      )}
    </PageTransition>
  );
}