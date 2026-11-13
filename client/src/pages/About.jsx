import * as fm from 'framer-motion';
import AboutSection from '../components/About';
import usePageMeta from '../hooks/usePageMeta';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const { motion } = fm;

export default function About() {
  usePageMeta({
    title: 'About Us',
    description: 'About Dhull Cosmetic Shop - Leading cosmetic store in Harsola, Kaithal, Haryana. Trusted for genuine beauty products, fair prices & quality service.',
    keywords: 'about dhull cosmetic shop, cosmetic store harsola kaithal, beauty shop haryana'
  });
  return (
    <div>
      {/* PAGE HEADER / BANNER */}
      <section className="relative min-h-[300px] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=900&fit=crop&q=80"
            alt="Dhull Cosmetic Shop Interior - Beauty Products Display Harsola Kaithal"
            className="w-full h-full object-cover brightness-[0.4]"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="1600"
            height="900"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 via-rose-800/85 to-plum-900/85" />
        </div>
        <div className="container-custom relative z-10 py-20 lg:py-28 text-center text-white">
          <fm.motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold"
          >
            About Us
          </fm.motion.h1>
          <fm.motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-white/80 text-lg"
          >
            Our story, values & commitment to beauty
          </fm.motion.p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <AboutSection />

      {/* CTA SECTION */}
      <section className="section-padding bg-cream-200">
        <div className="container-custom text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-charcoal-900 mb-4">
            Explore Our Beauty Products
          </h2>
          <p className="text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Discover our wide range of skincare, makeup, haircare and fragrance products at Dhull Cosmetic Shop.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              Browse Products
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/gallery" className="btn-secondary inline-flex items-center gap-2">
              View Gallery
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/contact-us" className="btn-gold inline-flex items-center gap-2">
              Contact Us
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}