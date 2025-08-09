import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; 
import { useToast } from '@/components/ui/use-toast';
import { useI18n } from '@/components/I18nProvider';
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';

const ContactPage = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const phoneNumber = useMemo(() => t('contact.phone'), [t]);
  const whatsappLink = useMemo(() => `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(t('whatsapp.defaultMessage'))}`, [t, phoneNumber]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    toast({
      title: t('contact.toastSuccessTitle'),
      description: t('contact.toastSuccessDesc'),
      variant: 'default', 
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-24 pt-[calc(var(--navbar-height,80px)+6rem)] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-primary text-center mb-12">{t('contact.title')}</h1>
        <p className="text-lg text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">{t('contact.infoTitle')}</h2>
              <a href={`tel:${phoneNumber}`} className="flex items-center text-lg text-foreground/80 hover:text-primary transition-colors mb-3">
                <Phone className="w-6 h-6 mr-3 text-primary" /> {phoneNumber}
              </a>
              <a href={`mailto:${t('contact.email')}`} className="flex items-center text-lg text-foreground/80 hover:text-primary transition-colors mb-3">
                <Mail className="w-6 h-6 mr-3 text-primary" /> {t('contact.email')}
              </a>
              <p className="flex items-center text-lg text-foreground/80 mb-6">
                <MapPin className="w-6 h-6 mr-3 text-primary" /> {t('contact.address')}
              </p>
              <Button 
                onClick={() => window.open(whatsappLink, '_blank')} 
                className="bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md w-full"
              >
                <MessageSquare className="w-5 h-5 mr-2" /> {t('contact.whatsappButton')}
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">{t('contact.mapTitle')}</h3>
              <div className="map-placeholder h-72 shadow-lg">
                <MapPin className="w-16 h-16 text-primary opacity-50" />
                <span className="ml-2 text-lg">{t('contact.mapPlaceholder')}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{t('contact.mapNote')}</p>
            </div>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6 p-8 bg-card dark:bg-card/80 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-primary mb-6">{t('contact.formTitle')}</h2>
            <div>
              <Label htmlFor="name" className="text-foreground/80">{t('contact.formName')}</Label>
              <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder={t('contact.formNamePlaceholder')} required className="bg-background/70 backdrop-blur-sm mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground/80">{t('contact.formEmail')}</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder={t('contact.formEmailPlaceholder')} required className="bg-background/70 backdrop-blur-sm mt-1" />
            </div>
            <div>
              <Label htmlFor="message" className="text-foreground/80">{t('contact.formMessage')}</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder={t('contact.formMessagePlaceholder')} rows={5} required className="bg-background/70 backdrop-blur-sm mt-1" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg">
              {t('contact.formSubmitButton')} <Send className="ml-2 h-5 w-5" />
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;