import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiYoutube, FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight } from 'react-icons/fi';

const shopInfo = {
  name: 'Dhull Cosmetic Shop',
  address: 'Harshola, Kaithal, Haryana',
  phone: '8053224896',
  whatsapp: '8053224896',
  timing: '9:00 AM - 7:00 PM',
};

const footerLinks = {
  quick: [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ],
  categories: [
    { label: 'Skincare', path: '/products?category=Skincare' },
    { label: 'Makeup', path: '/products?category=Makeup' },
    { label: 'Haircare', path: '/products?category=Haircare' },
    { label: 'Fragrance', path: '/products?category=Fragrance' },
    { label: 'Nail Products', path: '/products?category=Nail Products' },
  ],
  support: [
    { label: 'About Us', path: '/' },
    { label: 'Visit Store', path: '/contact' },
    { label: 'WhatsApp Us', path: 'https://wa.me/918053224896' },
    { label: 'Call Us', path: 'tel:+918053224896' },
  ],
};

const socialLinks = [
  { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FiYoutube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-plum-900 text-cream-50" role="contentinfo">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6" aria-label="Dhull Cosmetic Shop Home">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gold-300" aria-hidden="true">
                <rect width="40" height="40" rx="12" fill="currentColor"/>
                <path d="M20 10C16.6863 10 14 12.6863 14 16C14 18.2091 15.7909 20 18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.6569 17.3431 21 19 21C20.1046 21 21 20.1046 21 19C21 17.8954 20.1046 17 19 17C19.5523 17 20 16.5523 20 16C20 12.6863 17.3137 10 20 10Z" fill="#0a0a0a"/>
                <ellipse cx="20" cy="30" rx="7" ry="3" fill="#0a0a0a" opacity="0.3"/>
              </svg>
              <span className="font-heading text-2xl font-semibold">Dhull Cosmetic Shop</span>
            </Link>
            <p className="text-charcoal-300 text-sm leading-relaxed mb-6 max-w-xs">
              Your trusted local beauty destination in Harshola, Kaithal. Offering quality skincare, makeup, haircare, fragrance & nail products at affordable prices since 2010.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-charcoal-300 hover:text-gold-300 hover:bg-white/10 transition-all duration-300"
                >
                  <social.icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.quick.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-charcoal-300 hover:text-rose-300 text-sm transition-colors flex items-center gap-2"
                  >
                    {link.label}
                    <FiArrowRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.categories.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-charcoal-300 hover:text-rose-300 text-sm transition-colors flex items-center gap-2"
                  >
                    {link.label}
                    <FiArrowRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Visit Us</h3>
            <address className="not-italic space-y-4 text-charcoal-300 text-sm">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-gold-300 mt-1 flex-shrink-0" aria-hidden="true" />
                <span>{shopInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-gold-300 flex-shrink-0" aria-hidden="true" />
                <a href={`tel:+91${shopInfo.phone}`} className="hover:text-rose-300 transition-colors">{shopInfo.phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-gold-300 flex-shrink-0" aria-hidden="true" />
                <a href={`https://wa.me/91${shopInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-rose-300 transition-colors">WhatsApp Us</a>
              </div>
              <div className="flex items-center gap-3">
                <FiClock className="text-gold-300 flex-shrink-0" aria-hidden="true" />
                <span>{shopInfo.timing}</span>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-charcoal-500 text-sm">
            © {new Date().getFullYear()} Dhull Cosmetic Shop. All rights reserved.
          </p>
          <p className="text-charcoal-500 text-sm">
            Made with <span className="text-gold-300">♥</span> for our community
          </p>
        </div>
      </div>
    </footer>
  );
}