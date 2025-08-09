import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/components/I18nProvider';
import { Cookie } from 'lucide-react';

const CookieConsent = () => {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('denizli-taksi-cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('denizli-taksi-cookie-consent', 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 bg-background/80 dark:bg-black/80 backdrop-blur-md p-4 shadow-2xl z-[100]"
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <Cookie className="w-8 h-8 text-primary mr-3" />
              <p className="text-sm text-foreground/80">
                {t('cookieConsent.message')}
                {/* <Link to="/gizlilik-politikasi" className="underline hover:text-primary ml-1">{t('cookieConsent.learnMore')}</Link> */}
              </p>
            </div>
            <Button onClick={handleAccept} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {t('cookieConsent.accept')}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;