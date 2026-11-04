import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function usePageMeta({ title, description, keywords } = {}) {
  const location = useLocation();
  
  useEffect(() => {
    const baseUrl = 'https://dhull-cosmetic-shop-website.vercel.app';
    const canonicalUrl = `${baseUrl}${location.pathname === '/' ? '' : location.pathname}`;

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const previousCanonical = canonical.getAttribute('href');
    canonical.setAttribute('href', canonicalUrl);

    // Update title
    const previousTitle = document.title;
    if (title) {
      document.title = `${title} | Dhull Cosmetic Shop - Harsola, Kaithal`;
    } else {
      document.title = 'Dhull Cosmetic Shop - Harsola, Kaithal';
    }

    // Update description
    let metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content');
    if (description && metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (keywords && metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Update og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    const previousOgTitle = ogTitle?.getAttribute('content');
    if (title && ogTitle) {
      ogTitle.setAttribute('content', `${title} | Dhull Cosmetic Shop - Harsola, Kaithal`);
    } else if (!title && ogTitle) {
      ogTitle.setAttribute('content', 'Dhull Cosmetic Shop - Harsola, Kaithal');
    }

    // Update og:description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    const previousOgDescription = ogDescription?.getAttribute('content');
    if (description && ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Update og:url
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    // Update twitter:title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const previousTwitterTitle = twitterTitle?.getAttribute('content');
    if (title && twitterTitle) {
      twitterTitle.setAttribute('content', `${title} | Dhull Cosmetic Shop - Harsola, Kaithal`);
    } else if (!title && twitterTitle) {
      twitterTitle.setAttribute('content', 'Dhull Cosmetic Shop - Harsola, Kaithal');
    }

    // Update twitter:description
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const previousTwitterDescription = twitterDescription?.getAttribute('content');
    if (description && twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (previousDescription && metaDescription) {
        metaDescription.setAttribute('content', previousDescription);
      }
      if (previousOgTitle && ogTitle) {
        ogTitle.setAttribute('content', previousOgTitle);
      }
      if (previousOgDescription && ogDescription) {
        ogDescription.setAttribute('content', previousOgDescription);
      }
      if (previousTwitterTitle && twitterTitle) {
        twitterTitle.setAttribute('content', previousTwitterTitle);
      }
      if (previousTwitterDescription && twitterDescription) {
        twitterDescription.setAttribute('content', previousTwitterDescription);
      }
      if (previousCanonical && canonical) {
        canonical.setAttribute('href', previousCanonical);
      }
    };
  }, [title, description, keywords, location.pathname]);
}
