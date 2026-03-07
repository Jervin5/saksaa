import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Customise } from './pages/Customise';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Orders } from './pages/Orders';
import { Wishlist } from './pages/Wishlist';
import { AccountDetails } from './pages/AccountDetails';
import { Checkout } from './pages/Checkout';
import { OrderDetail } from './pages/OrderDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsExchanges from './pages/ReturnsExchanges';
import OrderTracking from './pages/OrderTracking';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { AnimatePresence, motion } from 'motion/react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/saksaa/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
              <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
              <Route path="/customise" element={<PageWrapper><Customise /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/faqs" element={<PageWrapper><FAQ /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
              <Route path="/orders" element={<PageWrapper><Orders /></PageWrapper>} />
              <Route path="/order/:id" element={<PageWrapper><OrderDetail /></PageWrapper>} />
              <Route path="/wishlist" element={<PageWrapper><Wishlist /></PageWrapper>} />
              <Route path="/account" element={<PageWrapper><AccountDetails /></PageWrapper>} />
              <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
              <Route path="/shipping-policy" element={<PageWrapper><ShippingPolicy /></PageWrapper>} />
              <Route path="/returns-exchanges" element={<PageWrapper><ReturnsExchanges /></PageWrapper>} />
              <Route path="/order-tracking" element={<PageWrapper><OrderTracking /></PageWrapper>} />
              <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
              <Route path="/terms-of-service" element={<PageWrapper><TermsOfService /></PageWrapper>} />
            </Routes>
          </Layout>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}
