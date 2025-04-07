import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import '../styles/HomePage.css';

// Following Single Responsibility Principle - HomePage handles layout and data fetching
const HomePage = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  useEffect(() => {
    // Fetch image URLs from S3 bucket
    const fetchImages = async () => {
      try {
        setLoading(true);
        
        // Prepare direct image URLs for hero0 through hero8 using the correct format
        const bucketName = process.env.REACT_APP_BUCKET_NAME || 'tymouttest';
        const region = process.env.REACT_APP_AWS_REGION || 'ap-south1'; 
        const folder = 'home'; 
        
        const imageUrls = [];
        // Updated to fetch only 10 images (hero0 through hero8)
        for (let i = 0; i <= 9; i++) {
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

    // Set interval to change image more rapidly - changed from 5000ms to 2500ms
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => {
        if (images.length === 0) return 0;
        return (prevIndex + 1) % images.length;
      });
    }, 1000); // Change image every 1 seconds for more rapid transitions

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <>
      {/* Include header at the top of the page */}
      <Header />
      
      <div className="homepage-fullscreen">
        {loading ? (
          <div className="loading-container">
            <p>Loading images...</p>
          </div>
        ) : (
          <div className="image-carousel-container">
            <div className="image-carousel-fullscreen">
              {images.length > 0 ? (
                <img 
                  src={images[currentImageIndex]} 
                  alt={`Hero image ${currentImageIndex}`} 
                  className="hero-image-fullscreen"
                  onError={(e) => {
                    console.log(`Failed to load image: ${images[currentImageIndex]}`);
                    // Prevent infinite error loop by removing the src
                    e.target.onerror = null;
                    e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
                  }}
                />
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
