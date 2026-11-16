import { useState } from 'react';
import { FiMapPin, FiNavigation, FiLoader } from 'react-icons/fi';

const EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.5952986640355!2d76.43629547544799!3d29.73148003333194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3911e3001bc416bf%3A0x28331b39f10e8b60!2sDhull%20cosmetic%20shop!5e0!3m2!1sen!2sin!4v1794804850402!5m2!1sen!2sin';

const DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Dhull%20cosmetic%20shop%20Harsola%20Kaithal%20Haryana';

export default function GoogleMap({ className = 'h-96' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-blush-100 ${className}`} role="region" aria-label="Dhull Cosmetic Shop location map">
      {/* Find Our Store Heading */}
      <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-heading text-lg sm:text-xl font-semibold text-charcoal-900 mb-1">Find Our Store</h3>
          <p className="text-sm text-charcoal-600">Dhull Cosmetic Shop, Harsola, Kaithal, Haryana</p>
        </div>
      </div>

      {/* Loading Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-blush-100 z-5">
          <div className="flex flex-col items-center gap-3 text-charcoal-500">
            <FiLoader size={28} className="animate-spin text-rose-500" aria-hidden="true" />
            <p className="text-sm font-medium">Loading map…</p>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-blush-100 z-5 p-6 text-center">
          <FiMapPin size={32} className="text-rose-400 mb-2" aria-hidden="true" />
          <p className="font-medium text-charcoal-900 mb-1">Unable to load map</p>
          <p className="text-sm text-charcoal-500 mb-4">Please try again or use the button below</p>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-rose-500 text-cream-50 font-semibold rounded-xl hover:bg-rose-600 transition-colors"
          >
            <FiNavigation size={18} aria-hidden="true" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      )}

      {/* Google Maps Embed */}
      <iframe
        title="Dhull Cosmetic Shop Location - Harsola, Kaithal, Haryana"
        src={EMBED_URL}
        className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        allowFullScreen
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />

      {/* Get Directions Button */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 mx-auto max-w-xs px-5 py-3 bg-rose-500 text-cream-50 font-semibold rounded-xl hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300 shadow-md"
        >
          <FiNavigation size={18} aria-hidden="true" />
          <span>Get Directions</span>
        </a>
      </div>

      {/* Address Label Overlay */}
      <div className="absolute bottom-16 left-4 right-4 pointer-events-none">
        <div className="bg-cream-200/95 backdrop-blur rounded-xl px-4 py-2 text-center shadow-lg max-w-xs mx-auto">
          <p className="font-medium text-charcoal-900">Dhull Cosmetic Shop</p>
          <p className="text-sm text-charcoal-500">Harsola, Kaithal, Haryana</p>
        </div>
      </div>
    </div>
  );
}