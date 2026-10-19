import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiExternalLink, FiHeart, FiPlus, FiMinus, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';

const WHATSAPP_NUMBER = '918053224896';

const ProductCard = forwardRef(function ProductCard({ product, index = 0, variant = 'default' }, ref) {
  const { addToCart, removeFromCart, increaseQty, decreaseQty, cartItems } = useCart();
  const { addToast } = useToast();

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in "${product.name}". Could you please share more details and availability?`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isInCart = quantity > 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast('Product added to cart!', 'success');
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    increaseQty(product.id);
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      decreaseQty(product.id);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(product.id);
  };

  const variants = {
    default: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.1 },
    },
    grid: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, delay: index * 0.05 },
    },
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <motion.article
      ref={ref}
      {...selectedVariant}
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(236, 72, 153, 0.25)' }}
      className="card-base group"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-blush-50">
        <img
          src={product.image}
          alt={product.alt || product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            className="w-10 h-10 rounded-full bg-cream-200/90 backdrop-blur-sm flex items-center justify-center text-charcoal-600 hover:text-rose-600 hover:bg-cream-200 shadow-lg transition-all duration-300"
            aria-label="Add to wishlist"
          >
            <FiHeart size={18} aria-hidden="true" />
          </button>
        </div>

        <span className="absolute bottom-3 left-3 bg-cream-200/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-charcoal-700 shadow-md">
          {product.category}
        </span>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-heading text-lg font-semibold text-charcoal-900 line-clamp-1 group-hover:text-rose-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-charcoal-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {isInCart ? (
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleDecrease}
              className="flex-1 w-10 h-10 rounded-lg bg-cream-200 flex items-center justify-center text-charcoal-600 hover:bg-rose-100 hover:text-rose-600 transition-colors"
              aria-label="Decrease quantity"
            >
              <FiMinus size={16} aria-hidden="true" />
            </button>
            <span className="flex-1 text-center font-semibold text-charcoal-900 bg-cream-200 rounded-lg py-1">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="flex-1 w-10 h-10 rounded-lg bg-rose-500 text-cream-50 flex items-center justify-center hover:bg-rose-600 transition-colors"
              aria-label="Increase quantity"
            >
              <FiPlus size={16} aria-hidden="true" />
            </button>
            <button
              onClick={handleRemove}
              className="w-10 h-10 rounded-lg bg-cream-200 flex items-center justify-center text-charcoal-400 hover:bg-rose-100 hover:text-rose-600 transition-colors"
              aria-label="Remove from cart"
            >
              <FiHeart size={18} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <motion.button
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-rose-500 text-cream-50 font-medium rounded-lg hover:bg-rose-600 hover:shadow-md hover:shadow-rose-500/30 transition-all duration-300 group"
            whileTap={{ scale: 0.98 }}
          >
            <FiShoppingBag size={16} aria-hidden="true" />
            <span>Add to Cart</span>
            <FiCheck size={14} aria-hidden="true" className="group-hover:opacity-100 opacity-0 transition-opacity" />
          </motion.button>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-rose-50 text-rose-600 font-medium rounded-lg hover:bg-rose-100 hover:shadow-md hover:shadow-rose-500/20 transition-all duration-300"
        >
          <FiShoppingBag size={16} aria-hidden="true" />
          <span>Ask on WhatsApp</span>
          <FiExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
});

export default ProductCard;