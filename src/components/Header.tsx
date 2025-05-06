'use client'; // Directive to indicate this is a client component, enabling client-side interactivity

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  // State to track whether the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);
  
  // State to track whether the user has scrolled down the page
  // Used to change header appearance on scroll for better visibility
  const [scrolled, setScrolled] = useState(false);

  // ===== SCROLL DETECTION =====
  // This effect adds a scroll listener to change header appearance when scrolling
  useEffect(() => {
    // Callback function for the scroll event
    const handleScroll = () => {
      // If scrolled more than 10px, apply shadow and solid background
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        // Otherwise, use transparent background
        setScrolled(false);
      }
    };

    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function to remove event listener when component unmounts
    // This prevents memory leaks and unnecessary processing
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array means this runs once on mount

  // ===== RESPONSIVE BEHAVIOR =====
  // This effect handles closing the mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      // If on desktop (>= 768px) and menu is open, close it
      // This prevents a scenario where user resizes window with menu open
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]); // Dependency array includes isOpen to re-run when menu state changes

  // Navigation links configuration - can be easily modified or extended
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/projects', label: 'Projects' }
  ];

  return (
    // ===== HEADER CONTAINER =====
    <header 
      // Dynamic classes based on scroll state:
      // - Fixed position keeps header always visible
      // - z-50 ensures header stays above other content
      // - Transition creates smooth animation when appearance changes
      // - Conditional classes change background and shadow based on scroll state
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto py-4 px-4 md:px-6">
        {/* ===== HEADER CONTENT ROW ===== */}
        <div className="flex justify-between items-center">
          {/* Logo - z-20 ensures it stays above mobile menu */}
          <Link href="/" className="font-bold text-2xl text-primary z-20">
            BlogGenerate
          </Link>
          
          {/* ===== DESKTOP NAVIGATION ===== */}
          {/* Hidden on mobile (< 768px), visible on desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {/* Map through navigation links array */}
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    // Styling for desktop nav links:
                    // - Medium font weight for readability
                    // - Gray color that changes to primary color on hover
                    // - Smooth transition for color change
                    className="font-medium text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* ===== HAMBURGER BUTTON ===== */}
          {/* Visible on mobile, hidden on desktop (>= 768px) */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-20"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {/* Three spans create the hamburger icon */}
            {/* First bar - transforms to \ part of X when menu is open */}
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}></span>
            
            {/* Middle bar - fades out when menu is open */}
            <span className={`block w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            
            {/* Bottom bar - transforms to / part of X when menu is open */}
            <span className={`block w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}></span>
          </button>
        </div>
        
        {/* ===== MOBILE MENU ===== */}
        {/* Full-screen overlay that slides in from right when open */}
        <div 
          className={`fixed inset-0 bg-white z-10 pt-20 px-4 md:hidden transition-transform duration-300 ease-in-out ${
            isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
          }`}
        >
          <nav>
            <ul className="flex flex-col space-y-6 items-center">
              {/* Map through same navigation links as desktop */}
              {navLinks.map((link) => (
                <li key={link.href} className="w-full text-center">
                  <Link 
                    href={link.href} 
                    // Mobile links are larger and centered
                    className="block py-2 text-xl font-medium text-gray-800 hover:text-primary transition-colors duration-200"
                    // Close menu when a link is clicked for better UX
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}