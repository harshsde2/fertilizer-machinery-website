"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { COMPANY_NAME, VIDEO_INFO, THEME_COLORS } from "@/lib/config";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

// Import thumbnail images
import rotaryDrumImage from '@/assets/images/Fertilizer-Drum-Granulator.jpg';
import npkBlendingImage from '@/assets/images/Bulk-Blending-Fertilizer-Mixer-Machine.jpg';
import coatingMachineImage from '@/assets/images/coating-machine.png';
import crusherImage from '@/assets/images/Fertilizer-Chain-Crusher.jpg';
import factoryImage from '@/assets/images/main_3.jpg';

// Sample video data
const videos = [
  {
    id: 1,
    title: "Rotary Drum Granulator in Action",
    description: "See our flagship granulator processing fertilizer in real-time",
    thumbnail: rotaryDrumImage,
    videoSrc: "/videos/video_1.mp4",
    category: "product",
    duration: "2:45",
  },
  {
    id: 2,
    title: "NPK Blending Process",
    description: "Complete walkthrough of the NPK blending system",
    thumbnail: npkBlendingImage,
    videoSrc: "/videos/video_2.mp4",
    category: "product",
    duration: "3:30",
  },
  {
    id: 3,
    title: "Factory Tour 2024",
    description: `Take a virtual tour of our state-of-the-art ${COMPANY_NAME} manufacturing facility`,
    thumbnail: factoryImage,
    videoSrc: "/videos/video_3.mp4",
    category: "facility",
    duration: "5:15",
  },
  {
    id: 4,
    title: "Coating Machine Demo",
    description: "Detailed demonstration of our advanced coating technology",
    thumbnail: coatingMachineImage,
    videoSrc: "/videos/video_4.mp4",
    category: "product",
    duration: "4:10",
  },
  {
    id: 5,
    title: "Client Success Story: MegaFarm Ltd",
    description: "How our machines transformed their production process",
    thumbnail: crusherImage,
    videoSrc: "/videos/video_5.mp4",
    category: "testimonial",
    duration: "4:20",
  },
];

// Using categories from config
const categories = VIDEO_INFO.categories;

const VideoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredVideos = videos.filter(
    (video) => selectedCategory === "all" || video.category === selectedCategory
  );

  // Update carousel width on window resize
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Reset current index when filtered videos change
  useEffect(() => {
    setCurrentIndex(0);
    setActiveVideo(null);
  }, [selectedCategory]);

  const handleVideoClick = (videoId: number) => {
    if (activeVideo === videoId) {
      // If clicking the same video, toggle play/pause
      const videoElement = videoRefs.current[videoId];
      if (videoElement) {
        if (videoElement.paused) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      }
    } else {
      // If clicking a different video, pause any playing video and set the new active video
      if (activeVideo !== null) {
        const prevVideoElement = videoRefs.current[activeVideo];
        if (prevVideoElement) {
          prevVideoElement.pause();
        }
      }
      setIsVideoLoading(true);
      setActiveVideo(videoId);
      // Play the new video after a short delay to allow the UI to update
      setTimeout(() => {
        const videoElement = videoRefs.current[videoId];
        if (videoElement) {
          videoElement.play();
        }
      }, 100);
    }
  };

  const nextSlide = () => {
    setDirection(1); // Right to left
    if (currentIndex < filteredVideos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first video
    }
  };

  const prevSlide = () => {
    setDirection(-1); // Left to right
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredVideos.length - 1); // Loop to the last video
    }
  };

  const goToSlide = (index: number) => {
    // Set direction based on which way we're moving
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Touch/mouse drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setDragX(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newDragX = clientX - startX;
    setDragX(newDragX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // If drag distance is significant, change slide
    if (Math.abs(dragX) > 100) {
      if (dragX > 0) {
        setDirection(-1); // Left to right
        prevSlide();
      } else {
        setDirection(1); // Right to left
        nextSlide();
      }
    }
    
    setDragX(0);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const slideVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 0.95,
      };
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 0.95,
        transition: {
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 },
        },
      };
    },
  };

  // Get videos for thumbnails (show next few videos after current)
  const getThumbVideos = () => {
    const thumbs = [];
    const total = Math.min(5, filteredVideos.length);
    
    for (let i = 0; i < total; i++) {
      const idx = (currentIndex + i) % filteredVideos.length;
      thumbs.push(filteredVideos[idx]);
    }
    
    return thumbs;
  };

  return (
    <section id="videos" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="text-green-600 font-semibold inline-block mb-2"
          >
            OUR VIDEOS
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            {VIDEO_INFO.title} <span className="text-green-600">Gallery</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-green-500 mx-auto mb-8"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 mb-6"
          >
            {VIDEO_INFO.description}
          </motion.p>

          {/* Category Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedCategory === category.id
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Carousel */}
        <div className="max-w-6xl mx-auto relative">
          {/* Main Video Display */}
          <div 
            ref={carouselRef}
            className="relative overflow-hidden rounded-xl shadow-lg bg-white mb-6"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full aspect-video"
                style={isDragging ? { x: dragX } : {}}
              >
                <div className="aspect-video w-full h-full relative overflow-hidden">
                  {activeVideo === filteredVideos[currentIndex].id ? (
                    <div className="w-full h-full bg-black">
                      <video
                        ref={(el) => {
                          videoRefs.current[filteredVideos[currentIndex].id] = el;
                        }}
                        src={filteredVideos[currentIndex].videoSrc}
                        className="w-full h-full object-cover"
                        controls
                        onLoadedData={() => setIsVideoLoading(false)}
                        onEnded={() => setActiveVideo(null)}
                        playsInline
                      />
                      {isVideoLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                          <div className="w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <Image
                        src={filteredVideos[currentIndex].thumbnail}
                        alt={filteredVideos[currentIndex].title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 1200px"
                        priority={currentIndex === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* Play Button */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        onClick={() => handleVideoClick(filteredVideos[currentIndex].id)}
                      >
                        <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg">
                          <svg
                            className="w-8 h-8 text-white translate-x-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Video Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-4">
                          {filteredVideos[currentIndex].category}
                        </div>
                        <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">
                          {filteredVideos[currentIndex].title}
                        </h2>
                        <p className="text-white max-w-2xl mb-2 drop-shadow-md">
                          {filteredVideos[currentIndex].description}
                        </p>
                        <div className="flex items-center text-sm text-white">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {filteredVideos[currentIndex].duration}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {filteredVideos.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-600/80 hover:bg-green-700 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors z-10"
                  aria-label="Previous video"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-600/80 hover:bg-green-700 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors z-10"
                  aria-label="Next video"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail Navigation Container */}
          {filteredVideos.length > 1 && (
            <div className="mx-auto max-w-4xl mt-6 mb-8 pt-2">
              {/* Thumbnail Carousel */}
              <div className="flex gap-4 justify-center overflow-x-auto py-6 px-6 custom-scrollbar">
                {getThumbVideos().map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => goToSlide((currentIndex + index) % filteredVideos.length)}
                    className={`relative w-24 md:w-32 flex-shrink-0 transition-all duration-300 rounded-lg overflow-hidden
                      ${index === 0 
                        ? 'ring-2 ring-green-500 ring-offset-2 shadow-md scale-105 z-10' 
                        : 'opacity-75 hover:opacity-100 hover:ring-1 hover:ring-gray-300 hover:shadow-md'}`}
                    style={{ marginTop: '4px', marginBottom: '4px' }}
                  >
                    <div className="aspect-video w-full h-full relative">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100px, 150px"
                      />
                      {index !== 0 ? (
                        <div className="absolute inset-0 bg-black/20"></div>
                      ) : (
                        <div className="absolute inset-0">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                            <svg 
                              className="w-3 h-3 text-white translate-x-[1px]" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Dots Navigation */}
          {filteredVideos.length > 1 && (
            <div className="flex justify-center gap-2 mt-2">
              {filteredVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-green-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #d1d5db;
        }
      `}</style>
    </section>
  );
};

export default VideoGallery; 