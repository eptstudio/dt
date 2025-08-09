import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from '@/components/I18nProvider';
import { HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const { t } = useI18n();

  const faqs = useMemo(() => [
    {
      questionKey: 'faq.q1',
      answerKey: 'faq.a1'
    },
    {
      questionKey: 'faq.q2',
      answerKey: 'faq.a2'
    },
    {
      questionKey: 'faq.q3',
      answerKey: 'faq.a3'
    },
    {
      questionKey: 'faq.q4',
      answerKey: 'faq.a4'
    },
    {
      questionKey: 'faq.q5',
      answerKey: 'faq.a5'
    },
  ], []);

  return (
    <div className="container mx-auto px-4 py-24 pt-[calc(var(--navbar-height,80px)+6rem)] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-primary text-center mb-12 flex items-center justify-center">
          <HelpCircle className="w-10 h-10 mr-3" /> {t('faq.title')}
        </h1>
        <p className="text-lg text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
          {t('faq.subtitle')}
        </p>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`} className="border-b border-border/50 dark:border-border/30">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left py-5 text-foreground data-[state=open]:text-primary">
                  {t(faq.questionKey)}
                </AccordionTrigger>
                <AccordionContent className="text-base text-foreground/80 leading-relaxed pb-5 pt-2">
                  {t(faq.answerKey)}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
};

export default FAQPage;