import React from 'react';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import { images } from '../data/images'; // Import mock data from separate file in @data directory

// Following Single Responsibility Principle - HomePage only composes other components
const HomePage = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <Hero />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </div>
    </div>
  );
};

export default HomePage;
