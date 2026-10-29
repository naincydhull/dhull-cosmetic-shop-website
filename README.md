# Dhull Cosmetic Shop — Website

A modern, fully animated, multi-page website for **Dhull Cosmetic Shop** — a trusted local
beauty store in **Harsola, Kaithal, Haryana**.

> This site is for **display and enquiry only**: no cart, checkout, payment, or login.
> Customers browse products, add to an enquiry cart, and reach out via WhatsApp or phone.

> Theme: premium **Deep Maroon + Cream + Gold** luxury beauty look
> (dark maroon accents `#6B1030`, cream/ivory backgrounds, rich gold highlights `#D4A24C`).
> To restyle, edit `client/tailwind.config.js` colors.

---

## Tech Stack

| Layer     | Technology                                                    |
| --------- | ------------------------------------------------------------- |
| Frontend  | React 18 + Vite, React Router, Framer Motion, React Icons, Tailwind CSS |
| Backend   | Node.js + Express (REST API, product data from `products.json`) |
| Fonts     | Playfair Display (headings), Poppins (body)                    |
| Images    | Free Unsplash URLs (centralised in `client/src/data/images.js`) |

---

## Project Structure

```
.
├── package.json            # Root scripts (runs client + server together)
├── README.md
├── .gitignore
├── .env.example            # Environment variable template
├── server/                 # Express API
│   ├── server.js           # Routes: /api/products, /api/contact, /api/orders
│   ├── products.json       # 28 sample products
│   ├── messages.json       # Contact form messages
│   ├── orders.json         # Customer orders (enquiry cart)
│   └── package.json
└── client/                 # React + Vite frontend
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    ├── public/favicon.svg
    └── src/
        ├── components/     # Navbar, Footer, ProductCard, CartDrawer, CartItem, Toast, etc.
        ├── pages/          # Home, Products, Gallery, Contact, About, AdminOrders
        ├── hooks/          # useProducts
        ├── context/        # CartContext (cart state with localStorage)
        ├── data/           # images.js (all image URLs live here)
        ├── utils/          # animations.js
        ├── App.jsx
        └── main.jsx
```

---

## Getting Started

### 1. Install everything (root + server + client)

```bash
npm run install:all
```

*(Or manually: `npm install` in the root, then in `server/`, then in `client/`.)*

### 2. Configure environment variables

Copy `.env.example` to `.env` in the **server** folder:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and set your **ADMIN_KEY** (used to protect `/api/orders` and the admin page):

```env
PORT=3001
ADMIN_KEY=your-secure-random-key-here
```

### 3. Run the whole project (frontend + backend together)

```bash
npm run dev
```

Then open: **http://localhost:5173**

- Frontend (Vite): http://localhost:5173
- Backend (Express API): http://localhost:3001
- Vite proxies `/api/*` to the backend automatically.

---

## Available Scripts (root)

| Command               | What it does                                        |
| --------------------- | --------------------------------------------------- |
| `npm run install:all` | Installs root, server, and client dependencies      |
| `npm run dev`         | Runs server + client together (recommended)         |
| `npm run server`      | Runs only the Express backend                       |
| `npm run client`      | Runs only the Vite frontend                         |
| `npm run build`       | Builds the frontend for production                  |
| `npm start`           | Runs the backend which also serves the built client |

---

## Features

### 1. Product Browsing
- **Home page**: Hero carousel, stats strip, categories, featured products, why choose us, testimonials, timing & location, CTA banner
- **Products page**: Search, category filters, responsive grid of 28 products
- **Gallery page**: Lightbox gallery with 18 product images
- **About page**: Shop story, highlights, trust indicators
- **Contact page**: Contact form, map, timing, phone, WhatsApp

### 2. Enquiry Cart (New!)
- **Add to Cart** button on every product card (Home + Products page)
- **Quantity stepper** on the card when item is in cart (− / +)
- **Cart icon** in Navbar with live count badge and bounce animation
- **Slide-in Cart Drawer** (right side, Framer Motion) with:
  - Item thumbnails, name, category
  - Quantity stepper (− / +) and remove button per item
  - "Clear Cart" button
  - Empty state with "Browse Products" link
- **Order Form** in drawer:
  - Name (required), Phone (required, 10-digit validation)
  - Address (optional), Note (optional)
  - "Send Order on WhatsApp" button
- **No prices, no payment, no login** — purely an enquiry/order list

### 3. Order Processing
- **WhatsApp Integration**: Opens `https://wa.me/918053224896` with pre-filled message containing:
  - Customer name, phone, address
  - Complete product list with categories and quantities
  - Total item count
  - Optional note
- **Backend API** (`POST /api/orders`): Saves order to `server/orders.json`
- **Admin Orders Page** (`/admin-orders`):
  - Protected by `ADMIN_KEY` (from `.env`)
  - Lists all orders newest first
  - Customer name, phone, date, product list with quantities
  - **Call** button (tel:) and **Reply on WhatsApp** button per order
  - Not linked in public navbar

### 4. Design & Animations
- Deep Maroon + Cream + Gold theme
- Playfair Display headings, Poppins body
- Framer Motion animations throughout
- Fully responsive (mobile, tablet, desktop)
- Accessible: ARIA labels, focus trap in drawer, body scroll lock

---

## API Endpoints

| Method | Endpoint                          | Description                              |
| ------ | --------------------------------- | ---------------------------------------- |
| GET    | `/api/products`                   | Get all products                         |
| GET    | `/api/products?category=Skincare` | Filter products by category              |
| GET    | `/api/products?search=serum`      | Search products by name/description      |
| GET    | `/api/products/:id`               | Get a single product by ID               |
| POST   | `/api/contact`                    | Save a contact form message              |
| POST   | `/api/orders`                     | Save a new order (enquiry cart)          |
| GET    | `/api/orders`                     | Get all orders (requires `ADMIN_KEY`)    |

Contact messages → `server/messages.json`  
Orders → `server/orders.json`

---

## Shop Information

- **Name:** Dhull Cosmetic Shop
- **Address:** Harsola, Kaithal, Haryana
- **Phone / WhatsApp:** 8053224896
- **Timing:** 9:00 AM – 7:00 PM (daily)
- **Categories:** Skincare, Makeup, Haircare, Fragrance, Nail Products, and more

---

## Replacing Images

All image URLs are centralised in **`client/src/data/images.js`** (hero, category, and gallery)
and in **`server/products.json`** (product images). Swap the URLs there — no other code changes needed.

---

## Production Build

```bash
npm run build     # builds client into client/dist
npm start         # Express serves the built site + API on http://localhost:3001
```

---

## .env Configuration

Create `server/.env` from `.env.example`:

```env
PORT=3001
ADMIN_KEY=your-secure-random-key-here
```

| Variable   | Required | Description                                        |
| ---------- | -------- | -------------------------------------------------- |
| `PORT`     | No       | Backend port (default 3001)                        |
| `ADMIN_KEY`| **Yes**  | Secret key to protect `/api/orders` and admin page |

**Important:** Use a strong random string for `ADMIN_KEY` in production.

---

## Environment Files

```
server/.env.example   # Template (commit to git)
server/.env           # Actual config (DO NOT commit, in .gitignore)
```