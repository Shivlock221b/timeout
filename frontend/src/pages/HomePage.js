import React from 'react';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import { images } from '../data/images';

// Following Single Responsibility Principle - HomePage only composes other components
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <div className="w-full">
          <HowItWorks />
          <Testimonials />
          <CallToAction />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
