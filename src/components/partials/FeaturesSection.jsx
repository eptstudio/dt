import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/components/I18nProvider';
import { Users, MapPin, Clock } from 'lucide-react';

const FeatureItem = React.memo(({ icon, titleKey, descKey, delay, t }) => {
  const motionProps = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, delay: delay }
  }), [delay]);

  return (
    <motion.div
      {...motionProps}
      className="flex items-start p-6 bg-background/70 dark:bg-black/50 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-primary/20 transition-shadow"
    >
      {icon}
      <div>
        <h3 className="font-semibold text-lg text-primary mb-1">{t(titleKey)}</h3>
        <p className="text-sm text-foreground/80">{t(descKey)}</p>
      </div>
    </motion.div>
  );
});


const FeaturesSection = () => {
  const { t } = useI18n();

  const features = useMemo(() => [
    {
      icon: <Users className="w-10 h-10 text-primary mr-4 shrink-0" />,
      titleKey: 'home.feature1Title',
      descKey: 'home.feature1Desc',
    },
    {
      icon: <MapPin className="w-10 h-10 text-primary mr-4 shrink-0" />,
      titleKey: 'home.feature2Title',
      descKey: 'home.feature2Desc',
    },
    {
      icon: <Clock className="w-10 h-10 text-primary mr-4 shrink-0" />,
      titleKey: 'home.feature3Title',
      descKey: 'home.feature3Desc',
    },
  ], []);

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {features.map((feature, index) => (
            <FeatureItem
              key={feature.titleKey}
              icon={feature.icon}
              titleKey={feature.titleKey}
              descKey={feature.descKey}
              delay={index * 0.1}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FeaturesSection);