import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { useI18n } from '@/components/I18nProvider';
import { PhoneCall, MessageSquare } from 'lucide-react';

const HeroSection = () => {
  const { theme } = useTheme();
  const { t } = useI18n();
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  const handleImageLoad = (imageUrl) => {
    document.documentElement.style.setProperty('--hero-image-url', `url(${imageUrl})`);
    setHeroImageLoaded(true);
  };

  const handleImageError = () => {
    setHeroImageLoaded(true); 
    document.documentElement.style.removeProperty('--hero-image-url');
  };

  const motionProps = useMemo(() => ({
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.15, type: "spring", stiffness: 80 }
  }), []);

  const callTaxiButtonText = useMemo(() => t('home.callTaxiButton'), [t]);
  const whatsappButtonText = useMemo(() => t('home.whatsappButton'), [t]);
  const phoneNumber = "+905326393064";
  const whatsappNumber = "905326393064";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t('whatsapp.defaultMessage'))}`;

  return (
    <>
      <img
        alt="Türkiye'de bir taksi durağı"
        style={{ display: 'none' }}
        src="https://images.unsplash.com/photo-1516083649464-1740d081bc44"
        onLoad={(event) => handleImageLoad(event.target.src)}
        onError={handleImageError}
      />
      <motion.section
        className={`relative flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,80px))] pt-[var(--navbar-height,80px)] text-center transition-opacity duration-500 ${heroImageLoaded ? 'opacity-100' : 'opacity-0'} ${theme === 'dark' ? 'hero-bg-dark' : 'hero-bg-light'}`}
        aria-labelledby="hero-title"
        style={{ backgroundImage: heroImageLoaded && document.documentElement.style.getPropertyValue('--hero-image-url') ? 'var(--hero-image-url)' : 'none' }}
      >
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        <motion.div
          {...motionProps}
          className="relative z-10 p-5 md:p-8 max-w-3xl mx-auto bg-background/75 dark:bg-black/75 backdrop-blur-md rounded-xl shadow-2xl"
        >
          <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 md:mb-6 leading-tight">
            <span className="text-primary">{t('home.heroTitleStrong')}</span> {t('home.heroTitleRest')}
          </h1>
          <p className="text-lg sm:text-xl mb-8 md:mb-10 text-foreground/90 px-2">
            {t('home.heroSubtitle')} <span className="font-semibold text-primary">{t('home.creditCardAccepted')}</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 px-8 sm:py-4 sm:px-10 text-lg sm:text-xl shadow-xl rounded-full">
                <a href={`tel:${phoneNumber}`}>
                  <PhoneCall className="mr-2.5 h-6 w-6 sm:mr-3 sm:h-7 sm:w-7" /> {callTaxiButtonText}
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Button asChild size="lg" variant="outline" className="w-full bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 font-bold py-3.5 px-8 sm:py-4 sm:px-10 text-lg sm:text-xl shadow-xl rounded-full">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2.5 h-6 w-6 sm:mr-3 sm:h-7 sm:w-7" /> {whatsappButtonText}
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default React.memo(HeroSection);