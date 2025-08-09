import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useI18n } from '@/components/I18nProvider';
import { Car, Zap, Users, Plane, Clock, ShieldCheck } from 'lucide-react';

const ServiceItemCard = React.memo(({ icon, titleKey, descriptionKey, delay }) => {
  const { t } = useI18n();
  const motionProps = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, delay }
  }), [delay]);
  
  return (
    <motion.div {...motionProps}>
      <Card className="text-center h-full shadow-lg hover:shadow-primary/10 transition-shadow duration-300 bg-card dark:bg-card/80 flex flex-col">
        <CardHeader className="items-center">
          {icon}
          <CardTitle className="text-2xl font-semibold text-primary">{t(titleKey)}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-foreground/70 text-base leading-relaxed">{t(descriptionKey)}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
});

const ServicesPage = () => {
  const { t } = useI18n();

  const services = useMemo(() => [
    { 
      icon: <Car className="w-12 h-12 text-primary mb-4" />, 
      titleKey: 'services.cityTaxiTitle', 
      descriptionKey: 'services.cityTaxiDesc'
    },
    { 
      icon: <Plane className="w-12 h-12 text-primary mb-4" />, 
      titleKey: 'services.airportTransferTitle', 
      descriptionKey: 'services.airportTransferDesc' 
    },
    { 
      icon: <Users className="w-12 h-12 text-primary mb-4" />, 
      titleKey: 'services.vipTransportTitle', 
      descriptionKey: 'services.vipTransportDesc' 
    },
    { 
      icon: <Zap className="w-12 h-12 text-primary mb-4" />, 
      titleKey: 'services.emergencyServiceTitle', 
      descriptionKey: 'services.emergencyServiceDesc' 
    },
    { 
      icon: <Clock className="w-12 h-12 text-primary mb-4" />, 
      titleKey: 'services.longDistanceTitle', 
      descriptionKey: 'services.longDistanceDesc' 
    },
    { 
      icon: <ShieldCheck className="w-12 h-12 text-primary mb-4" />,
      titleKey: 'services.chauffeuredServiceTitle', 
      descriptionKey: 'services.chauffeuredServiceDesc' 
    },
  ], []);

  return (
    <div className="container mx-auto px-4 py-24 pt-[calc(var(--navbar-height,80px)+4rem)] md:pt-[calc(var(--navbar-height,80px)+6rem)] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-primary text-center mb-6">{t('services.title')}</h1>
        <p className="text-lg text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
          {t('services.subtitle')}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceItemCard 
              key={service.titleKey}
              icon={service.icon}
              titleKey={service.titleKey}
              descriptionKey={service.descriptionKey}
              delay={index * 0.07}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(ServicesPage);