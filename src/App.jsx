import React, { Suspense, lazy, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { I18nProvider } from '@/components/I18nProvider';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/CookieConsent';
import LoadingSpinner from '@/components/LoadingSpinner';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3
};

const AnimatedRoute = React.memo(({ element: ElementComponent }) => (
  <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
    <ElementComponent />
  </motion.div>
));

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag && location) {
      window.gtag('config', 'AW-17047210654', { 
        'page_path': location.pathname + location.search,
      });
    }
  }, [location]);
  
  const routes = useMemo(() => [
    { path: "/", element: HomePage, name: "Home" },
    { path: "/hakkimizda", element: AboutPage, name: "About" },
    { path: "/hizmetler", element: ServicesPage, name: "Services" },
    { path: "/iletisim", element: ContactPage, name: "Contact" },
    { path: "/sss", element: FAQPage, name: "FAQ" },
    { path: "/blog", element: BlogPage, name: "Blog" },
    { path: "/blog/:slug", element: BlogPostPage, name: "BlogPost" },
  ], []);

  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routes.map(route => (
              <Route key={route.path} path={route.path} element={<AnimatedRoute element={route.element} />} />
            ))}
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}

const MemoizedAnimatedRoutes = React.memo(AnimatedRoutes);

function App() {
  useEffect(() => {
    const gtagScriptId = 'google-gtag-script';
    if (document.getElementById(gtagScriptId)) return;

    const script = document.createElement('script');
    script.id = gtagScriptId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=AW-17047210654`; 
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-17047210654');
    

    return () => {
      const scriptElement = document.getElementById(gtagScriptId);
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    }
  }, []);


  return (
    <ThemeProvider defaultTheme="dark" storageKey="denizli-taksi-theme">
      <I18nProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-primary-foreground">
            <MemoizedAnimatedRoutes />
            <Toaster />
            <CookieConsent />
          </div>
        </Router>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;