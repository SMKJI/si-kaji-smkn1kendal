
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, APP_SCHOOL } from '@/lib/constants';

const Footer = () => {
  useEffect(() => {
    console.log("Footer component rendered");
  }, []);

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-6 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/0a3a3f77-6e29-472b-9596-b9b4a52df4b0.png" 
                alt="Logo" 
                className="h-8 w-8" 
              />
              <span className="font-semibold text-foreground">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {APP_SCHOOL}
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {APP_NAME}. Hak Cipta Dilindungi.
            </p>
            <div className="flex gap-4 mt-2 justify-center md:justify-end">
              <Link to="#" className="text-sm text-foreground hover:text-primary">
                Ketentuan
              </Link>
              <Link to="#" className="text-sm text-foreground hover:text-primary">
                Privasi
              </Link>
              <Link to="#" className="text-sm text-foreground hover:text-primary">
                Kontak
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
