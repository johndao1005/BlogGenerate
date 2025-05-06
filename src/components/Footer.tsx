'use client'; // Enable client-side interactivity for the accordion functionality

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  // State to track which accordion sections are open on mobile view
  // We use an object with keys representing each section
  const [openSections, setOpenSections] = useState({
    about: false,
    resources: false,
    legal: false,
    support: false, // Added new section for support links
  });

  // Function to toggle accordion sections open/closed
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // State for newsletter subscription form
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Handle newsletter form submission
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your API/backend
    console.log('Subscribing email:', email);
    setSubscribed(true);
    setEmail('');
    // Reset subscription status after 3 seconds
    setTimeout(() => setSubscribed(false), 3000);
  };

  // Current year for the copyright notice - updates automatically
  const currentYear = new Date().getFullYear();

  // Function to scroll back to top of page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling animation
    });
  };

  return (
    <footer className="bg-gray-100 pt-12 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* ===== NEWSLETTER SECTION ===== */}
        {/* Always visible at the top of the footer */}
        <div className="mb-12 pb-8 border-b border-gray-200">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to receive the latest updates, blogs, and AI insights.
            </p>
            
            {/* Newsletter subscription form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            
            {/* Subscription confirmation message - only shown after subscribing */}
            {subscribed && (
              <p className="text-green-600 mt-3 text-sm">
                Thank you for subscribing! You'll receive our updates soon.
              </p>
            )}
          </div>
        </div>

        {/* ===== FOOTER CONTENT GRID ===== */}
        {/* On mobile: Single column with accordions */}
        {/* On desktop: Five columns side by side */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* ===== COMPANY INFO COLUMN ===== */}
          {/* Always visible on all screen sizes */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">BlogGenerate</h2>
              <p className="text-gray-600 text-sm">
                Creating AI-powered content to help you share your ideas with the world.
                Our platform uses advanced AI to generate high-quality blog posts tailored to your needs.
              </p>
              <p className="text-gray-500 text-xs mt-3">
                Made with ❤️ in San Francisco, California
              </p>
            </div>
            
            {/* Social media links with icons */}
            <div className="flex space-x-4 mt-6">
              {/* Social icon links - using common icon names, would be replaced with actual icons */}
              <a href="https://twitter.com" aria-label="Twitter" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <span>𝕏</span>
              </a>
              <a href="https://github.com" aria-label="GitHub" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                <span className="sr-only">GitHub</span>
                <span>𝐆</span>
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <span>𝐋</span>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <span>𝐈</span>
              </a>
            </div>
          </div>
          
          {/* ===== ABOUT SECTION ===== */}
          {/* Accordion on mobile, expanded column on desktop */}
          <div className="md:col-span-2">
            <button
              className="flex justify-between items-center w-full md:cursor-default mb-4"
              onClick={() => toggleSection('about')}
              aria-expanded={openSections.about}
              aria-controls="about-links"
            >
              <h3 className="text-lg font-semibold text-gray-800">About</h3>
              <span className="md:hidden transition-transform duration-200 text-lg">
                {openSections.about ? '−' : '+'}
              </span>
            </button>
            
            <div 
              id="about-links"
              className={`transition-all duration-300 overflow-hidden md:h-auto ${
                openSections.about ? 'max-h-48' : 'max-h-0 md:max-h-48'
              }`}
            >
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link href="/team" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/press" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Press Kit
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* ===== RESOURCES SECTION ===== */}
          <div className="md:col-span-2">
            <button
              className="flex justify-between items-center w-full md:cursor-default mb-4"
              onClick={() => toggleSection('resources')}
              aria-expanded={openSections.resources}
              aria-controls="resource-links"
            >
              <h3 className="text-lg font-semibold text-gray-800">Resources</h3>
              <span className="md:hidden transition-transform duration-200 text-lg">
                {openSections.resources ? '−' : '+'}
              </span>
            </button>
            
            <div 
              id="resource-links"
              className={`transition-all duration-300 overflow-hidden md:h-auto ${
                openSections.resources ? 'max-h-48' : 'max-h-0 md:max-h-48'
              }`}
            >
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blogs" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/tutorials" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      AI Writing Guides
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* ===== SUPPORT SECTION ===== */}
          {/* New section for support links */}
          <div className="md:col-span-2">
            <button
              className="flex justify-between items-center w-full md:cursor-default mb-4"
              onClick={() => toggleSection('support')}
              aria-expanded={openSections.support}
              aria-controls="support-links"
            >
              <h3 className="text-lg font-semibold text-gray-800">Support</h3>
              <span className="md:hidden transition-transform duration-200 text-lg">
                {openSections.support ? '−' : '+'}
              </span>
            </button>
            
            <div 
              id="support-links"
              className={`transition-all duration-300 overflow-hidden md:h-auto ${
                openSections.support ? 'max-h-48' : 'max-h-0 md:max-h-48'
              }`}
            >
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link href="/faqs" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/help" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Support Tickets
                    </Link>
                  </li>
                  <li>
                    <Link href="/status" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      System Status
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* ===== LEGAL SECTION ===== */}
          <div className="md:col-span-2">
            <button
              className="flex justify-between items-center w-full md:cursor-default mb-4"
              onClick={() => toggleSection('legal')}
              aria-expanded={openSections.legal}
              aria-controls="legal-links"
            >
              <h3 className="text-lg font-semibold text-gray-800">Legal</h3>
              <span className="md:hidden transition-transform duration-200 text-lg">
                {openSections.legal ? '−' : '+'}
              </span>
            </button>
            
            <div 
              id="legal-links"
              className={`transition-all duration-300 overflow-hidden md:h-auto ${
                openSections.legal ? 'max-h-48' : 'max-h-0 md:max-h-48'
              }`}
            >
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors duration-200">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        
        {/* ===== BOTTOM SECTION WITH ADDITIONAL INFORMATION ===== */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          {/* Copyright information with expanded details */}
          <div className="text-gray-500 text-sm order-2 md:order-1">
            <p>© {currentYear} BlogGenerate Inc. All rights reserved.</p>
            <p className="mt-1">
              <Link href="/license" className="hover:text-primary transition-colors">
                Licensed under MIT License
              </Link>
              {' • '}
              <Link href="/attributions" className="hover:text-primary transition-colors">
                Attributions
              </Link>
            </p>
          </div>
          
          {/* Bottom right actions */}
          <div className="flex items-center gap-4 order-1 md:order-2">
            {/* Language selector - simplified implementation */}
            <div className="relative">
              <select 
                className="appearance-none bg-transparent border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm text-gray-600 cursor-pointer"
                defaultValue="en-US"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <span>▼</span>
              </div>
            </div>
            
            {/* Back to top button */}
            <button 
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}