import { useEffect } from 'react';

export default function usePageMeta({ title, description, keywords } = {}) {
  useEffect(() => {
    // Update title
    const previousTitle = document.title;
    if (title) {
      document.title = `${title} | Dhull Cosmetic Shop`;
    }

    // Update description
    let metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content');
    if (description && metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    const previousOgTitle = ogTitle?.getAttribute('content');
    if (title && ogTitle) {
      ogTitle.setAttribute('content', `${title} | Dhull Cosmetic Shop`);
    }

    // Update og:description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    const previousOgDescription = ogDescription?.getAttribute('content');
    if (description && ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Update twitter:title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const previousTwitterTitle = twitterTitle?.getAttribute('content');
    if (title && twitterTitle) {
      twitterTitle.setAttribute('content', `${title} | Dhull Cosmetic Shop`);
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
    };
  }, [title, description]);
}
