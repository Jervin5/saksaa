import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { Filter, ChevronDown, SlidersHorizontal, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- IMAGE IMPORTS ---

// Bangles (23 total)
import b1 from '../images/Kundan_Bangels/Kundan_Bangels1.png';
import b2 from '../images/Kundan_Bangels/Kundan_Bangels2.png';
import b3 from '../images/Kundan_Bangels/Kundan_Bangels3.png';
import b4 from '../images/Kundan_Bangels/Kundan_Bangels4.png';
import b5 from '../images/Kundan_Bangels/Kundan_Bangels5.png';
import b6 from '../images/Kundan_Bangels/Kundan_Bangels6.png';
import b7 from '../images/Kundan_Bangels/Kundan_Bangels7.png';
import b8 from '../images/Kundan_Bangels/Kundan_Bangels8.png';
import b9 from '../images/Kundan_Bangels/Kundan_Bangels9.png';
import b10 from '../images/Kundan_Bangels/Kundan_Bangels10.png';
import b11 from '../images/Kundan_Bangels/Kundan_Bangels11.png';
import b12 from '../images/Kundan_Bangels/Kundan_Bangels12.jpg';
import b13 from '../images/Kundan_Bangels/Kundan_Bangels13.png';
import b14 from '../images/Kundan_Bangels/Kundan_Bangels14.png';
import b15 from '../images/Kundan_Bangels/Kundan_Bangels15.png';
import b16 from '../images/Kundan_Bangels/Kundan_Bangels16.png';
import b17 from '../images/Kundan_Bangels/Kundan_Bangels17.png';
import b18 from '../images/Kundan_Bangels/Kundan_Bangels18.png';
import b19 from '../images/Kundan_Bangels/Kundan_Bangels19.png';
import b20 from '../images/Kundan_Bangels/Kundan_Bangels20.png';
import b21 from '../images/Kundan_Bangels/Kundan_Bangels21.png';
import b22 from '../images/Kundan_Bangels/Kundan_Bangels22.png';
import b23 from '../images/Kundan_Bangels/Kundan_Bangels23.png';

// Studs (9)
import s1 from '../images/studs/studs1.png'; import s2 from '../images/studs/studs2.png';
import s3 from '../images/studs/studs3.jpg'; import s4 from '../images/studs/studs4.jpg';
import s5 from '../images/studs/studs5.jpg'; import s6 from '../images/studs/studs6.jpg';
import s7 from '../images/studs/studs7.jpg'; import s8 from '../images/studs/studs8.jpg';
import s9 from '../images/studs/studs9.jpg';

// Jhumkas (7)
import j1 from '../images/kundan_jhumkas/kundan_jhumkas1.png'; import j2 from '../images/kundan_jhumkas/kundan_jhumkas2.png';
import j3 from '../images/kundan_jhumkas/kundan_jhumkas3.png'; import j4 from '../images/kundan_jhumkas/kundan_jhumkas4.png';
import j5 from '../images/kundan_jhumkas/kundan_jhumkas5.png'; import j6 from '../images/kundan_jhumkas/kundan_jhumkas6.jpg';
import j7 from '../images/kundan_jhumkas/kundan_jhumkas7.png';

// Modern Jhumkas (9)
import mj1 from '../images/kundan_modern_earings/kundan_modern_earings1.png'; import mj2 from '../images/kundan_modern_earings/kundan_modern_earings2.png';
import mj3 from '../images/kundan_modern_earings/kundan_modern_earings3.png'; import mj4 from '../images/kundan_modern_earings/kundan_modern_earings4.png';
import mj5 from '../images/kundan_modern_earings/kundan_modern_earings5.png'; import mj6 from '../images/kundan_modern_earings/kundan_modern_earings6.png';
import mj7 from '../images/kundan_modern_earings/kundan_modern_earings7.png'; import mj8 from '../images/kundan_modern_earings/kundan_modern_earings8.png';
import mj9 from '../images/kundan_modern_earings/kundan_modern_earings9.png';

// Silk Thread Jhumkas (15)
import st1 from '../images/silk_thread_jhumkas/silk_thread_jhumkas1.png'; import st2 from '../images/silk_thread_jhumkas/silk_thread_jhumkas2.png';
import st3 from '../images/silk_thread_jhumkas/silk_thread_jhumkas3.jpeg'; import st4 from '../images/silk_thread_jhumkas/silk_thread_jhumkas4.jpeg';
import st5 from '../images/silk_thread_jhumkas/silk_thread_jhumkas5.jpeg'; import st6 from '../images/silk_thread_jhumkas/silk_thread_jhumkas6.jpeg';
import st7 from '../images/silk_thread_jhumkas/silk_thread_jhumkas7.jpeg'; import st8 from '../images/silk_thread_jhumkas/silk_thread_jhumkas8.jpeg';
import st9 from '../images/silk_thread_jhumkas/silk_thread_jhumkas9.jpeg'; import st10 from '../images/silk_thread_jhumkas/silk_thread_jhumkas10.jpeg';
import st11 from '../images/silk_thread_jhumkas/silk_thread_jhumkas11.jpeg'; import st12 from '../images/silk_thread_jhumkas/silk_thread_jhumkas12.jpeg';
import st13 from '../images/silk_thread_jhumkas/silk_thread_jhumkas13.jpeg'; import st14 from '../images/silk_thread_jhumkas/silk_thread_jhumkas14.jpeg';
import st15 from '../images/silk_thread_jhumkas/silk_thread_jhumkas15.jpeg';

// Traditional Jhumkas (6)
import tj1 from '../images/traditional_jhumkas/traditional_jhumkas1.png'; import tj2 from '../images/traditional_jhumkas/traditional_jhumkas2.png';
import tj3 from '../images/traditional_jhumkas/traditional_jhumkas3.png'; import tj4 from '../images/traditional_jhumkas/traditional_jhumkas4.png';
import tj5 from '../images/traditional_jhumkas/traditional_jhumkas5.png'; import tj6 from '../images/traditional_jhumkas/traditional_jhumkas6.png';

// --- CONFIG ---
const categories = ['Bangles', 'Earrings'];
const subCategories: Record<string, string[]> = {
  'Earrings': ['Studs', 'Jhumkas', 'Modern Jhumkas', 'Silk Thread Jhumkas', 'Traditional Jhumkas'],
  'Bangles': ['Traditional', 'Modern', 'Bridal'],
  // 'Necklace': ['Chokers', 'Long Necklace', 'Temple Work', 'Pendants'],
  // 'Hair Accessories': ['Pins', 'Clips', 'Bands']
};

const priceRanges = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
  { label: 'Over ₹2,000', min: 2000, max: 10000 },
];
const sizes = ['2.2', '2.4', '2.6', '2.8', '2.10', '2.12'];

// Data mapping
const bangleImages = [b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14,b15,b16,b17,b18,b19,b20,b21,b22,b23];
const studImages = [s1,s2,s3,s4,s5,s6,s7,s8,s9];
const jhumkaImages = [j1,j2,j3,j4,j5,j6,j7];
const modernJhumkaImages = [mj1,mj2,mj3,mj4,mj5,mj6,mj7,mj8,mj9];
const silkJhumkaImages = [st1,st2,st3,st4,st5,st6,st7,st8,st9,st10,st11,st12,st13,st14,st15];
const tradJhumkaImages = [tj1,tj2,tj3,tj4,tj5,tj6];

const allProducts: Product[] = [];

// Populate Bangles (23 images split into 3 types)
bangleImages.forEach((img, i) => {
  let type = 'Traditional';
  if (i >= 8 && i < 16) type = 'Modern';
  if (i >= 16) type = 'Bridal';
  allProducts.push({
    id: `bang-${i}`,
    name: `Kundan Bangle ${i + 1}`,
    category: 'Bangles',
    subCategory: type,
    price: 850 + (i * 20),
    image: img,
    images: [img],
    sizes: ['2.4', '2.6', '2.8'],
    description: 'Exquisite handcrafted kundan bangles.',
    trending: i < 4,
    topSelling: i < 3 || (i >= 8 && i < 11),
    newArrival: i >= 15 && i < 20,
    under500: i % 3 === 0
  });
});

// Populate Earrings
const addE = (imgs: any[], sub: string, pref: string) => {
  imgs.forEach((img, i) => {
    allProducts.push({
      id: `${pref}-${i}`,
      name: `${sub} ${i + 1}`,
      category: 'Earrings',
      subCategory: sub,
      price: 350 + (i * 15),
      image: img,
      images: [img],
      description: `Beautiful ${sub} earrings.`,
      trending: i < 3,
      topSelling: i < 2 || (i >= 4 && i < 6),
      newArrival: true,
      under500: i % 2 === 0
    });
  });
};

addE(studImages, 'Studs', 'std');
addE(jhumkaImages, 'Jhumkas', 'jhm');
addE(modernJhumkaImages, 'Modern Jhumkas', 'mjh');
addE(silkJhumkaImages, 'Silk Thread Jhumkas', 'sjh');
addE(tradJhumkaImages, 'Traditional Jhumkas', 'tjh');

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    priceRange: true,
    sizes: true
  });
  const itemsPerPage = 12;

  const activeCategory = searchParams.get('category');
  const activeSubCategory = searchParams.get('subCategory');
  const activePriceRange = searchParams.get('priceRange');
  const activeSize = searchParams.get('size');
  const searchQuery = searchParams.get('q') || '';

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      if (activeCategory && product.category !== activeCategory) return false;
      if (activeSubCategory && product.subCategory !== activeSubCategory) return false;
      if (activePriceRange) {
        const range = priceRanges.find(r => r.label === activePriceRange);
        if (range && (product.price < range.min || product.price > range.max)) return false;
      }
      if (activeSize && (!product.sizes || !product.sizes.includes(activeSize))) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = `${product.name} ${product.category} ${product.subCategory} ${product.description}`.toLowerCase();
        if (!searchableText.includes(query)) return false;
      }
      return true;
    });
  }, [activeCategory, activeSubCategory, activePriceRange, activeSize, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleCategory = (cat: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (activeCategory === cat) {
      newParams.delete('category');
      newParams.delete('subCategory');
    } else {
      newParams.set('category', cat);
      newParams.delete('subCategory');
    }
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  const toggleSubCategory = (sub: string) => {
    const newParams = new URLSearchParams(searchParams);
    activeSubCategory === sub ? newParams.delete('subCategory') : newParams.set('subCategory', sub);
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  const clearFilters = () => { setSearchParams({}); setCurrentPage(1); };

  const toggleSection = (section: 'categories' | 'priceRange' | 'sizes') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-brand-bg-green min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header - ORIGINAL DESIGN */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Our Collection</h1>
            <p className="text-stone-500 text-sm">Showing {filteredProducts.length} exquisite pieces</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-grow md:w-64">
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  e.target.value ? newParams.set('q', e.target.value) : newParams.delete('q');
                  setSearchParams(newParams);
                }}
                className="w-full bg-white border border-stone-200 rounded-full px-6 py-2 pl-12 focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20"
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-white border border-stone-200 px-6 py-2 rounded-full hover:bg-stone-50 transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters - ORIGINAL DESIGN */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.aside 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full lg:w-64 space-y-10"
              >
                {/* Categories */}
                <div>
                  <button
                    onClick={() => toggleSection('categories')}
                    className="w-full font-serif font-bold text-lg mb-6 flex items-center justify-between py-2 hover:text-brand-deep-green transition-colors"
                  >
                    Categories
                    <ChevronDown size={16} className={`transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSections.categories && (
                    <div className="space-y-3">
                      {categories.map(cat => (
                        <div key={cat}>
                          <button
                            onClick={() => toggleCategory(cat)}
                            className={`w-full text-left text-sm py-1 transition-colors flex items-center justify-between ${activeCategory === cat ? 'text-brand-deep-green font-bold' : 'text-stone-600 hover:text-brand-gold'}`}
                          >
                            {cat}
                            {activeCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-brand-deep-green" />}
                          </button>
                          
                          {activeCategory === cat && subCategories[cat] && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="pl-4 mt-2 space-y-2 border-l border-stone-100 ml-1"
                            >
                              {subCategories[cat].map(sub => (
                                <button
                                  key={sub}
                                  onClick={() => toggleSubCategory(sub)}
                                  className={`w-full text-left text-xs py-1 transition-colors ${activeSubCategory === sub ? 'text-brand-gold font-bold' : 'text-stone-400 hover:text-brand-gold'}`}
                                >
                                  {sub}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Range */}
                <div>
                  <button
                    onClick={() => toggleSection('priceRange')}
                    className="w-full font-serif font-bold text-lg mb-6 flex items-center justify-between py-2 hover:text-brand-deep-green transition-colors"
                  >
                    Price Range
                    <ChevronDown size={16} className={`transition-transform ${expandedSections.priceRange ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSections.priceRange && (
                    <div className="space-y-3">
                      {priceRanges.map(range => (
                        <button
                          key={range.label}
                          onClick={() => {
                            const p = new URLSearchParams(searchParams);
                            activePriceRange === range.label ? p.delete('priceRange') : p.set('priceRange', range.label);
                            setSearchParams(p);
                          }}
                          className={`w-full text-left text-sm py-1 transition-colors flex items-center justify-between ${activePriceRange === range.label ? 'text-brand-deep-green font-bold' : 'text-stone-600 hover:text-brand-gold'}`}
                        >
                          {range.label}
                          {activePriceRange === range.label && <div className="w-1.5 h-1.5 rounded-full bg-brand-deep-green" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sizes */}
                <div>
                  <button
                    onClick={() => toggleSection('sizes')}
                    className="w-full font-serif font-bold text-lg mb-6 flex items-center justify-between py-2 hover:text-brand-deep-green transition-colors"
                  >
                    Bangle Sizes
                    <ChevronDown size={16} className={`transition-transform ${expandedSections.sizes ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSections.sizes && (
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => {
                              const p = new URLSearchParams(searchParams);
                              activeSize === size ? p.delete('size') : p.set('size', size);
                              setSearchParams(p);
                          }}
                          className={`border py-2 text-xs rounded transition-colors ${activeSize === size ? 'bg-brand-deep-green text-white border-brand-deep-green' : 'border-stone-200 hover:border-brand-deep-green hover:text-brand-deep-green'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  onClick={clearFilters}
                  className="w-full py-3 text-sm font-bold text-stone-500 hover:text-brand-deep-green transition-colors border-t border-stone-100 pt-6"
                >
                  Clear All Filters
                </button>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid - ORIGINAL DESIGN */}
          <div className="flex-grow">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex items-center justify-center space-x-4">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center disabled:opacity-30 hover:bg-white transition-colors"
                    >
                      <ChevronDown className="rotate-90" size={18} />
                    </button>
                    <div className="flex items-center space-x-2">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${currentPage === i + 1 ? 'bg-brand-deep-green text-white' : 'hover:bg-white'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center disabled:opacity-30 hover:bg-white transition-colors"
                    >
                      <ChevronDown className="-rotate-90" size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-200">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-300">
                  <Filter size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">No products found</h3>
                <button onClick={clearFilters} className="bg-brand-deep-green text-white px-8 py-2 rounded-full font-medium">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};