import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/HomePage.css';

// Following Single Responsibility Principle - HomePage handles layout and data fetching
const HomePage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Only hide footer when this component mounts, keep header visible
  useEffect(() => {
    // Add a class to the body to hide the footer but keep header
    document.body.classList.add('homepage-active');
    
    // Add class to make header always look glassy/blurred
    document.body.classList.add('homepage-header-glassy');
    
    // Clean up when component unmounts
    return () => {
      document.body.classList.remove('homepage-active');
      document.body.classList.remove('homepage-header-glassy');
    };
  }, []);

  // Fetch image URLs from S3 bucket
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        
        // Prepare direct image URLs for hero0 through hero6 using the correct format
        const bucketName = process.env.REACT_APP_BUCKET_NAME || 'tymouttest';
        const region = process.env.REACT_APP_AWS_REGION || 'ap-south-1'; 
        const folder = 'home'; 
        
        const imageUrls = [];
        // Updated to fetch 7 images (hero0 through hero6)
        for (let i = 0; i <= 6; i++) {
          // Construct the direct URL exactly matching the format from the example
          const url = `https://${bucketName}.s3.${region}.amazonaws.com/${folder}/hero${i}.jpg`;
          imageUrls.push(url);
        }
        
        setImages(imageUrls);
        setLoading(false);
      } catch (error) {
        console.error('Error preparing image URLs:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Configuration for the carousel
  const carouselSettings = {
    autoPlay: true,             // Enable autoplay
    interval: 1500,             // Time between slide transitions (ms)
    infiniteLoop: true,         // Loop back to the first slide after the last
    showArrows: false,          // Hide navigation arrows
    showStatus: false,          // Hide status indicator (e.g., "1 of 3")
    showThumbs: false,          // Hide thumbnail navigation
    showIndicators: true,       // Show indicators dots at the bottom
    stopOnHover: false,         // Continue playing even when user hovers
    swipeable: true,            // Allow swiping on touch devices
    emulateTouch: true,         // Allow mouse drag on non-touch devices
    transitionTime: 0,       // Transition speed in ms
    useKeyboardArrows: true     // Allow keyboard navigation
  };

  return (
    <>
      {/* Include header at the top of the page */}
      <Header />
      
      <div className="homepage-fullscreen">
        {loading ? (
          <div className="loading-container">
            {/* Loading state - intentionally empty for clean UI */}
          </div>
        ) : (
          <div className="image-carousel-container">
            <div className="image-carousel-fullscreen">
              {images.length > 0 ? (
                <div className="relative w-full h-full">
                  <Carousel {...carouselSettings}>
                    {images.map((imageUrl, index) => (
                      <div key={index} className="h-full">
                        <img 
                          src={imageUrl} 
                          alt={`Hero image ${index}`} 
                          className="hero-image-fullscreen"
                          style={{ objectFit: 'cover', filter: 'none' }}
                          onError={(e) => {
                            console.log(`Failed to load image: ${imageUrl}`);
                            // Prevent infinite error loop by removing the src
                            e.target.onerror = null;
                            e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                  
                  {/* Hero text overlay - positioned absolutely on top of the carousel */}
                  <div className="hero-text-overlay absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center z-10">
                    <h1>Real. Together</h1>
                    <h2>Your Chance to make Real connections<br />through curated, local experiences</h2>
                    <div className="hero-buttons">
                      <button className="hero-button login-button" onClick={() => window.location.href = '/login'}>Login</button>
                      <button className="hero-button signup-button" onClick={() => window.location.href = '/signup'}>Signup</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-images">
                  <p>No images available</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
