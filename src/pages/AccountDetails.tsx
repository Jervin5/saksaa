import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Mail, MapPin, Phone, Shield, Bell, LogOut, ChevronRight, Save } from 'lucide-react';
import { apiService } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../types';

export const AccountDetails = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await apiService.getProfile();
        setUser(profile);
      } catch (err) {
        console.error(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await apiService.updateProfile(user);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    apiService.logout();
    navigate('/login');
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!user) return null;

  const tabs = [
    { id: 'personal', icon: User, label: 'Personal Info' },
    { id: 'address', icon: MapPin, label: 'Addresses' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <div className="bg-brand-bg-green min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-12">Account Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 text-center">
              <div className="w-24 h-24 bg-brand-light-green rounded-full flex items-center justify-center mx-auto mb-4 text-brand-deep-green text-3xl font-serif font-bold">
                {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <h3 className="font-serif font-bold text-xl">{user.fullName}</h3>
              <p className="text-stone-500 text-sm">Member since 2024</p>
            </div>

            <nav className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
              {tabs.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-6 py-4 flex items-center justify-between text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-brand-light-green text-brand-deep-green' : 'hover:bg-stone-50 text-stone-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    {item.label}
                  </div>
                  <ChevronRight size={16} className={`transition-transform ${activeTab === item.id ? 'rotate-90' : ''}`} />
                </button>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full px-6 py-4 flex items-center gap-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors border-t border-stone-50"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'personal' && (
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-stone-100">
                  <h2 className="text-2xl font-serif font-bold mb-8">Personal Information</h2>
                  <form className="space-y-6" onSubmit={handleUpdate}>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-700">Full Name</label>
                      <input 
                        type="text" 
                        value={user.fullName} 
                        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                        className="w-full p-4 bg-brand-bg-green border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-700">Email Address</label>
                      <input 
                        type="email" 
                        value={user.email} 
                        disabled
                        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-500 cursor-not-allowed" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-700">Phone Number</label>
                      <input 
                        type="tel" 
                        value={user.phone || ''} 
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full p-4 bg-brand-bg-green border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20" 
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={saving}
                      className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold hover:bg-brand-deep-green transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                      <Save size={18} />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'address' && (
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-stone-100">
                  <h2 className="text-2xl font-serif font-bold mb-8">Shipping Address</h2>
                  <form className="space-y-6" onSubmit={handleUpdate}>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-700">Address Line 1</label>
                      <input 
                        type="text" 
                        value={user.addressLine1 || ''} 
                        onChange={(e) => setUser({ ...user, addressLine1: e.target.value })}
                        placeholder="123 Artisan Lane, Apartment 4B"
                        className="w-full p-4 bg-brand-bg-green border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-stone-700">City</label>
                        <input 
                          type="text" 
                          value={user.city || ''} 
                          onChange={(e) => setUser({ ...user, city: e.target.value })}
                          placeholder="Bangalore"
                          className="w-full p-4 bg-brand-bg-green border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-stone-700">Pincode</label>
                        <input 
                          type="text" 
                          value={user.pincode || ''} 
                          onChange={(e) => setUser({ ...user, pincode: e.target.value })}
                          placeholder="560001"
                          className="w-full p-4 bg-brand-bg-green border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20" 
                        />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={saving}
                      className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold hover:bg-brand-deep-green transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                      <Save size={18} />
                      {saving ? 'Saving...' : 'Save Address'}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-stone-100">
                  <h2 className="text-2xl font-serif font-bold mb-8">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="p-6 bg-brand-bg-green rounded-2xl border border-stone-100 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold">Password</h4>
                        <p className="text-sm text-stone-500">Last changed 3 months ago</p>
                      </div>
                      <button 
                        onClick={() => alert('Password change feature coming soon!')}
                        className="text-brand-deep-green font-bold text-sm hover:underline"
                      >
                        Change
                      </button>
                    </div>
                    <div className="p-6 bg-brand-bg-green rounded-2xl border border-stone-100 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold">Two-Factor Authentication</h4>
                        <p className="text-sm text-stone-500">Add an extra layer of security</p>
                      </div>
                      <button 
                        onClick={() => alert('2FA feature coming soon!')}
                        className="bg-stone-200 text-stone-600 px-4 py-2 rounded-full text-xs font-bold"
                      >
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-stone-100">
                  <h2 className="text-2xl font-serif font-bold mb-8">Notification Preferences</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'orderUpdates' as const, title: 'Order Updates', desc: 'Get notified about your order status' },
                      { id: 'promotions' as const, title: 'Promotions', desc: 'Receive offers and new product alerts' },
                      { id: 'newsletter' as const, title: 'Newsletter', desc: 'Weekly digest of artisan stories' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-4 border-b border-stone-50 last:border-0">
                        <div>
                          <h4 className="font-bold">{item.title}</h4>
                          <p className="text-sm text-stone-500">{item.desc}</p>
                        </div>
                        <div 
                          onClick={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id] })}
                          className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${notifications[item.id] ? 'bg-brand-deep-green' : 'bg-stone-200'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${notifications[item.id] ? 'right-1' : 'left-1'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
