"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import VideoGallery from '@/components/sections/VideoGallery';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Products />
      <VideoGallery />
      <Testimonials />
      <Contact />
    </Layout>
  );
}
