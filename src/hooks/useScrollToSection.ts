"use client";

import { useCallback } from "react";

/**
 * Custom hook for smooth scrolling to sections
 * @returns A function to scroll to a section by ID
 */
export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      // Update URL without page reload
      const url = window.location.origin + window.location.pathname + `#${sectionId}`;
      window.history.pushState({ path: url }, "", url);
    }
  }, []);

  return scrollToSection;
};

export default useScrollToSection; 