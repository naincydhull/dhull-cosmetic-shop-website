import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/products', label: 'Products' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream-200/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <nav className="container-custom" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2" aria-label="Dhull Cosmetic Shop Home">
              <img
                src="/logo.svg"
                alt="Dhull Cosmetic Shop logo"
                width="40"
                height="40"
                className="w-9 h-9 lg:w-10 lg:h-10 object-contain"
              />
              <span className="font-heading text-xl lg:text-2xl font-semibold text-charcoal-900 hidden sm:block">
                Dhull Cosmetic Shop
              </span>
            </Link>

<div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-gold-600'
                      : 'text-charcoal-700 hover:text-rose-600'
                  }`}
                >
                  {link.label}
                  <motion.span
                    layoutId="underline"
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-gold-500 ${
                      location.pathname === link.path ? 'w-full' : 'w-0'
                    }`}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </Link>
              ))}
              <Link
                to="/products"
                className="hidden lg:inline-flex items-center justify-center px-8 py-3 bg-[#D4A24C] text-[#6B1030] font-semibold rounded-full hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300"
              >
                Shop Now
              </Link>
              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2 rounded-full text-charcoal-600 hover:text-rose-600 transition-colors"
                aria-label={`Cart (${totalItems} items)`}
              >
                <motion.div
                  animate={{ scale: totalItems > 0 ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiShoppingCart size={24} aria-hidden="true" />
                </motion.div>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-cream-50 text-[10px] font-bold flex items-center justify-center"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </motion.span>
                )}
              </Link>
            </div>

<div className="lg:hidden flex items-center gap-4">
              <Link
                to="/cart"
                className="relative p-2 rounded-lg text-charcoal-600 hover:text-rose-600 hover:bg-cream-200 transition-colors"
                aria-label={`Cart (${totalItems} items)`}
              >
                <FiShoppingCart size={24} aria-hidden="true" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-cream-50 text-[10px] font-bold flex items-center justify-center"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </motion.span>
                )}
              </Link>
              <button
                className="p-2 text-charcoal-700 hover:text-rose-600 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

<AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden bg-cream-200 border-t border-blush-100"
              >
                <div className="py-6 space-y-4 px-4">
                  <Link
                    to="/cart"
                    className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                      location.pathname === '/cart'
                        ? 'bg-rose-50 text-rose-600'
                        : 'text-charcoal-700 hover:bg-blush-50 hover:text-rose-600'
                    }`}
                  >
                    <span>Cart</span>
                    {totalItems > 0 && (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-cream-50 text-[10px] font-bold flex items-center justify-center">
                        {totalItems > 99 ? '99+' : totalItems}
                      </span>
                    )}
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'bg-rose-50 text-rose-600'
                          : 'text-charcoal-700 hover:bg-blush-50 hover:text-rose-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link to="/products" className="w-full text-center mt-4 inline-flex items-center justify-center px-8 py-3 bg-[#D4A24C] text-[#6B1030] font-semibold rounded-full hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300">
                    Shop Now
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  );
}


