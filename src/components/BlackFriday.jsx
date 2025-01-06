'use client'
import React, { useState, useEffect } from 'react'

export const BlackFriday = () => {
    const images = [
        "https://img.freepik.com/premium-psd/gaming-laptop-sale-promotion-banner_252779-743.jpg",
        "https://img.freepik.com/premium-psd/smart-phone-sale-promotion-black-friday-sale-web-banner-template_179771-192.jpg",
        "https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_120329-2158.jpg"
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically change image every 3 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); 
  
      return () => clearInterval(interval);
    }, []);
  
    // Change image when button is clicked
    const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const goToPrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div className="relative h-[100%] w-[90%] md:w-[60%] max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg ">
        {/* Images */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-80 object-cover"
        />
  
        {/* Previous Button */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          onClick={goToPrev}
        >
          &#10094;
        </button>
  
        {/* Next Button */}
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          onClick={goToNext}
        >
          &#10095;
        </button>
  
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? "bg-blue-500"
                  : "bg-gray-300 hover:bg-blue-500"
              }`}
            ></button>
          ))}
        </div>
      </div>
    );
}
