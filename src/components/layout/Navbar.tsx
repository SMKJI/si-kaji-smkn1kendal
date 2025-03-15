
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_NAME, APP_SCHOOL } from '@/lib/constants';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Navigation links
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Informasi', path: '/#informasi' },
    { name: 'Fitur', path: '/#fitur' },
    { name: 'Kontak', path: '/#kontak' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Determine if we're on the home page
  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3'
          : isHomePage 
            ? 'bg-transparent py-5' 
            : 'bg-white shadow-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/0a3a3f77-6e29-472b-9596-b9b4a52df4b0.png" 
            alt={`${APP_SCHOOL} Logo`} 
            className="app-logo" 
          />
          <div className="flex flex-col">
            <span className="text-primary font-semibold text-lg md:text-2xl leading-tight">{APP_NAME}</span>
            <span className="text-muted-foreground text-xs md:text-sm">
              {APP_SCHOOL}
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/login">
            <Button>Masuk</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden mobile-touch-target text-foreground p-2 rounded-md"
          aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background">
          <div className="h-full flex flex-col p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/0a3a3f77-6e29-472b-9596-b9b4a52df4b0.png" 
                  alt={`${APP_SCHOOL} Logo`} 
                  className="h-10 w-10" 
                />
                <span className="text-primary font-semibold text-xl">
                  {APP_NAME}
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="text-foreground mobile-touch-target"
                aria-label="Tutup menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`text-base font-medium py-2 transition-colors mobile-touch-target ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col space-y-4 pt-6">
              <Link to="/login" onClick={closeMobileMenu}>
                <Button className="w-full mobile-touch-target">Masuk</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
