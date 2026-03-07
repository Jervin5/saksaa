import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Package, Image as ImageIcon, Tag, IndianRupee, Layers, Database, Edit3, Check, X, Upload, Copy } from 'lucide-react';
import { apiService } from '../services/apiService';
import { Product } from '../types';

const categories = ['Bangles', 'Earrings', 'Necklace', 'Hair Accessories'];
const subCategories: Record<string, string[]> = {
  'Earrings': ['Studs', 'Jhumkas', 'Modern Jhumkas', 'Hoops', 'Drops'],
  'Bangles': ['Traditional', 'Modern', 'Oxidized', 'Bridal'],
  'Necklace': ['Chokers', 'Long Necklace', 'Temple Work', 'Pendants'],
  'Hair Accessories': ['Pins', 'Clips', 'Bands']
};

const SQL_SCHEMA = `/*
  SAKSAAS Artisan Jewellery - MSSQL Database Schema
  Project: PHP + MSSQL Integration
*/

CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) DEFAULT 'Customer',
    Phone NVARCHAR(20),
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE SubCategories (
    SubCategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryID INT FOREIGN KEY REFERENCES Categories(CategoryID) ON DELETE CASCADE,
    SubCategoryName NVARCHAR(50) NOT NULL
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    CategoryID INT FOREIGN KEY REFERENCES Categories(CategoryID),
    SubCategoryID INT FOREIGN KEY REFERENCES SubCategories(SubCategoryID),
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(10, 2) NOT NULL,
    MainImageURL NVARCHAR(MAX) NOT NULL,
    StockQuantity INT DEFAULT 0,
    IsTrending BIT DEFAULT 0,
    IsTopSelling BIT DEFAULT 0,
    IsNewArrival BIT DEFAULT 0,
    IsUnder500 BIT DEFAULT 0
);`;

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'db'>('add');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Earrings',
    subCategory: '',
    description: '',
    image: '',
    images: [],
    trending: false,
    topSelling: false,
    newArrival: true,
    under500: false,
    sizes: []
  });

  useEffect(() => {
    if (activeTab === 'manage') {
      fetchProducts();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Adding product:', newProduct);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setNewProduct({
        name: '', price: 0, category: 'Earrings', subCategory: '',
        description: '', image: '', images: [], trending: false,
        topSelling: false, newArrival: true, under500: false, sizes: []
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatePrice = async (id: string) => {
    try {
      // In a real app, call apiService.updateProductPrice(id, editPrice)
      setProducts(products.map(p => p.id === id ? { ...p, price: editPrice } : p));
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate file upload by creating a local URL
      const url = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: url, images: [url] });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(SQL_SCHEMA);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="bg-brand-bg-green min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
            <p className="text-stone-500">Manage your artisan jewellery collection & database</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-stone-100">
            <button 
              onClick={() => setActiveTab('add')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'add' ? 'bg-brand-deep-green text-white' : 'text-stone-400 hover:text-stone-600'}`}
            >
              Add Product
            </button>
            <button 
              onClick={() => setActiveTab('manage')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'manage' ? 'bg-brand-deep-green text-white' : 'text-stone-400 hover:text-stone-600'}`}
            >
              Inventory
            </button>
            <button 
              onClick={() => setActiveTab('db')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'db' ? 'bg-brand-deep-green text-white' : 'text-stone-400 hover:text-stone-600'}`}
            >
              Database
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'add' && (
            <motion.div 
              key="add"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                  <h3 className="text-sm font-bold text-stone-800 mb-4 uppercase tracking-widest">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-light-green rounded-full flex items-center justify-center text-brand-deep-green">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Items</p>
                        <p className="text-xl font-bold text-stone-800">124</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brand-deep-green p-6 rounded-2xl shadow-sm text-white">
                  <Database size={24} className="mb-4 text-brand-gold" />
                  <h3 className="font-serif font-bold text-lg mb-2">DB Integration</h3>
                  <p className="text-xs text-brand-light-green/70 leading-relaxed">
                    All products added here are mapped to the MSSQL schema. Ensure your PHP backend matches the table structure in the Database tab.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                  <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                    <Plus className="text-brand-deep-green" />
                    Add New Product
                  </h2>

                  <form onSubmit={handleAddProduct} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-700">Product Name</label>
                        <input 
                          type="text" required value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          className="w-full bg-brand-bg-green border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20"
                          placeholder="e.g. Royal Kundan Jhumkas"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-700">Price (₹)</label>
                        <input 
                          type="number" required value={newProduct.price || ''}
                          onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value), under500: Number(e.target.value) < 500})}
                          className="w-full bg-brand-bg-green border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-700">Category</label>
                        <select 
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value as any, subCategory: ''})}
                          className="w-full bg-brand-bg-green border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20"
                        >
                          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-700">Sub-Category (Type)</label>
                        <select 
                          value={newProduct.subCategory}
                          onChange={(e) => setNewProduct({...newProduct, subCategory: e.target.value})}
                          className="w-full bg-brand-bg-green border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20"
                        >
                          <option value="">Select Type</option>
                          {newProduct.category && subCategories[newProduct.category]?.map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-stone-700">Product Image</label>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow space-y-2">
                          <p className="text-[10px] text-stone-400 font-bold uppercase">Upload from System</p>
                          <label className="flex items-center justify-center w-full h-12 px-4 transition bg-white border-2 border-stone-200 border-dashed rounded-xl appearance-none cursor-pointer hover:border-brand-deep-green focus:outline-none">
                            <span className="flex items-center space-x-2">
                              <Upload size={18} className="text-stone-400" />
                              <span className="text-xs font-medium text-stone-600">Choose file...</span>
                            </span>
                            <input type="file" name="file_upload" className="hidden" onChange={handleFileUpload} accept="image/*" />
                          </label>
                        </div>
                        <div className="flex-grow space-y-2">
                          <p className="text-[10px] text-stone-400 font-bold uppercase">Or Image URL</p>
                          <input 
                            type="text" value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value, images: [e.target.value]})}
                            className="w-full bg-brand-bg-green border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20"
                            placeholder="https://..."
                          />
                        </div>
                        <div className="w-24 h-24 rounded-xl bg-stone-100 flex items-center justify-center overflow-hidden border border-stone-200 self-end">
                          {newProduct.image ? <img src={newProduct.image} className="w-full h-full object-cover" /> : <ImageIcon className="text-stone-300" />}
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-brand-deep-green text-white font-bold py-4 rounded-xl hover:bg-stone-900 transition-all shadow-lg shadow-brand-deep-green/20"
                    >
                      Publish Product
                    </button>

                    {success && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-center font-bold">
                        Product added successfully!
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'manage' && (
            <motion.div 
              key="manage"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden"
            >
              <div className="p-8 border-b border-stone-100 flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold">Inventory Management</h2>
                <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                  {products.length} Products Found
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-stone-50">
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-400">Product</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-400">Category</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-400 text-right">Price</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-400 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-4">
                            <img src={product.image} className="w-10 h-12 object-cover rounded-lg" />
                            <div>
                              <p className="font-bold text-stone-800 text-sm">{product.name}</p>
                              <p className="text-[10px] text-stone-400 uppercase tracking-widest">{product.subCategory}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="text-xs font-medium text-stone-600">{product.category}</span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          {editingId === product.id ? (
                            <div className="flex items-center justify-end gap-2">
                              <span className="text-stone-400">₹</span>
                              <input 
                                type="number" 
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="w-20 bg-white border border-stone-200 rounded px-2 py-1 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20"
                              />
                            </div>
                          ) : (
                            <span className="font-bold text-brand-deep-green">₹{product.price.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {editingId === product.id ? (
                              <>
                                <button 
                                  onClick={() => handleUpdatePrice(product.id)}
                                  className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                                >
                                  <Check size={16} />
                                </button>
                                <button 
                                  onClick={() => setEditingId(null)}
                                  className="p-2 bg-stone-100 text-stone-400 rounded-lg hover:bg-stone-200 transition-colors"
                                >
                                  <X size={16} />
                                </button>
                              </>
                            ) : (
                              <button 
                                onClick={() => {
                                  setEditingId(product.id);
                                  setEditPrice(product.price);
                                }}
                                className="p-2 bg-brand-light-green text-brand-deep-green rounded-lg hover:bg-brand-deep-green hover:text-white transition-all"
                              >
                                <Edit3 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'db' && (
            <motion.div 
              key="db"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden"
            >
              <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-white">
                <div>
                  <h2 className="text-2xl font-serif font-bold">MSSQL Schema Setup</h2>
                  <p className="text-stone-400 text-xs mt-1">Run this script in your SQL Server Management Studio (SSMS)</p>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all"
                >
                  {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                  {copySuccess ? 'Copied!' : 'Copy Query'}
                </button>
              </div>
              <div className="p-8 bg-stone-950 font-mono text-sm text-emerald-400 overflow-x-auto max-h-[600px] custom-scrollbar">
                <pre>{SQL_SCHEMA}</pre>
              </div>
              <div className="p-8 bg-stone-50 border-t border-stone-100">
                <h3 className="font-serif font-bold text-lg mb-4">Integration Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">PHP Connection</p>
                    <div className="bg-white p-4 rounded-xl border border-stone-200 text-[11px] font-mono text-stone-600">
                      $conn = new PDO("sqlsrv:server=$server;Database=saksaas", $user, $pass);
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Admin Logic</p>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      When adding products, ensure you first check if the Category and SubCategory exist in their respective tables to maintain referential integrity.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
