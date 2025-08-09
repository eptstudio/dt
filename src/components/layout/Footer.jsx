import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/components/I18nProvider';
import { Phone, Mail, MapPin, MessageSquare, Twitter, Facebook, Instagram } from 'lucide-react';

const FooterLink = React.memo(({ to, children }) => (
  <li><Link to={to} className="hover:text-primary transition-colors text-sm">{children}</Link></li>
));

const SocialLink = React.memo(({ href, label, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-gray-400 hover:text-primary transition-colors">{children}</a>
));

const Footer = () => {
  const { t } = useI18n();
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const phoneNumber = "+905326393064";
  const formattedPhoneNumber = "+90 (532) 639 30 64";
  const whatsappNumber = "905326393064";

  const quickLinks = useMemo(() => [
    { to: '/hizmetler', text: t('nav.services') },
    { to: '/sss', text: t('nav.faq') },
    { to: '/hakkimizda', text: t('nav.about') },
    { to: '/iletisim', text: t('nav.contact') },
  ], [t]);

  const socialMediaLinks = useMemo(() => [
    { href: "https://facebook.com", label: "Facebook", icon: <Facebook className="w-6 h-6" /> },
    { href: "https://twitter.com", label: "Twitter", icon: <Twitter className="w-6 h-6" /> },
    { href: "https://instagram.com", label: "Instagram", icon: <Instagram className="w-6 h-6" /> },
  ], []);

  return (
    <footer id="contact" className="py-10 md:py-12 bg-gray-900 text-gray-300 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-semibold text-primary mb-3">{t('footer.contactInfo')}</h4>
            <a href={`tel:${phoneNumber}`} className="flex items-center justify-center sm:justify-start text-sm hover:text-primary transition-colors mb-1">
              <Phone className="w-4 h-4 mr-2 text-primary shrink-0" /> {formattedPhoneNumber}
            </a>
            <a href="mailto:info@denizlitaksimerkezi.com" className="flex items-center justify-center sm:justify-start text-sm hover:text-primary transition-colors mb-1">
              <Mail className="w-4 h-4 mr-2 text-primary shrink-0" /> info@denizlitaksimerkezi.com
            </a>
            <p className="flex items-center justify-center sm:justify-start text-sm">
              <MapPin className="w-4 h-4 mr-2 text-primary shrink-0" /> {t('footer.address')}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-primary mb-3">{t('footer.quickLinks')}</h4>
            <ul className="space-y-1.5">
              {quickLinks.map(link => <FooterLink key={link.to} to={link.to}>{link.text}</FooterLink>)}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-primary mb-3">{t('footer.socialMedia')}</h4>
            <div className="flex justify-center sm:justify-start space-x-4 mb-4">
              {socialMediaLinks.map(link => <SocialLink key={link.label} href={link.href} label={link.label}>{link.icon}</SocialLink>)}
            </div>
            <Button
              onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t('whatsapp.defaultMessage'))}`, '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md w-full sm:w-auto py-2.5 px-5 text-sm"
              aria-label={t('footer.whatsapp')}
            >
              <MessageSquare className="w-5 h-5 mr-2" /> {t('footer.whatsapp')}
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center">&copy; {currentYear} Denizli Taksi Merkezi. {t('footer.rightsReserved')}</p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);