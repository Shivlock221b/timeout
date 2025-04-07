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
    
    // Inject hero text overlay styles
    const styleSheet = document.createElement("style");
    styleSheet.id = "hero-text-styles";
    styleSheet.textContent = `
      .hero-text-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        width: 80%;
        max-width: 800px;
        z-index: 10;
        padding: 2rem 1rem;
        background-color: transparent;
        border-radius: 0;
        border: none;
        box-shadow: none;
      }
      
      .hero-text-overlay h1 {
        font-size: 6rem;
        font-weight: 900;
        letter-spacing: -1px;
        margin-bottom: 2rem;
        text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
        line-height: 1;
      }
      
      .hero-text-overlay h2 {
        font-size: 1.4rem;
        font-weight: 300;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
        letter-spacing: 0.5px;
        opacity: 0.9;
        padding: 0 1rem;
        text-align: center;
        margin-bottom: 2.5rem;
      }
      
      .hero-buttons {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
      }
      
      .hero-button {
        padding: 0.8rem 2rem;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 120px;
      }
      
      .login-button {
        background-color: transparent;
        color: white;
        border: 2px solid white;
      }
      
      .signup-button {
        background-color: white;
        color: #333;
        border: 2px solid white;
      }
      
      .hero-button:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
      
      .login-button:hover {
        background-color: white;
        color: #333;
      }
      
      .signup-button:hover {
        background-color: transparent;
        color: white;
        border: 2px solid white;
      }
      
      @media (max-width: 768px) {
        .hero-text-overlay h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }
        
        .hero-text-overlay h2 {
          font-size: 1rem;
          max-width: 100%;
        }
        
        .hero-button {
          padding: 0.6rem 1.5rem;
          font-size: 0.9rem;
          min-width: 100px;
        }
      }
      
      .image-carousel-fullscreen {
        position: relative;
        width: 100%;
        height: 100vh;
      }
      
      .image-carousel-fullscreen::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(0.5px);
        z-index: 5;
      }
      
      .hero-image-fullscreen {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        z-index: 1;
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Clean up when component unmounts
    return () => {
      document.body.classList.remove('homepage-active');
      document.body.classList.remove('homepage-header-glassy');
      const injectedStyle = document.getElementById("hero-text-styles");
      if (injectedStyle) {
        injectedStyle.remove();
      }
    };
  }, []);

  useEffect(() => {
    // Fetch image URLs from S3 bucket
    const fetchImages = async () => {
      try {
        setLoading(true);
        
        // Prepare direct image URLs for hero0 through hero20 using the correct format
        const bucketName = process.env.REACT_APP_BUCKET_NAME || 'tymouttest';
        const region = process.env.REACT_APP_AWS_REGION || 'ap-south1'; 
        const folder = 'home'; 
        
        const imageUrls = [];
        // Updated to fetch all 21 images (hero0 through hero20)
        for (let i = 0; i <= 22; i++) {
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
                <>
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
                  <div className="hero-text-overlay">
                    <h1>Real. Together</h1>
                    <h2>Your Chance to make Real connections<br />through curated, local experiences</h2>
                    <div className="hero-buttons">
                      <button className="hero-button login-button" onClick={() => window.location.href = '/login'}>Login</button>
                      <button className="hero-button signup-button" onClick={() => window.location.href = '/signup'}>Signup</button>
                    </div>
                  </div>
                </>
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
