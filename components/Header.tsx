import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#work' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Time update
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }).toLowerCase());
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 md:pt-6 flex justify-center">
      <div className="w-full max-w-[1200px] relative">
        
        {/* Main Pill Container */}
        <div className="bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-4 py-3 md:px-8 md:py-4 flex items-center justify-between relative z-50">
          
          {/* Left Section: Nav Links (Desktop) / Menu Button (Mobile) */}
          <div className="flex items-center w-1/4 md:w-1/3">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors uppercase tracking-wide"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Center Section: Logo */}
          <div className="flex justify-center w-2/4 md:w-1/3 shrink-0">
            <a href="#" className="relative group">
              <span className="font-display font-extrabold text-2xl md:text-3xl tracking-tight uppercase text-black block transform group-hover:scale-105 transition-transform duration-300">
                CampusHub
              </span>
              {/* Accent Square */}
              <span className="absolute -top-1 -right-2 w-2 h-2 bg-pinnacle-green rounded-[1px]"></span>
            </a>
          </div>

          {/* Right Section: Info & CTA */}
          <div className="flex items-center justify-end gap-6 w-1/4 md:w-1/3">
            <span className="hidden lg:block text-sm font-medium text-gray-500 tabular-nums tracking-tight">
              Sleman, {currentTime}
            </span>
            
            {/* Desktop/Tablet Contact Button */}
            <a 
              href="#contact" 
              className="hidden md:inline-flex bg-black text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
            >
              Contact
            </a>

             {/* Mobile Contact Icon/Button (Mini version) */}
             <a 
              href="#contact" 
              className="md:hidden bg-black text-white text-xs font-bold px-4 py-2 rounded-full"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div 
          className={`absolute top-full left-0 right-0 pt-4 transition-all duration-300 transform origin-top z-40 ${
            mobileMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-4 border border-gray-100">
             {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="text-lg font-display font-bold uppercase text-center py-3 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between items-center text-xs font-mono text-gray-500 px-4">
                <span>Sleman, {currentTime}</span>
                <span>v1.0</span>
              </div>
          </div>
        </div>

      </div>
    </header>
  );
};