import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Car, Plane, Users, ArrowRight } from 'lucide-react';
import { useI18n } from '@/components/I18nProvider';

const serviceIcons = {
  cityTaxi: Car,
  airportTransfer: Plane,
  vipTransport: Users,
};

const ServiceCard = React.memo(({ serviceKey, delay }) => {
  const { t } = useI18n();
  const IconComponent = serviceIcons[serviceKey] || Car;

  const title = t(`services.${serviceKey}.title`);
  const description = t(`services.${serviceKey}.description`);

  const motionProps = useMemo(() => ({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, delay }
  }), [delay]);

  return (
    <motion.div {...motionProps} className="h-full">
      <Card className="bg-card/50 dark:bg-card/70 backdrop-blur-sm shadow-xl hover:shadow-primary/30 transition-all duration-300 h-full flex flex-col rounded-xl overflow-hidden border-border/50">
        <CardHeader className="items-center text-center pt-8 pb-4">
          <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
            <IconComponent className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between text-center px-6 pb-8">
          <p className="text-foreground/80 mb-6 leading-relaxed">{description}</p>
          <Button asChild variant="outline" className="mt-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 group self-center py-3 px-6 rounded-full text-base">
            <Link to="/hizmetler">
              {t('nav.learnMore')} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
});

const ServicesHighlightSection = () => {
  const { t } = useI18n();
  const services = useMemo(() => ['cityTaxi', 'airportTransfer', 'vipTransport'], []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background to-background/90 dark:from-black dark:to-gray-900/80" aria-labelledby="services-highlight-title">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 id="services-highlight-title" className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-primary tracking-tight">
            {t('home.servicesHighlight.title')}
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {t('home.servicesHighlight.subtitle')}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((serviceKey, index) => (
            <ServiceCard key={serviceKey} serviceKey={serviceKey} delay={index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ServicesHighlightSection);