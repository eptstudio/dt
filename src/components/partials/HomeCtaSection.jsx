import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PhoneOutgoing } from 'lucide-react';
import { useI18n } from '@/components/I18nProvider';

const HomeCtaSection = () => {
  const { t } = useI18n();
  const phoneNumber = useMemo(() => t('contact.phoneNumber'), [t]);

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    }
  }), []);

  const contentVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.2,
        ease: "circOut"
      } 
    }
  }), []);

  return (
    <motion.section 
      className="py-16 md:py-24 bg-gradient-to-b from-primary/90 to-primary dark:from-primary/80 dark:to-primary/95 text-primary-foreground"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-labelledby="cta-title"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          id="cta-title"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
          variants={contentVariants}
        >
          {t('home.cta.title')}
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90 leading-relaxed"
          variants={contentVariants}
        >
          {t('home.cta.description')}
        </motion.p>
        <motion.div variants={contentVariants}>
          <Button 
            asChild 
            size="lg" 
            className="bg-background text-primary hover:bg-background/90 dark:bg-gray-100 dark:text-primary dark:hover:bg-gray-200 font-bold py-4 px-10 text-lg shadow-2xl rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-background/50 dark:focus:ring-gray-300/50"
          >
            <a href={`tel:${phoneNumber}`}>
              <PhoneOutgoing className="mr-3 h-6 w-6" />
              {t('home.cta.button')}
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default React.memo(HomeCtaSection);