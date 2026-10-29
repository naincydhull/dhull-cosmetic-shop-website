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
  'Nail Products': 'https://images.unsplash.com/photo-1599951705018-ec443b7e0b2c?w=600&h=600&fit=crop&q=80&fm=webp',
  More: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop&q=80&fm=webp',
};

export const galleryImages = [
  { url: img('photo-1522335789203-aabd1fc54bc9', 900, 1200), alt: 'Assorted cosmetics flat lay on pink background' },
  { url: img('photo-1556228578-8c89e6adf883', 900, 900), alt: 'White skincare bottles lined up neatly' },
  { url: img('photo-1586495777744-4413f21062fa', 900, 1200), alt: 'Red lipstick with makeup brushes' },
  { url: img('photo-1541643600914-78b084683601', 900, 900), alt: 'Perfume bottle with soft floral backdrop' },
  { url: img('photo-1599951705018-ec443b7e0b2c', 900, 1200), alt: 'Colorful nail polish bottles collection' },
  { url: img('photo-1535585209827-a15fcdbc4c2d', 900, 900), alt: 'Hair care products with argan oil' },
  { url: img('photo-1571781926291-c477ecdf0779', 900, 1200), alt: 'Moisturizer jars and cosmetics on marble' },
  { url: img('photo-1596462502278-27bfdc403348', 900, 900), alt: 'Makeup brushes and eyeshadow palette' },
  { url: img('photo-1620916566398-39f1143ab7be', 900, 1200), alt: 'Serum dropper bottle with fresh green leaves' },
  { url: img('photo-1608248597279-f99d160bfcbc', 900, 900), alt: 'Face mask treatment being applied' },
  { url: img('photo-1612817288484-6f916006741a', 900, 1200), alt: 'Pink beauty products arrangement' },
  { url: img('photo-1512496015851-a90fb38ba796', 900, 900), alt: 'Luxury beauty and spa products closeup' },
  { url: img('photo-1617897903246-719242758050', 900, 1200), alt: 'Cosmetic bottles and tubes on peach background' },
  { url: img('photo-1598440945508-2e4b5b8e8f5b', 900, 900), alt: 'Rose water toner with petals' },
  { url: img('photo-1631729371254-42c2892f0e6e', 900, 1200), alt: 'Skincare set with towel and flowers' },
  { url: img('photo-1503236823255-94609f598e71', 900, 900), alt: 'Beauty store display with products' },
];

export const whyChooseIcons = {
  genuine: 'genuine',
  affordable: 'affordable',
  trusted: 'trusted',
  variety: 'variety',
};
