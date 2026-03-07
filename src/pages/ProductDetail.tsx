import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Bookmark, Share2, Truck, RotateCcw, ShieldCheck, ChevronRight, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { useWishlist } from '../WishlistContext';

const sizes = ['2.2', '2.4', '2.6', '2.8', '2.10', '2.12'];

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const p = await apiService.getProductById(id);
        setProduct(p);
        
        // Fetch related products
        const all = await apiService.getProducts();
        setRelatedProducts(all.filter(item => item.category === p.category && item.id !== id).slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Product Not Found</h1>
        <Link to="/shop" className="text-brand-deep-green font-medium hover:underline">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-bg-green min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-stone-500 mb-12 uppercase tracking-widest">
          <Link to="/saksaa/" className="hover:text-brand-deep-green">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-brand-deep-green">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-brand-deep-green">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-stone-800 font-bold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[600px] scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-brand-deep-green' : 'border-transparent'}`}
                >
                  <img src={img} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
            <div className="flex-grow aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-sm border border-stone-100">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-xs text-stone-500 font-medium">(4.8/5 • 124 Reviews)</span>
              </div>
              <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">{product.name}</h1>
              <p className="text-3xl font-bold text-brand-deep-green">₹{product.price.toLocaleString()}</p>
            </div>

            <p className="text-stone-600 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6">
              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-stone-700">Select Size</label>
                  <Link to="/faqs" className="text-xs text-brand-deep-green hover:underline">Size Chart</Link>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${selectedSize === size ? 'border-brand-deep-green bg-brand-deep-green text-white' : 'border-stone-200 hover:border-brand-gold'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-stone-700 mb-3">Quantity</label>
                <div className="flex items-center w-32 border-2 border-stone-200 rounded-full p-1">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-grow text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => addToCart(product, quantity, selectedSize)}
                  className="flex-grow bg-stone-900 text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-deep-green transition-all"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button 
                  onClick={() => {
                    addToCart(product, quantity, selectedSize);
                    navigate('/cart');
                  }}
                  className="flex-grow bg-brand-gold text-white py-4 rounded-full font-bold hover:bg-brand-deep-green transition-all"
                >
                  Buy Now
                </button>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${isInWishlist(product.id) ? 'border-brand-deep-green bg-brand-deep-green text-white' : 'border-stone-200 hover:border-brand-deep-green hover:text-brand-deep-green'}`}
                >
                  <Bookmark size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-200">
              <div className="text-center space-y-2">
                <Truck size={20} className="mx-auto text-stone-400" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Free Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <RotateCcw size={20} className="mx-auto text-stone-400" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">7 Day Return</p>
              </div>
              <div className="text-center space-y-2">
                <ShieldCheck size={20} className="mx-auto text-stone-400" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Secure Payment</p>
              </div>
            </div>

            {/* Payment Icons */}
            <div className="flex flex-wrap items-center gap-4 opacity-60 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo.svg" alt="GPay" className="h-5" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" className="h-4" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <div className="flex border-b border-stone-200 mb-8">
            {['description', 'shipping info'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-brand-deep-green' : 'text-stone-400 hover:text-stone-600'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-deep-green" />
                )}
              </button>
            ))}
          </div>
          <div className="max-w-4xl">
            {activeTab === 'description' ? (
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>
                  This exquisite piece is a testament to the skill and dedication of our master artisans. 
                  Each element is carefully handcrafted using traditional techniques that have been perfected over generations.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Material: High-quality gold plated brass with semi-precious stones</li>
                  <li>Weight: 45 grams</li>
                  <li>Craftsmanship: Hand-engraved traditional patterns</li>
                  <li>Occasion: Festive, Wedding, Party Wear</li>
                  <li>Care: Keep away from moisture and perfumes. Store in a dry, cool place.</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>We take great care in packaging and shipping your artisan jewellery to ensure it reaches you in perfect condition.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Processing Time: 2-3 business days</li>
                  <li>Shipping Time: 5-7 business days across India</li>
                  <li>Free shipping on orders above ₹1,500</li>
                  <li>Tracking details will be shared via email and WhatsApp</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-3xl font-serif font-bold">You May Also Like</h2>
              <Link to="/shop" className="text-brand-deep-green font-medium hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
