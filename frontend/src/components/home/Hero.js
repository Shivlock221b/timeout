import React, { useEffect } from 'react';
import { getS3ImageUrl } from '../../utils/s3Utils';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Hero component following Single Responsibility Principle
const Hero = () => {
  // Get the hero image URL from S3
  const heroImageUrl = getS3ImageUrl('home/hero-image.jpg');
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // This script runs after component mount and ensures there's no gap
    const heroElement = document.querySelector('.hero-section');
    const headerElement = document.querySelector('header');
    
    if (heroElement && headerElement) {
      // Force the hero to be positioned directly below the header
      const headerHeight = headerElement.getBoundingClientRect().height;
      const headerBottom = headerElement.getBoundingClientRect().bottom;
      
      // Apply adjustments after a brief delay to ensure accurate measurements
      setTimeout(() => {
        heroElement.style.marginTop = `-100px`;
      }, 0);
    }
  }, []);

  return (
    <div 
      className="hero-section relative w-full min-h-[800px] sm:min-h-[500px] max-w-[100vw] mx-auto"
      style={{ 
        backgroundImage: `url(${heroImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(1.2)',
        marginTop: '-100px'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
        <div className="px-6 md:px-12 max-w-4xl z-10 w-full">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white leading-tight tracking-tight text-center">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              Take a Tymo
            </span>
          </h1>
          
          <div className="mt-6 mb-8 ml-0 mr-auto max-w-2xl">
            <p className="text-xl md:text-2xl text-white leading-relaxed italic font-light text-left bg-black/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <span className="text-indigo-700 font-bold text-3xl md:text-4xl">Small, local events</span> to connect with 
              <span className="text-indigo-700 font-bold text-3xl md:text-4xl"> like&#8209;minded people</span> and rediscover 
              <span className="text-indigo-700 font-bold text-3xl md:text-4xl"> your city.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12">
            <Link
              to={isAuthenticated ? "/discover" : "/login"}
              className="px-8 py-4 bg-white text-indigo-700 rounded-full text-lg font-bold transform hover:scale-105 transition duration-300 shadow-lg"
            >
              Find a Table
            </Link>
            <Link
              to={isAuthenticated ? "/create" : "/login"}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-bold hover:bg-white hover:text-indigo-700 transform hover:scale-105 transition duration-300"
            >
              Host a Table
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
