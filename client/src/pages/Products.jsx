import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiLoader, FiPackage } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import FilterButtons from '../components/FilterButtons';
import useProducts from '../hooks/useProducts';

const WHATSAPP_NUMBER = '918053224896';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');

  const { products, loading, error } = useProducts({ category, search });

  useEffect(() => {
    const paramCategory = searchParams.get('category') || 'All';
    setCategory(paramCategory);
  }, [searchParams]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (newCategory === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: newCategory });
    }
  };

  const clearSearch = () => setSearch('');

  const resultText = useMemo(() => {
    if (loading) return 'Loading products…';
    const count = products.length;
    const label = count === 1 ? 'product' : 'products';
    if (search) return `${count} ${label} found for "${search}"`;
    if (category !== 'All') return `${count} ${label} in ${category}`;
    return `${count} ${label} available`;
  }, [loading, products.length, category, search]);

  return (
    <PageTransition>
      <section className="pt-12 pb-8 bg-gradient-to-br from-blush-100 via-cream-100 to-gold-50">
        <div className="container-custom text-center">
          <SectionTitle
            title="Our Products"
            subtitle="Browse our full collection of genuine beauty and personal care products."
          />
        </div>
      </section>

      <section className="section-padding bg-cream-200">
        <div className="container-custom">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto mb-8"
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" size={20} aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="input-field pl-12 pr-12"
                aria-label="Search products"
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-rose-600 transition-colors"
                  aria-label="Clear search"
                >
                  <FiX size={20} aria-hidden="true" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Filters */}
          <FilterButtons activeCategory={category} onCategoryChange={handleCategoryChange} />

          {/* Result count */}
          <p className="text-center text-sm text-charcoal-500 mb-8" aria-live="polite">
            {resultText}
          </p>

          {/* States */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-charcoal-400">
              <FiLoader size={40} className="animate-spin text-rose-500" aria-hidden="true" />
              <p className="mt-4">Loading products…</p>
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <p className="text-rose-600 font-medium">Could not load products.</p>
              <p className="text-charcoal-500 text-sm mt-2">{error}. Please make sure the server is running.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <FiPackage size={48} className="text-blush-300" aria-hidden="true" />
              <p className="mt-4 font-heading text-xl text-charcoal-700">No products found</p>
              <p className="text-charcoal-500 text-sm mt-2 max-w-sm">
                Try a different search term or category. Can't find what you're looking for? Ask us on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'm looking for a specific product.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                <FaWhatsapp className="mr-2" aria-hidden="true" />
                Ask on WhatsApp
              </a>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} variant="grid" />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center bg-blush-50 rounded-2xl p-8 sm:p-12"
            >
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-charcoal-900">
                Looking for something specific?
              </h3>
              <p className="text-charcoal-500 mt-3 max-w-xl mx-auto">
                We have many more products in store than shown online. Message us and we'll check availability for you.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'm looking for a specific product. Can you help?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                <FaWhatsapp className="mr-2" aria-hidden="true" />
                Ask on WhatsApp
              </a>
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}