import React, { useState } from 'react';
import { Menu, X, LogOut, User, LayoutDashboard, Settings, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const { user } = useAuth();



  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = [
    { label: 'ABOUT', href: '/#about' },
    { label: 'SERVICES', href: '/#services' },
    { label: 'PORTFOLIO', href: '/#work' },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-4 md:pt-6 flex justify-center"
    >
      <div className="bg-white rounded-full shadow-lg border border-gray-100 px-6 py-3 w-full max-w-5xl flex items-center justify-between pointer-events-auto">
        {/* Left Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-bold tracking-widest text-gray-500 hover:text-black transition-colors uppercase"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 -ml-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-2xl tracking-tighter group-hover:opacity-80 transition-opacity">
              CAMPUS<span className="text-pinnacle-green">HUB</span>
            </span>
          </div>
        </Link>
        <div className="md:hidden w-6"></div> {/* Spacer for centering logo on mobile */}

        {/* Right Nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Community Link */}
          <Link
            to="/community"
            className={`text-xs font-bold tracking-widest transition-colors uppercase ${location.pathname === '/community' ? 'text-black' : 'text-gray-500 hover:text-black'}`}
          >
            Community
          </Link>

          {!user ? (
            <a
              href="#contact"
              className="bg-black text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-pinnacle-green hover:text-black transition-colors"
            >
              Contact
            </a>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 focus:outline-none group"
              >
                <UserAvatar user={user} className="w-9 h-9 border-gray-100 group-hover:border-black transition-colors" />
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-sm font-bold text-gray-900 truncate">{user.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        auth.signOut();
                        setProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-6 flex flex-col gap-4 md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-bold text-gray-600 hover:text-black py-2 border-b border-gray-50 last:border-0"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/community"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-gray-600 hover:text-black py-2 border-b border-gray-50"
          >
            COMMUNITY
          </Link>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-center bg-black text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wide"
          >
            Contact Us
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};