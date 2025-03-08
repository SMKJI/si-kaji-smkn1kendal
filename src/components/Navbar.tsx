
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Informasi', path: '#informasi' },
    { name: 'Fitur', path: '#fitur' },
    { name: 'Kontak', path: '#kontak' },
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/0a3a3f77-6e29-472b-9596-b9b4a52df4b0.png" 
            alt="SMKN 1 Kendal Logo" 
            className="h-10 w-10 md:h-12 md:w-12 object-contain" 
          />
          <div className="flex flex-col">
            <span className="text-primary font-semibold text-lg md:text-2xl leading-tight">Si-Kaji</span>
            <span className="text-muted-foreground text-xs md:text-sm">
              SMKN 1 Kendal
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/login">
            <Button variant="outline" className="mr-2">
              Masuk
            </Button>
          </Link>
          <Link to="/register">
            <Button>Daftar</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-foreground"
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
                  alt="SMKN 1 Kendal Logo" 
                  className="h-10 w-10" 
                />
                <span className="text-primary font-semibold text-xl">
                  Si-Kaji
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="text-foreground"
                aria-label="Tutup menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={closeMobileMenu}
                  className={`text-base font-medium py-2 transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col space-y-4 pt-6">
              <Link to="/login" onClick={closeMobileMenu}>
                <Button variant="outline" className="w-full">
                  Masuk
                </Button>
              </Link>
              <Link to="/register" onClick={closeMobileMenu}>
                <Button className="w-full">Daftar</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
