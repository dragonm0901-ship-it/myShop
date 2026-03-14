import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { trackPageView } from './services/analytics';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CartDrawer } from './components/ui/CartDrawer';

const Home = React.lazy(() => import('./pages/Home'));
const Shop = React.lazy(() => import('./pages/Shop'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Support = React.lazy(() => import('./pages/Support'));

// Scroll to top on route change for better UX
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);
  return null;
};

// Layout wrapper for pages that need Navbar and Footer (Home, etc)
const DefaultLayout = ({ children }) => (
  <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[999] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main-content" className="min-h-screen pt-24 md:pt-32">
      {children}
    </main>
    <Footer />
  </>
);

// Layout wrapper for Auth pages (no massive header/footer)
const AuthLayout = ({ children }) => (
  <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[999] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
    >
      Skip to content
    </a>
    <main id="main-content" className="min-h-screen bg-canvas">
      {children}
    </main>
  </>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center text-muted">
            Loading…
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
          <Route path="/shop" element={<DefaultLayout><Shop /></DefaultLayout>} />
          <Route path="/product/:id" element={<DefaultLayout><ProductPage /></DefaultLayout>} />
          <Route path="/checkout" element={<DefaultLayout><Checkout /></DefaultLayout>} />
          <Route path="/support" element={<DefaultLayout><Support /></DefaultLayout>} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="font-ui text-ink bg-canvas antialiased selection:bg-brand-600 selection:text-white overflow-x-hidden relative">
        <AnimatedRoutes />
        <CartDrawer />
      </div>
    </Router>
  );
};

export default App;
