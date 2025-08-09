import React from 'react';

import HeroSection from '@/components/partials/HeroSection';
import FeaturesSection from '@/components/partials/FeaturesSection';
import ServicesHighlightSection from '@/components/partials/ServicesHighlightSection';
import TestimonialsSection from '@/components/partials/TestimonialsSection';
import HomeCtaSection from '@/components/partials/HomeCtaSection';


const HomePage = () => {
  return (
    <div className="flex-grow">
      <HeroSection />
      <FeaturesSection />
      <ServicesHighlightSection />
      <TestimonialsSection />
      <HomeCtaSection />
    </div>
  );
};

export default HomePage;