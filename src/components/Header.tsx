import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBetaClick = useCallback(() => {
    if (location.pathname !== '/') {
      window.location.href = '/#signup';
      return;
    }
    
    const formElement = document.querySelector('.signup-form');
    if (formElement) {
      formElement.classList.remove('highlight-form');
      void formElement.offsetWidth;
      formElement.classList.add('highlight-form');
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [location.pathname]);

  const handleROIClick = useCallback(() => {
    if (location.pathname !== '/') {
      window.location.href = '/#roi';
      return;
    }
    
    const roiElement = document.getElementById('roi-calculator');
    if (roiElement) {
      roiElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 group relative"
            >
              <div className={`absolute -inset-2 rounded-lg transition-colors duration-300 ${
                isScrolled || !isHomePage ? 'group-hover:bg-[#008080]/5' : 'group-hover:bg-white/10'
              }`} />
              <Logo className={`h-6 w-6 relative ${
                isScrolled || !isHomePage ? 'text-[#008080]' : 'text-white'
              }`} />
              <span className={`text-xl font-bold relative transition-colors duration-300 ${
                isScrolled || !isHomePage ? 'text-[#351431]' : 'text-white'
              }`}>
                Fynch
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/blog"
                className={`relative font-medium transition-colors duration-300 whitespace-nowrap ${
                  isScrolled || !isHomePage
                    ? 'text-gray-600 hover:text-[#008080]' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Why Now?
              </Link>
              <button
                onClick={handleROIClick}
                className={`relative font-medium transition-colors duration-300 ${
                  isScrolled || !isHomePage
                    ? 'text-gray-600 hover:text-[#008080]' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                ROI Calculator
              </button>
            </nav>
          </div>

          <div className="hidden md:block">
            <button 
              onClick={handleBetaClick}
              className={`relative overflow-hidden group px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                isScrolled || !isHomePage
                  ? 'bg-[#008080] text-white hover:bg-[#006666]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span className="relative z-10">Join Beta</span>
              <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-[#008080]/0 via-[#008080]/20 to-[#008080]/0" />
            </button>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled || !isHomePage
                ? 'hover:bg-gray-100'
                : 'hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled || !isHomePage ? 'text-[#351431]' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled || !isHomePage ? 'text-[#351431]' : 'text-white'}`} />
            )}
          </button>
        </div>

        <div className={`md:hidden transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <nav className={`mt-4 p-4 rounded-lg ${
            isScrolled || !isHomePage ? 'bg-gray-50' : 'bg-white/10 backdrop-blur-md'
          }`}>
            <Link
              to="/blog"
              className={`block w-full px-4 py-2 rounded-lg mb-2 text-center ${
                isScrolled || !isHomePage
                  ? 'text-gray-600 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
              Why Now?
            </Link>
            <button
              onClick={() => {
                handleROIClick();
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full px-4 py-2 rounded-lg mb-2 text-center ${
                isScrolled || !isHomePage
                  ? 'text-gray-600 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              ROI Calculator
            </button>
            <button 
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                isScrolled || !isHomePage
                  ? 'bg-[#008080] text-white hover:bg-[#006666]'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              onClick={() => {
                handleBetaClick();
                setIsMobileMenuOpen(false);
              }}
            >
              Join Beta
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}