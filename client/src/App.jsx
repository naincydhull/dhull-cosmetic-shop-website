import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminOrders from './pages/AdminOrders';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Make close function globally accessible for OrderForm
  if (typeof window !== 'undefined') {
    window.__CART_DRAWER_CLOSE__ = () => setIsCartOpen(false);
  }

  return (
    <CartProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<div />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin-orders" element={<AdminOrders />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <WhatsAppFloat />
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