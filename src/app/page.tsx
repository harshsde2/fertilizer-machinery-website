"use client";

import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Products />

      <section id="videos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Video Gallery</h2>
          <p className="text-center mb-12">Videos will be displayed here</p>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Client Testimonials</h2>
          <p className="text-center mb-12">Testimonials will be displayed here</p>
        </div>
      </section>

      <Contact />
    </Layout>
  );
}
