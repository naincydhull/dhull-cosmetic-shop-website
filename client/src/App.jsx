import { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import SchemaMarkup from './components/SchemaMarkup';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './components/Toast';

// Lazy load page components to reduce initial bundle
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminOrders = lazy(() => import('./pages/AdminOrders'));

// Lazy load heavy components
const Chatbot = lazy(() => import('./components/Chatbot'));

// Loading fallback for lazy pages
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-4 text-charcoal-500">
      <svg className="animate-spin w-10 h-10 text-rose-500" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <p className="text-sm">Loading…</p>
    </div>
  </div>
);

// Loading fallback for heavy components
const ComponentLoading = () => (
  <div className="fixed bottom-6 right-6">
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-600 to-plum-800 animate-pulse shadow-xl ring-4 ring-gold-400/60" />
  </div>
);

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Make open/close functions globally accessible
  if (typeof window !== 'undefined') {
    window.__CART_DRAWER_OPEN__ = () => setIsCartOpen(true);
    window.__CART_DRAWER_CLOSE__ = () => setIsCartOpen(false);
  }

  return (
    <CartProvider>
      <ToastProvider>
      <div className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SchemaMarkup />
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
            <AnimatePresence mode="wait">
              <Suspense fallback={<PageLoading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about-us" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/cart" element={<div />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact-us" element={<Contact />} />
                  <Route path="/admin" element={<AdminOrders />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin-orders" element={<AdminOrders />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>
          <Footer />
          <WhatsAppFloat />
          <Suspense fallback={<ComponentLoading />}>
            <Chatbot />
          </Suspense>
          <ScrollToTop />
          <AnimatePresence>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </AnimatePresence>
        </div>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;