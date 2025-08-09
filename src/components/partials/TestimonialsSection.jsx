import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/components/I18nProvider';
import { Star } from 'lucide-react';

const TestimonialCard = React.memo(({ nameKey, commentKey, stars, avatarSrc, delay, t }) => {
  const motionProps = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.4, delay }
  }), [delay]);

  const starIcons = useMemo(() => 
    Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
    )), [stars]
  );

  const customerName = t(nameKey);

  return (
    <motion.div {...motionProps}>
      <Card className="shadow-lg bg-secondary/40 dark:bg-secondary/30 p-6 rounded-xl h-full flex flex-col justify-between min-h-[220px]">
        <CardContent className="flex flex-col items-center text-center">
          <img loading="lazy" decoding="async" src={avatarSrc} alt={`${customerName} ${t('altTexts.avatar')}`} className="w-16 h-16 rounded-full mb-3 border-2 border-primary object-cover" width="64" height="64" />
          <div className="flex mb-2">
            {starIcons}
          </div>
          <p className="text-foreground/80 text-sm mb-3 italic leading-relaxed">"{t(commentKey)}"</p>
          <p className="font-semibold text-primary mt-auto">{customerName}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
});


const TestimonialsSection = () => {
  const { t } = useI18n();

  const testimonialsData = useMemo(() => [
    {
      nameKey: 'home.testimonials.customer1Name',
      commentKey: 'home.testimonials.customer1Review',
      stars: 5,
      avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=64&h=64&q=60&fm=webp'
    },
    {
      nameKey: 'home.testimonials.customer2Name',
      commentKey: 'home.testimonials.customer2Review',
      stars: 5,
      avatarSrc: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=64&h=64&q=60&fm=webp'
    },
    {
      nameKey: 'home.testimonials.customer3Name',
      commentKey: 'home.testimonials.customer3Review',
      stars: 4,
      avatarSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=64&h=64&q=60&fm=webp'
    },
  ], []);
  
  return (
    <section id="testimonials" className="py-16 md:py-20 bg-background dark:bg-background/95">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-10 md:mb-12 text-primary"
        >
          {t('home.testimonials.title')}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.nameKey}
              nameKey={testimonial.nameKey}
              commentKey={testimonial.commentKey}
              stars={testimonial.stars}
              avatarSrc={testimonial.avatarSrc}
              delay={index * 0.08}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(TestimonialsSection);