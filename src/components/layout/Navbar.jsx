import React, { useState, useCallback, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { useI18n } from '@/components/I18nProvider';
import { Sun, Moon, Car, Menu, X, Globe, Rss } from 'lucide-react';

const NavItem = React.memo(({ to, text, onClick, isActive }) => {
  const activeLinkClass = "text-primary font-bold";
  const inactiveLinkClass = "hover:text-primary transition-colors";
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={isActive ? activeLinkClass : inactiveLinkClass}
    >
      {text}
    </NavLink>
  );
});

const MobileNavItem = React.memo(({ to, text, onClick, isActive }) => {
  const activeLinkClass = "text-primary font-bold bg-primary/10";
  const inactiveLinkClass = "hover:text-primary hover:bg-secondary/50 transition-colors";
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`block py-3 text-center rounded-md ${isActive ? activeLinkClass : inactiveLinkClass}`}
    >
      {text}
    </NavLink>
  );
});


const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { language, changeLanguage, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = useMemo(() => [
    { to: '/', text: t('nav.home') },
    { to: '/hakkimizda', text: t('nav.about') },
    { to: '/hizmetler', text: t('nav.services') },
    { to: '/blog', text: t('nav.blog') },
    { to: '/iletisim', text: t('nav.contact') },
    { to: '/sss', text: t('nav.faq') },
  ], [t]);

  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);
  const toggleLanguage = useCallback(() => changeLanguage(language === 'tr' ? 'en' : 'tr'), [language, changeLanguage]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 md:p-4 bg-background/80 backdrop-blur-lg shadow-md h-[var(--navbar-height)]"
    >
      <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu} aria-label="Denizli Taksi Merkezi Ana Sayfa">
        <Car className="w-7 h-7 md:w-8 md:h-8 text-primary shrink-0" />
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary whitespace-nowrap">Denizli Taksi</h1>
      </Link>
      
      <nav className="hidden md:flex items-center space-x-5 lg:space-x-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => isActive ? "text-primary font-semibold" : "hover:text-primary transition-colors"}
          >
            {link.text}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button onClick={toggleLanguage} variant="ghost" size="icon" aria-label={t('nav.toggleLanguage')}>
          <Globe className="w-5 h-5" />
          <span className="ml-1 uppercase text-xs font-medium">{language === 'tr' ? 'EN' : 'TR'}</span>
        </Button>
        <Button onClick={toggleTheme} variant="ghost" size="icon" aria-label={t('nav.toggleTheme')}>
          <AnimatePresence mode="wait" initial={false}>
            {theme === 'dark' ? (
              <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
        <div className="md:hidden">
          <Button onClick={toggleMobileMenu} variant="ghost" size="icon" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 md:hidden bg-background/95 backdrop-blur-md shadow-xl p-4 border-t border-border"
            style={{ maxHeight: 'calc(100vh - var(--navbar-height))', overflowY: 'auto' }}
          >
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={toggleMobileMenu}
                  className={({ isActive }) => `block py-3 text-center rounded-md text-lg ${isActive ? "text-primary font-semibold bg-primary/10" : "hover:text-primary hover:bg-secondary/50 dark:hover:bg-secondary/20 transition-colors"}`}
                >
                  {link.text}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default React.memo(Navbar);