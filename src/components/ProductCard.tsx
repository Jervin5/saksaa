import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Bookmark } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../CartContext';
import { useWishlist } from '../WishlistContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 product-card-hover"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.newArrival && (
          <span className="absolute top-2 left-2 bg-brand-deep-green text-white text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">
            New
          </span>
        )}
        {product.trending && (
          <span className="absolute top-2 left-2 bg-brand-gold text-white text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">
            Trending
          </span>
        )}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-sm ${isInWishlist(product.id) ? 'bg-brand-deep-green text-white' : 'bg-white/80 text-stone-400 hover:text-brand-deep-green'}`}
        >
          <Bookmark size={14} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
        </button>
      </Link>
      
      <div className="p-3 text-center">
        <Link to={`/product/${product.id}`} className="block mb-0.5">
          <h3 className="font-serif text-sm font-medium text-stone-800 group-hover:text-brand-deep-green transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-brand-deep-green text-xs font-bold mb-2">₹{product.price.toLocaleString()}</p>
        
        <button 
          onClick={handleBuyNow}
          className="w-full bg-stone-900 text-white py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-brand-deep-green transition-colors"
        >
          <ShoppingCart size={12} />
          Buy Now
        </button>
      </div>
    </motion.div>
  );
};
