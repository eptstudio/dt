import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/components/I18nProvider';
import { Building, Clock, Target, Users } from 'lucide-react';

const SectionCard = React.memo(({ icon, titleKey, children, className }) => {
  const { t } = useI18n();
  return (
    <Card className={`shadow-xl bg-card dark:bg-card/80 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          {icon} {t(titleKey)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
});


const AboutPage = () => {
  const { t } = useI18n();

  const values = useMemo(() => [
    t('about.value1'),
    t('about.value2'),
    t('about.value3'),
    t('about.value4'),
  ], [t]);

  return (
    <div className="container mx-auto px-4 py-24 pt-[calc(var(--navbar-height,80px)+4rem)] md:pt-[calc(var(--navbar-height,80px)+6rem)] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-primary text-center mb-12">{t('about.title')}</h1>
        
        <SectionCard icon={<Building className="mr-3 w-7 h-7" />} titleKey="about.historyTitle" className="mb-12">
          <p className="text-lg text-foreground/80 leading-relaxed">
            {t('about.historyContent')}
          </p>
        </SectionCard>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <SectionCard icon={<Target className="mr-3 w-7 h-7" />} titleKey="about.valuesTitle">
            <ul className="list-disc list-inside text-lg text-foreground/80 space-y-2">
              {values.map((value, index) => <li key={index}>{value}</li>)}
            </ul>
          </SectionCard>
          <SectionCard icon={<Users className="mr-3 w-7 h-7" />} titleKey="about.teamTitle">
            <p className="text-lg text-foreground/80 leading-relaxed">
              {t('about.teamContent')}
            </p>
          </SectionCard>
        </div>

        <SectionCard icon={<Clock className="mr-3 w-7 h-7" />} titleKey="about.hoursTitle" className="text-center bg-primary/10 dark:bg-primary/5">
            <p className="text-2xl font-semibold text-primary">{t('about.hoursContent')}</p>
            <p className="text-md text-foreground/70">{t('about.hoursSubContent')}</p>
        </SectionCard>
        
        <div className="mt-12 text-center">
          <picture>
            <source srcSet="https://images.unsplash.com/photo-1599463966301-f82cd13c735c?auto=format&fit=crop&w=800&q=70&fm=webp" media="(min-width: 600px)" />
            <img 
              loading="lazy" 
              decoding="async" 
              src="https://images.unsplash.com/photo-1599463966301-f82cd13c735c?auto=format&fit=crop&w=600&q=65&fm=webp" 
              alt="Pamukkale travertenleri ve sıcak hava balonları" 
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg" 
              width="800" 
              height="533"
            />
          </picture>
        </div>

      </motion.div>
    </div>
  );
};

export default React.memo(AboutPage);