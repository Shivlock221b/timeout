import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/layout/Header';
import '../styles/HomePage.css';

// Following Single Responsibility Principle - HomePage handles layout and data fetching
const HomePage = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState({});
  const preloadQueue = useRef([]);
  const preloadingActive = useRef(false);

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
        // Start preloading immediately after we have URLs
        preloadQueue.current = [...imageUrls];
        preloadImagesInQueue();
        // Don't set loading to false yet until at least first image is loaded
        preloadImage(imageUrls[0]).then(() => {
          setLoading(false);
        });
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
        // Preload next batch of images in sequence
        const nextIndex = (prevIndex + 1) % images.length;
        // Preload a few images ahead of current one
        preloadNextImages(nextIndex, 3);
        return nextIndex;
      });
    }, 1000); // Change image every 1 seconds for more rapid transitions

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [images.length]);

  // Function to preload individual image
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      if (preloadedImages[src]) {
        resolve(src); // Already preloaded
        return;
      }

      const img = new Image();
      img.src = src;
      img.onload = () => {
        setPreloadedImages(prev => ({ ...prev, [src]: true }));
        resolve(src);
      };
      img.onerror = () => {
        console.error(`Failed to preload image: ${src}`);
        setPreloadedImages(prev => ({ ...prev, [src]: false }));
        reject(src);
      };
    });
  };

  // Function to preload next N images from current index
  const preloadNextImages = (startIndex, count) => {
    const imagesToPreload = [];
    for (let i = 0; i < count; i++) {
      const index = (startIndex + i) % images.length;
      if (images[index] && !preloadedImages[images[index]]) {
        imagesToPreload.push(images[index]);
      }
    }
    
    if (imagesToPreload.length > 0) {
      imagesToPreload.forEach(img => {
        if (!preloadQueue.current.includes(img)) {
          preloadQueue.current.push(img);
        }
      });
      
      // Start preloading if not already active
      if (!preloadingActive.current) {
        preloadImagesInQueue();
      }
    }
  };

  // Function to process the preload queue
  const preloadImagesInQueue = async () => {
    if (preloadingActive.current || preloadQueue.current.length === 0) {
      return;
    }
    
    preloadingActive.current = true;
    
    while (preloadQueue.current.length > 0) {
      const nextImage = preloadQueue.current.shift();
      try {
        await preloadImage(nextImage);
      } catch (err) {
        // Continue with next image if one fails
      }
    }
    
    preloadingActive.current = false;
  };

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
