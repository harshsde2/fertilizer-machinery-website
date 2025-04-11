"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import Image from "next/image";
import heroImage from '@/assets/images/rotating-drum-fertilizer-pelletizer.jpg';
import backgroundImage from '@/assets/images/main_1.jpg';
import backgroundImage2 from '@/assets/images/main_2.jpg';
import backgroundImage3 from '@/assets/images/main_3.jpg';
import backgroundImage4 from '@/assets/images/main_4.jpg';
import backgroundImage5 from '@/assets/images/main_5.jpg';
import backgroundImage6 from '@/assets/images/main_6.jpg';
import backgroundImage7 from '@/assets/images/main_7.jpg';

const Hero = () => {
  const backgroundImages = [
    backgroundImage,
    backgroundImage2,
    backgroundImage3,
    backgroundImage4,
    backgroundImage5,
    backgroundImage6,
    backgroundImage7,
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Set the next image index
      setNextImageIndex((currentImageIndex + 1) % backgroundImages.length);
      // Start the fade-in transition
      setFadeIn(true);
      
      // After transition completes, update the current image to be the next one
      const transitionTimeout = setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setFadeIn(false);
      }, 2000);
      
      return () => clearTimeout(transitionTimeout);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [currentImageIndex, nextImageIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
    >
      {/* Current Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImages[currentImageIndex]}
          alt={`Background ${currentImageIndex + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-50"
          priority={currentImageIndex === 0}
        />
      </div>
      
      {/* Next Background Image with Fade Transition */}
      <div 
        className="absolute inset-0 z-1 transition-opacity duration-2000 ease-in-out"
        style={{ opacity: fadeIn ? 1 : 0 }}
      >
        <Image
          src={backgroundImages[nextImageIndex]}
          alt={`Background ${nextImageIndex + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-50"
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 z-[2] opacity-30">
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-green-500 rounded-full filter blur-3xl opacity-70"></div>
        <div className="absolute top-32 -right-16 w-80 h-80 bg-green-500 rounded-full filter blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 z-[5] py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Hero Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Advanced Fertilizer <br />
              <span className="text-green-500">Machinery Solutions</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Providing high-efficiency machinery for fertilizer production. Increase your productivity with our state-of-the-art technology.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => {
                  const productsSection = document.getElementById("products");
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Explore Products
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Contact Us
              </Button>
            </motion.div>
          </div>
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="bg-white p-1 rounded-xl shadow-2xl max-w-md mx-auto">
              <div className="aspect-video rounded-lg overflow-hidden relative">
                <Image 
                  src={heroImage} 
                  alt="Advanced Fertilizer Machine" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  priority
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-green-800/60 to-transparent rounded-lg z-10"></div>
                
                {/* Information Badge */}
                <div className="absolute bottom-4 left-4 z-20 text-white">
                  {/* <div className="bg-green-600/80 px-3 py-1 rounded-full text-xs font-semibold mb-1">Top Seller</div> */}
                  <h3 className="text-sm font-bold drop-shadow-md">Rotating Drum Pelletizer</h3>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for extended transition duration */}
      <style jsx global>{`
        .duration-2000 {
          transition-duration: 2000ms;
        }
      `}</style>
    </section>
  );
};

export default Hero; 