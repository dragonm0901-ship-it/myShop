import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CartDrawer } from './components/ui/CartDrawer';

// Scroll to top on route change for better UX
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper for pages that need Navbar and Footer (Home, etc)
const DefaultLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="min-h-screen pt-16">
      {children}
    </main>
    <Footer />
  </>
);

// Layout wrapper for Auth pages (no massive header/footer)
const AuthLayout = ({ children }) => (
  <main className="min-h-screen bg-neutral">
    {children}
  </main>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/shop" element={<DefaultLayout><Shop /></DefaultLayout>} />
        <Route path="/product/:id" element={<DefaultLayout><ProductPage /></DefaultLayout>} />
        <Route path="/checkout" element={<DefaultLayout><Checkout /></DefaultLayout>} />
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="font-ui text-textDark bg-neutral antialiased selection:bg-accent selection:text-white overflow-x-hidden relative">
        <AnimatedRoutes />
        <CartDrawer />
      </div>
    </Router>
  );
};

export default App;
