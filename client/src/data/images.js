const img = (id, w = 1200, h = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=80&fm=webp`;

export const heroImages = {
  main: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=1200&fit=crop&q=80&fm=webp',
  about: '/images/about-section.webp',
  cta: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=900&fit=crop&q=80&fm=webp',
};

// Hero carousel slides — 8 unbranded cosmetic & beauty product shots (no brand names/logos),
// stored locally in /images/hero so links can never break
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
