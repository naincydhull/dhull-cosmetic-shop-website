import { motion } from 'framer-motion';
import AboutSection from '../components/About';

export default function About() {
  return (
    <div>
      {/* PAGE HEADER / BANNER */}
      <section className="relative min-h-[300px] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=900&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover brightness-[0.4]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 via-rose-800/85 to-plum-900/85" />
        </div>
        <div className="container-custom relative z-10 py-20 lg:py-28 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-rose-100 max-w-2xl mx-auto"
          >
            Discover our journey from a small village counter to Kaithal's trusted beauty destination
          </motion.p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <AboutSection />
    </div>
  );
}