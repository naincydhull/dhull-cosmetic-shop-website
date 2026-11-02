import { useEffect } from 'react';

export default function usePageTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | Dhull Cosmetic Shop` : 'Dhull Cosmetic Shop | Harsola, Kaithal';
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
