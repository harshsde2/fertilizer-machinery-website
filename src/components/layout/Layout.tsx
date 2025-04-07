"use client";

import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "../ui/BackToTop";
import useSmoothScroll from "@/hooks/useSmoothScroll";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout; 