import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SchemaMarkup() {
  const location = useLocation();

  useEffect(() => {
    // Remove existing page-specific schema
    const existingSchema = document.querySelector('script[data-schema="page"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    let schema = null;

    if (location.pathname === '/' || location.pathname === '') {
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Dhull Cosmetic Shop",
        "url": "https://dhull-cosmetic-shop-website.vercel.app/",
        "description": "Best cosmetic store in Harsola, Kaithal, Haryana offering skincare, makeup, haircare, fragrance and nail products",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://dhull-cosmetic-shop-website.vercel.app/products?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };
    } else if (location.pathname === '/products') {
      schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Cosmetic Products - Dhull Cosmetic Shop",
        "description": "Browse our wide range of skincare, makeup, haircare, fragrance & nail products",
        "url": "https://dhull-cosmetic-shop-website.vercel.app/products"
      };
    } else if (location.pathname === '/about-us' || location.pathname === '/about') {
      schema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Us - Dhull Cosmetic Shop",
        "description": "Learn about Dhull Cosmetic Shop - Leading cosmetic store in Harsola, Kaithal, Haryana",
        "url": "https://dhull-cosmetic-shop-website.vercel.app/about-us"
      };
    } else if (location.pathname === '/contact-us' || location.pathname === '/contact') {
      schema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Us - Dhull Cosmetic Shop",
        "description": "Contact Dhull Cosmetic Shop in Harsola, Kaithal, Haryana. Call 8053224896",
        "url": "https://dhull-cosmetic-shop-website.vercel.app/contact-us"
      };
    } else if (location.pathname === '/gallery') {
      schema = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Store Gallery - Dhull Cosmetic Shop",
        "description": "Photo gallery of Dhull Cosmetic Shop store in Harsola, Kaithal",
        "url": "https://dhull-cosmetic-shop-website.vercel.app/gallery"
      };
    }

    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'page');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const schemaScript = document.querySelector('script[data-schema="page"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [location.pathname]);

  return null;
}
