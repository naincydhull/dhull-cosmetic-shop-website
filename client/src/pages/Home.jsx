import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiMessageCircle, FiMapPin, FiClock,
  FiAward, FiTag, FiHeart, FiGrid, FiPhone
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import TestimonialSlider from '../components/TestimonialSlider';
import StatCounter from '../components/StatCounter';
import Hero from '../components/Hero';
import GoogleMap from '../components/GoogleMap';
import useProducts from '../hooks/useProducts';
import { heroImages, categoryImages } from '../data/images';
import { fadeUp, staggerContainer } from '../utils/animations';

const WHATSAPP_NUMBER = '918053224896';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to know more about your products.")}`;

const categories = [
  { name: 'Skincare', count: 7 },
  { name: 'Makeup', count: 7 },
  { name: 'Haircare', count: 6 },
  { name: 'Fragrance', count: 4 },
  { name: 'Nail Products', count: 4 },
  { name: 'More', count: 0 },
];

const whyChooseUs = [
  { icon: FiAward, title: 'Genuine Products', desc: 'We stock only authentic, quality-tested cosmetics from trusted suppliers.', color: 'from-rose-400 to-rose-600' },
  { icon: FiTag, title: 'Affordable Prices', desc: 'Premium beauty products at prices that fit every budget in our community.', color: 'from-gold-400 to-gold-600' },
  { icon: FiHeart, title: 'Trusted Local Shop', desc: 'Serving Harshola and Kaithal families with love for over a decade.', color: 'from-rose-300 to-rose-600' },
  { icon: FiGrid, title: 'Wide Variety', desc: '500+ products across skincare, makeup, haircare, fragrance and nails.', color: 'from-gold-500 to-gold-700' },
];

const stats = [
  { value: '500', suffix: '+', label: 'Products in Store' },
  { value: '10', suffix: '+', label: 'Years of Trust' },
  { value: '5000', suffix: '+', label: 'Happy Customers' },
  { value: '9-7', suffix: '', label: 'Open Daily' },
];

export default function Home() {
  const { products } = useProducts({});
  const featured = products.slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <Hero />

      {/* STATS STRIP */}
      <section className="bg-cream-200 border-y border-blush-100">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <StatCounter value={stat.value} suffix={stat.suffix} delay={i * 150} />
                <p className="mt-2 text-sm font-medium text-charcoal-500 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section-padding bg-cream-200">
        <div className="container-custom">
          <SectionTitle
            title="Shop by Category"
            subtitle="Everything you need for your beauty routine, neatly organised."
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((cat, i) => (
              <Link key={cat.name} to={`/products?category=${encodeURIComponent(cat.name)}`} className="block">
                <CategoryCard category={cat.name} productCount={cat.count} index={i} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-padding bg-blush-50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionTitle
              title="Featured Products"
              subtitle="A handpicked selection of our customers' favourites."
              centered={false}
            />
            <Link to="/products" className="btn-secondary whitespace-nowrap self-center sm:self-auto">
              View All
              <FiArrowRight className="ml-2" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} variant="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding bg-cream-200">
        <div className="container-custom">
          <SectionTitle
            title="Why Choose Us"
            subtitle="More than a shop — a beauty partner you can rely on."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="card-base p-8 text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={28} aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal-900 mb-3">{item.title}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-gradient-to-br from-blush-100 via-cream-100 to-gold-50">
        <div className="container-custom">
          <SectionTitle
            title="What Our Customers Say"
            subtitle="Real words from real people in our community."
          />
          <div className="mt-12">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* TIMING & LOCATION */}
      <section className="section-padding bg-cream-200">
        <div className="container-custom">
          <SectionTitle
            title="Visit Us Today"
            subtitle="Find us in the heart of Harshola — we'd love to see you."
          />
          <div className="mt-12 grid lg:grid-cols-2 gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="card-base p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="text-rose-600" size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal-900">Address</h3>
                  <p className="text-charcoal-500 mt-1">Harshola, Kaithal, Haryana</p>
                </div>
              </div>
              <div className="card-base p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                  <FiClock className="text-gold-600" size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal-900">Opening Hours</h3>
                  <p className="text-charcoal-500 mt-1">Every day: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
              <div className="card-base p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FiPhone className="text-green-600" size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal-900">Contact</h3>
                  <a href="tel:+918053224896" className="text-charcoal-500 hover:text-rose-600 transition-colors mt-1 block">8053224896</a>
                </div>
              </div>
            </motion.div>

            <GoogleMap className="min-h-[360px] lg:min-h-full h-full" />
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={heroImages.cta}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 via-rose-800/85 to-plum-900/85" />
        </div>
        <div className="container-custom relative z-10 section-padding text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold"
          >
            Visit our shop or message us on WhatsApp
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-rose-100 max-w-2xl mx-auto"
          >
            Can't decide? Send us a message and we'll help you find exactly what you need.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <FaWhatsapp className="mr-2" aria-hidden="true" />
              Message on WhatsApp
            </a>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-rose-700 transition-all duration-300">
              <FiMessageCircle className="mr-2" aria-hidden="true" />
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}