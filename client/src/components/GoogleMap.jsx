export default function GoogleMap({ 
  address = 'Harsola, Kaithal, Haryana',
  className = '',
  height = 'h-96'
}) {
  const encodedAddress = encodeURIComponent(address);
  // Free embed endpoint — no API key required.
  const embedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-blush-100 ${className}`} role="region" aria-label="Shop location map">
      <iframe
        title="Dhull Cosmetic Shop Location"
        src={embedUrl}
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute bottom-4 left-4 right-4 bg-cream-200/90 backdrop-blur rounded-xl px-4 py-2 text-center shadow-lg pointer-events-none">
        <p className="font-medium text-charcoal-900">Dhull Cosmetic Shop</p>
        <p className="text-sm text-charcoal-500">{address}</p>
      </div>
    </div>
  );
}