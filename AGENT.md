# AGENT.md - Dhull Cosmetic Shop Website

> Yeh file poori website ka complete context deti hai. Agar tum chaho to is file se hi koi bhi agent ko apni website samjha sakte ho.

## Project Overview

**Name:** Dhull Cosmetic Shop  
**Type:** E-commerce/Enquiry Website (Display + WhatsApp Enquiry only)  
**Location:** Harsola, Kaithal, Haryana  
**Purpose:** Local beauty & cosmetic store website for product display and customer enquiries via WhatsApp/Contact form

**Key Points:**
- No cart checkout, payment, login/authentication system
- Customers browse products and send enquiries via WhatsApp or contact form
- Cart system exists for collecting enquiry items (stored in localStorage)
- Admin panel at `/admin-orders` to view enquiries/orders
- Contact form messages saved to `server/messages.json` and emailed via Brevo
- Orders/enquiries saved to `server/orders.json`

## Tech Stack

### Frontend (client/)
- **Framework:** React 18 + Vite
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Icons:** React Icons (Fi*, Fa*)
- **State Management:** React Context API (CartContext)
- **Build Tool:** Vite 5

### Backend (server/)
- **Runtime:** Node.js
- **Framework:** Express.js
- **File Storage:** JSON files (`products.json`, `orders.json`, `messages.json`)
- **Email:** Brevo API (for contact form notifications)
- **AI Chatbot:** Groq API (optional)

### Deployment
- **Frontend:** Vercel (configured via `vercel.json`)
- **Backend:** Can run separately or integrated

## Project Structure

```
dhull-cosmetic-shop-website/
├── AGENT.md                 # This file
├── package.json             # Root scripts
├── README.md               # Project README
├── vercel.json             # Vercel config
├── .gitignore
├── client/                 # React frontend
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   ├── logo.svg
│   │   ├── favicon.svg
│   │   └── images/         # Static images
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── context/        # React contexts
│       ├── hooks/          # Custom hooks
│       ├── data/           # Static data
│       └── utils/          # Utilities
└── server/                 # Express backend
    ├── package.json
    ├── server.js
    ├── products.json       # Product catalog
    ├── orders.json         # Customer enquiries
    ├── messages.json       # Contact messages
    └── .env.example
```

## Color Theme

```css
/* Tailwind config colors */
Deep Maroon: #6B1030
Gold: #D4A24C
Cream/Ivory backgrounds
Blush accents
```

## Environment Variables

### Server (.env)
```env
PORT=3001
ADMIN_KEY=your-secure-admin-key
BREVO_API_KEY=your-brevo-api-key
NOTIFY_EMAIL=nancydhull72@gmail.com
SENDER_EMAIL=nancydhull72@gmail.com
SENDER_NAME=Dhull Cosmetic Shop
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=qwen/qwen3.8-27b
```

## Running the Project

```bash
# Install all dependencies
npm run install:all

# Run both client and server concurrently
npm run dev

# Run separately
npm run server  # Server on http://localhost:3001
npm run client  # Client on http://localhost:5173

# Build frontend
npm run build

# Start production
npm start
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products (filter by category/search) | None |
| GET | `/api/products/:id` | Get single product | None |
| POST | `/api/contact` | Submit contact form | None |
| POST | `/api/orders` | Submit enquiry/order | None |
| GET | `/api/orders` | Get all orders | ADMIN_KEY required |
| DELETE | `/api/orders/:id` | Delete order | ADMIN_KEY required |

## Features

### Frontend Features
- **Home Page** - Hero section, featured products, categories, testimonials, about preview
- **Products Page** - Product listing with category filters and search
- **Product Cards** - Add to cart, quantity management, WhatsApp enquiry
- **Cart Drawer** - Side drawer showing cart items, order form
- **Gallery** - Image gallery with lightbox (shop images only)
- **About Page** - Store information
- **Contact Page** - Contact form with map
- **Admin Orders** - View/manage enquiries (password protected)
- **Chatbot** - AI powered chatbot (Groq API)
- **WhatsApp Float Button** - Quick contact
- **Animations** - Smooth Framer Motion animations
- **Responsive Design** - Mobile, tablet, desktop

### Cart System
- Cart items stored in `localStorage` as `dhull-cart`
- Add to cart opens cart drawer automatically
- Can increase/decrease quantity or remove items
- Order form submits to `/api/orders`

## Key Files

### Root package.json
```json
{
  "name": "dhull-cosmetic-shop",
  "version": "1.0.0",
  "description": "Dhull Cosmetic Shop - Local beauty products website",
  "private": true,
  "scripts": {
    "postinstall": "npm --prefix server install && npm --prefix client install",
    "install:all": "npm install",
    "dev": "concurrently -n server,client -c blue,magenta \"npm --prefix server run dev\" \"npm --prefix client run dev\"",
    "server": "npm --prefix server run dev",
    "client": "npm --prefix client run dev",
    "build": "npm --prefix client run build",
    "start": "npm --prefix server start"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  },
  "engines": {
    "node": "24.x"
  }
}
```

### client/src/App.jsx
```jsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import Chatbot from './components/Chatbot';
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

  if (typeof window !== 'undefined') {
    window.__CART_DRAWER_OPEN__ = () => setIsCartOpen(true);
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
          <Chatbot />
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
```

### client/src/context/CartContext.jsx
```jsx
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'dhull-cart';

const initialState = {
  items: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    }
    case 'INCREASE_QTY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case 'DECREASE_QTY': {
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [state.items]);

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  }, []);

  const increaseQty = useCallback((id) => {
    dispatch({ type: 'INCREASE_QTY', payload: id });
  }, []);

  const decreaseQty = useCallback((id) => {
    dispatch({ type: 'DECREASE_QTY', payload: id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartItems = state.items;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
```

### client/src/data/images.js
```jsx
const img = (id, w = 1200, h = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=80&fm=webp`;

export const heroImages = {
  main: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=1200&fit=crop&q=80&fm=webp',
  about: '/images/about-section.webp',
  cta: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=900&fit=crop&q=80&fm=webp',
};

export const heroSlides = [
  { url: '/images/hero/hero1.webp', alt: 'Beauty and cosmetic products' },
  { url: '/images/hero/hero2.webp', alt: 'Beauty and cosmetic products' },
  { url: '/images/hero/hero3.webp', alt: 'Beauty and cosmetic products' },
  { url: '/images/hero/hero4.webp', alt: 'Beauty and cosmetic products' },
  { url: '/images/hero/hero5.webp', alt: 'Beauty and cosmetic products' },
  { url: '/images/hero/hero6.webp', alt: 'Beauty and cosmetic products' },
  { url: '/images/hero/hero7.webp', alt: 'Beauty and cosmetic products' },
  { url: '/images/hero/hero8.webp', alt: 'Beauty and cosmetic products' },
];

export const categoryImages = {
  Skincare: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&q=80&fm=webp',
  Makeup: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop&q=80&fm=webp',
  Haircare: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop&q=80&fm=webp',
  Fragrance: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop&q=80&fm=webp',
  'Nail Products': '/images/products/p21.webp',
  More: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop&q=80&fm=webp',
};

export const galleryImages = [
  { url: '/images/pic1.webp', alt: 'Cosmetics and beauty products displayed on the shop shelves' },
  { url: '/images/pic2.webp', alt: 'Dhull Cosmetic Shop entrance and storefront' },
  { url: '/images/pic3.webp', alt: 'Beauty and personal care products arranged on shop shelves' },
  { url: '/images/pic4.webp', alt: 'Products displayed on the shop shelves' },
  { url: '/images/pic5.webp', alt: 'Cosmetics and personal care products displayed in store' },
];

export const whyChooseIcons = {
  genuine: 'genuine',
  affordable: 'affordable',
  trusted: 'trusted',
  variety: 'variety',
};
```

## Notes

- Gallery ab sirf shop ki 5 images (pic1-pic5) dikhata hai
- Add to cart par cart drawer automatically khul jata hai
- Cart data localStorage mein save hota hai
- Products server se fetch hote hain (`/api/products`)
- WhatsApp number: `918053224896`
- Admin key required for `/admin-orders` page

## Last Updated
Based on git history and recent changes.
