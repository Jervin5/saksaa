import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Chrome as Google } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    alert('Google Login is not implemented in this demo. Please use email/password.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await apiService.login({ email, password });
        navigate('/');
      } else {
        await apiService.signup({ fullName, email, password });
        alert('Account created successfully! Please sign in.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-bg-green min-h-screen py-20 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif font-bold mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-stone-500 text-sm">
              {isLogin ? 'Enter your details to access your account' : 'Join the SAKSAAS family today'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
                {error}
              </div>
            )}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-700">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full p-4 bg-brand-bg-green border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20 pl-12"
                  />
                  <ArrowRight size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-700">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-brand-bg-green border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20 pl-12"
                />
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-700">Password</label>
                {isLogin && (
                  <button type="button" className="text-[10px] text-brand-deep-green hover:underline">Forgot Password?</button>
                )}
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-brand-bg-green border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-green/20 pl-12"
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || !email || !password || (!isLogin && !fullName)}
              className="w-full bg-stone-900 text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-deep-green transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-stone-400 tracking-widest">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 py-3 px-8 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors w-full"
              >
                <Google size={18} />
                <span className="text-sm font-medium">Continue with Google</span>
              </button>
            </div>

            <p className="mt-10 text-stone-500 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-brand-deep-green font-bold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
