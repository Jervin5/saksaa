import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Upload, Info, ShoppingCart, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../CartContext';

// Import our images
import customImg1 from '../images/Kundan_Bangels/Kundan_Bangels4.png';
import customImg2 from '../images/kundan_jhumkas/kundan_jhumkas3.png';
import customImg3 from '../images/kundan_modern_earings/kundan_modern_earings3.png';
import customImg4 from '../images/silk_thread_jhumkas/silk_thread_jhumkas3.jpeg';

const sizes = ['2.2', '2.4', '2.6', '2.8', '2.10', '2.12'];
const bangleTypes = [
  { id: 'normal', name: 'Normal 10mm', price: 100 },
  { id: 'broad', name: 'Broad 20mm', price: 200 },
  { id: 'hanging', name: 'Hanging 10mm', price: 150 },
];

// Mocking 250+ colors
const colors = Array.from({ length: 256 }, (_, i) => {
  const h = (i * 1.41) % 360;
  return `hsl(${h}, 70%, 60%)`;
});

// Predefined color themes
const colorThemes = [
  { name: 'Gold', color: '#D4AF37', rgb: 'rgb(212, 175, 55)' },
  { name: 'Silver', color: '#C0C0C0', rgb: 'rgb(192, 192, 192)' },
  { name: 'Rose Gold', color: '#E0BFB8', rgb: 'rgb(224, 191, 184)' },
  { name: 'Antique Gold', color: '#B8860B', rgb: 'rgb(184, 134, 11)' },
  { name: 'White Gold', color: '#F5F5DC', rgb: 'rgb(245, 245, 220)' },
  { name: 'Champagne', color: '#F7E7CE', rgb: 'rgb(247, 231, 206)' },
  { name: 'Copper', color: '#B87333', rgb: 'rgb(184, 115, 51)' },
  { name: 'Bronze', color: '#CD7F32', rgb: 'rgb(205, 127, 50)' },
  { name: 'Platinum', color: '#E5E4E2', rgb: 'rgb(229, 228, 226)' },
  { name: 'Black', color: '#2C2C2C', rgb: 'rgb(44, 44, 44)' },
  { name: 'Red', color: '#DC143C', rgb: 'rgb(220, 20, 60)' },
  { name: 'Blue', color: '#4169E1', rgb: 'rgb(65, 105, 225)' },
  { name: 'Green', color: '#228B22', rgb: 'rgb(34, 139, 34)' },
];

export const Customise = () => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [hand, setHand] = useState<'One' | 'Both'>('Both');
  const [quantities, setQuantities] = useState<Record<string, number>>({
    normal: 2,
    broad: 1,
    hanging: 1,
  });
  const [selectedColor, setSelectedColor] = useState(colorThemes[0]);
  const [outfitPhoto, setOutfitPhoto] = useState<File | null>(null);
  const [comment, setComment] = useState('');

  const basePrice = 1200;
  const totalPrice = useMemo(() => {
    const typesTotal = bangleTypes.reduce((sum, type) => sum + (type.price * quantities[type.id]), 0);
    const multiplier = hand === 'Both' ? 2 : 1;
    return (basePrice + typesTotal) * multiplier;
  }, [quantities, hand]);

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta)
    }));
  };

  const handleAddToCart = () => {
    const customProduct = {
      id: `custom-${Date.now()}`,
      name: `Customised Bangle Set (${selectedSize}, ${hand} Hand)`,
      price: totalPrice,
      category: 'Bangles' as const,
      image: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?auto=format&fit=crop&q=80&w=800',
      images: ['https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?auto=format&fit=crop&q=80&w=800'],
      description: `Customised set with ${selectedColor.name} theme. Hand: ${hand}, Size: ${selectedSize}.`,
    };
    addToCart(customProduct, 1, selectedSize);
    alert('Customised set added to cart!');
  };

  return (
    <div className="bg-brand-bg-green min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Customise Your Set</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Design your dream bangle set. Choose your size, hand preference, bangle types, and match it perfectly with your outfit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Preview & Gallery */}
          <div className="space-y-8">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border border-stone-100 relative max-w-md mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center relative p-6">
                {/* Visual Bangle Representation */}
                <div className="text-center space-y-4">
                  {/* Bangle Circles */}
                  <div className="relative flex justify-center items-center">
                    {/* Outer bangle */}
                    <div
                      className="w-20 h-20 rounded-full border-4 shadow-lg relative flex items-center justify-center"
                      style={{ borderColor: selectedColor.color, backgroundColor: `${selectedColor.color}20` }}
                    >
                      {/* Inner bangle */}
                      <div
                        className="w-12 h-12 rounded-full border-2"
                        style={{ borderColor: selectedColor.color }}
                      ></div>

                      {/* Size indicator */}
                      <div className="absolute -top-2 -right-2 bg-brand-deep-green text-white text-xs px-2 py-1 rounded-full font-bold">
                        {selectedSize}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-base text-stone-800">Your Custom Design</h3>
                    <div className="text-xs text-stone-600 space-y-1">
                      <p><span className="font-medium">Theme:</span> {selectedColor.name}</p>
                      <p><span className="font-medium">Hand:</span> {hand}</p>
                      <div className="text-center">
                        <p className="font-medium mb-1">Bangle Types:</p>
                        <div className="flex flex-wrap justify-center gap-1">
                          {Object.entries(quantities).filter(([_, qty]) => qty > 0).map(([type, qty]) => (
                            <span key={type} className="bg-stone-200 px-2 py-1 rounded text-xs">
                              {type}({qty})
                            </span>
                          ))}
                        </div>
                      </div>
                      {outfitPhoto && <p className="text-brand-deep-green font-medium text-xs">✓ Outfit photo uploaded</p>}
                    </div>
                  </div>

                  <div className="mt-2 p-2 bg-brand-light-green rounded-lg">
                    <p className="text-xs text-stone-700 font-bold">₹{totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                { img: customImg1, name: 'Kundan Bangles', type: 'kundan' },
                { img: customImg2, name: 'Kundan Jhumkas', type: 'jhumkas' },
                { img: customImg3, name: 'Modern Earrings', type: 'modern' },
                { img: customImg4, name: 'Silk Thread', type: 'silk' }
              ].map((item, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden border border-stone-200 cursor-pointer hover:border-brand-deep-green transition-colors relative group">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-xs font-bold text-center px-2">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-brand-light-green p-6 rounded-2xl border border-brand-deep-green/10 flex items-start gap-4">
              <Info className="text-brand-deep-green flex-shrink-0 mt-1" size={24} />
              <div className="text-sm text-stone-600 leading-relaxed space-y-3">
                <div>
                  <p className="font-bold text-brand-deep-green mb-2">How Our Customization Works:</p>
                  <div className="space-y-1">
                    <p><span className="font-medium">1. Design Selection:</span> Choose your size, hand preference, and bangle types</p>
                    <p><span className="font-medium">2. Color Matching:</span> Pick a theme color or upload your outfit photo</p>
                    <p><span className="font-medium">3. Artisan Crafting:</span> Our skilled artisans handcraft your design using traditional techniques</p>
                    <p><span className="font-medium">4. Quality Check:</span> Each piece undergoes rigorous quality inspection</p>
                    <p><span className="font-medium">5. Delivery:</span> Your custom piece arrives in 7-10 business days</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-brand-deep-green/20">
                  <p className="text-xs text-stone-500 italic">
                    💡 Pro tip: Upload your outfit photo for perfect color matching with your traditional wear!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Customisation Options */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100 space-y-10">
            {/* Size Selector */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-700 mb-4">1. Select Bangle Size</h3>
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
            </section>

            {/* Hand Selector */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-700 mb-4">2. Hand Preference</h3>
              <div className="flex gap-4">
                {['One', 'Both'].map(option => (
                  <button
                    key={option}
                    onClick={() => setHand(option as any)}
                    className={`flex-grow py-3 rounded-full border-2 font-bold transition-all ${hand === option ? 'border-brand-deep-green bg-brand-deep-green text-white' : 'border-stone-200 hover:border-brand-gold'}`}
                  >
                    {option} Hand
                  </button>
                ))}
              </div>
            </section>

            {/* Bangle Types */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-700 mb-4">3. Bangle Types & Quantities</h3>
              <div className="space-y-4">
                {bangleTypes.map(type => (
                  <div key={type.id} className="flex items-center justify-between p-4 bg-brand-bg-green rounded-xl">
                    <div>
                      <p className="font-bold text-stone-800">{type.name}</p>
                      <p className="text-xs text-stone-500">+₹{type.price} per piece</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleQuantityChange(type.id, -1)}
                        className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-50"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold">{quantities[type.id]}</span>
                      <button 
                        onClick={() => handleQuantityChange(type.id, 1)}
                        className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Color Selector */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-700 mb-4">4. Choose Color</h3>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
                {colorThemes.map((theme, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(theme)}
                    className={`aspect-square rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor.name === theme.name
                        ? 'border-brand-deep-green scale-110 shadow-lg'
                        : 'border-stone-300 hover:border-brand-gold hover:scale-105'
                    }`}
                    style={{ backgroundColor: theme.color }}
                    title={theme.name}
                  >
                    {selectedColor.name === theme.name && (
                      <Check size={16} className="text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Outfit Upload */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-700 mb-4">5. Upload Outfit Photo (Optional)</h3>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-stone-200 rounded-2xl cursor-pointer hover:bg-stone-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-stone-400" />
                  <p className="mb-2 text-sm text-stone-500">
                    <span className="font-bold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-stone-400">PNG, JPG or JPEG (MAX. 5MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => setOutfitPhoto(e.target.files?.[0] || null)}
                />
              </label>
              {outfitPhoto && (
                <p className="mt-2 text-xs text-brand-deep-green font-bold">Selected: {outfitPhoto.name}</p>
              )}
            </section>

            {/* Comments */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-700 mb-4">6. Any Special Requests?</h3>
              <textarea 
                rows={3}
                placeholder="E.g. I want more pearls on the broad bangles..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-4 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20 resize-none"
              />
            </section>

            {/* Price & Action */}
            <div className="pt-8 border-t border-stone-100 flex items-center justify-between gap-8">
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Estimated Total</p>
                <p className="text-3xl font-bold text-brand-deep-green">₹{totalPrice.toLocaleString()}</p>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-stone-900 text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-deep-green transition-all shadow-lg"
              >
                <ShoppingCart size={20} />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
