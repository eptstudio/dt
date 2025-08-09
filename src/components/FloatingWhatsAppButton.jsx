import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useI18n } from '@/components/I18nProvider';

const FloatingWhatsAppButton = () => {
  const { t } = useI18n();
  const phoneNumber = "905326393064"; 
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t('whatsapp.defaultMessage'))}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3.5 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
      aria-label={t('footer.whatsapp')}
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageSquare className="w-7 h-7" />
    </motion.a>
  );
};

export default React.memo(FloatingWhatsAppButton);