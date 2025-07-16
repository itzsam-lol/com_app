import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import SubscriptionSection from '../components/SubscriptionSection';


const Landing = () => {
  return (
    <div>
      <Hero />
      <Features />
      <SubscriptionSection />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
